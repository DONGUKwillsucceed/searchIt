import { NotFoundError } from "../errors";
import { db } from "../db";
import { ReplyCreateDto } from "../dto/ReplyCreateDto";
import { tagService } from "./Tag.service";
import { Prisma } from "@prisma/client";
import { ReplyStatus } from "../types/ReplyStatus";

class ReplyService {
  async add(dto: ReplyCreateDto, hostIp: string) {
    // 1. 태그 등록
    const { tags: tagNames } = dto;
    const whenTagsFetched = tagNames.map((t) =>
      tagService.getTagOrInsertWhenNotExists(t)
    );
    const tags = await Promise.all(whenTagsFetched);

    // 2. printZone record 만들기
    let status = ReplyStatus.Posted;
    if(dto.services.length !== 0) {
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
        }
      },
      status,
    }
  }

  async findByPrintZoneId(pzId: string) {
    // TODO
  }
}

export const noticeService = new ReplyService();
