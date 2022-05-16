import { NotFoundError } from "../errors";
import { db } from "../db";
import { ReplyCreateDto } from "../dto/ReplyCreateDto";
import { tagService } from "./Tag.service";
import {
  Images,
  PrintZoneReplies,
  PrintZoneReply_Image,
  PrintZoneReply_Tag,
  Prisma,
  Tag,
} from "@prisma/client";
import { ReplyStatus } from "../types/ReplyStatus";
import { ServiceProposeStatus } from "../types/ServiceProposeStatus";
import { catchCollision } from "../decorator/catchCollision";
import { PrintZoneReply } from "../dto/ReplyDto";

type ReplyRelation = PrintZoneReplies & {
  PrintZoneReply_Image: (PrintZoneReply_Image & {
    Images: Images;
  })[];
  PrintZoneReply_Tag: (PrintZoneReply_Tag & {
    Tag: Tag;
  })[];
};

const queryInclude = {
  PrintZoneReply_Image: {
    include: {
      Images: true,
    },
  },
  PrintZoneReply_Tag: {
    include: {
      Tag: true,
    },
  },
};

class ReplyService {
  @catchCollision()
  async add(dto: ReplyCreateDto, hostIp: string) {
    console.log(dto);

    // 1. printZone record 만들기
    let status = ReplyStatus.Posted;
    if (dto.services.length !== 0) {
      // 변경 요청한 서비스가 있다면 상태를 변경 요청으로 설정
      status = ReplyStatus.PostedServiceReq;
    }

    const replyCreateData: Prisma.PrintZoneRepliesCreateInput = {
      id: dto.id,
      writer_ip: hostIp,
      writer_emoji: dto.writer_emoji,
      writer_name: dto.writer_name,
      comment: dto.comment,
      PrintZones: {
        connect: {
          id: dto.printZoneId,
        },
      },
      status
    };

    await db.printZoneReplies.create({
      data: replyCreateData,
    });

    // 2. Service 추가하기
    const serviceCreateManyData = dto.services.map((svc) => {
      const data: Prisma.ServicesCreateManyInput = {
        id: svc.id,
        PaperSize_id: svc.paperSizeId,
        PaperType_id: svc.paperTypeId,
        ServiceType_id: svc.serviceTypeId,
        PrintZone_id: svc.printZoneId,
        color_type: svc.color_type,
        price: svc.price,
        price_duplex_explicit: svc.price_duplex_explicit,
        proposed_reply: dto.id,
        status: ServiceProposeStatus.Proposed,
      };
      return data;
    });

    await db.services.createMany({
      data: serviceCreateManyData,
    });

    // 3. Tag 추가하기
    const { tags: tagNames } = dto;
    const whenTagsFetchOrCreated = tagNames.map((t) =>
      tagService.getTagOrInsertWhenNotExists(t)
    );
    const tags = await Promise.all(whenTagsFetchOrCreated);

    const tagMappingCreateManyData = tags.map((t) => {
      const data: Prisma.PrintZoneReply_TagCreateManyInput = {
        PrintZoneReply_id: dto.id,
        Tag_id: t.id,
      };
      return data;
    });

    await db.printZoneReply_Tag.createMany({
      data: tagMappingCreateManyData,
    });

    // 4. 이미지 추가하기
    const { images: imgIds } = dto;
    const imgMappingCreateManyData = imgIds.map((id) => {
      const data: Prisma.PrintZoneReply_ImageCreateManyInput = {
        PrintZoneReply_id: dto.id,
        Image_id: id,
      };
      return data;
    });

    await db.printZoneReply_Image.createMany({
      data: imgMappingCreateManyData,
    });

    // 5. 제작된 원본 return 하기
    return await this.findUnique(dto.id);
  }

  async findUnique(id: string) {
    const relation = await db.printZoneReplies.findUnique({
      where: {
        id,
      },
      include: queryInclude,
    });
    if (!relation) {
      throw new NotFoundError("No reply with key: " + id);
    }
    return this.toDto(relation);
  }

  async findManyByPrintZoneId(pzId: string, skip?: number, take?: number) {
    const relations = await db.printZoneReplies.findMany({
      where: {
        id: pzId,
      },
      include: queryInclude,
      skip,
      take,
    });

    return relations.map((rel) => this.toDto(rel));
  }

  private toDto(relation: ReplyRelation) {
    const dto: PrintZoneReply = {
      id: relation.id,
      created_at: relation.created_at,
      writer_emoji: relation.writer_emoji,
      writer_name: relation.writer_name,
      comment: relation.comment,
      PrintZone_id: relation.PrintZone_id,
      status: relation.status as ReplyStatus,
      reportCnt: relation.reportCnt,
      images: relation.PrintZoneReply_Image.map((pz_img) => pz_img.Images),
      tags: relation.PrintZoneReply_Tag.map((t) => t.Tag),
    };
    return dto;
  }
}

export const replyService = new ReplyService();
