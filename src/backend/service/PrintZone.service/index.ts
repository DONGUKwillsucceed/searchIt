import { NotFoundError } from "../../errors";
import { db } from "../../db";
import { PrintZoneCreateDto } from "../../dto/PrintZoneCreateDto";
import { tagService } from "../Tag.service";
import { Prisma } from "@prisma/client";
import { ReporterTypes } from "../../types/ReporterTypes";
import { PrintZoneStatus } from "../../types/PrintZoneStatus";
import { PrintZonePriorities } from "../../types/PrintZonePriorities";
import { areaService } from "../Area.service";
import { PrintZoneDto } from "../../dto/PrintZoneDto";
import { ServiceProposeStatus } from "../../types/ServiceProposeStatus";
import {
  A4_PAPER_SIZE_ID,
  OFFICE_PAPER_TYPE_ID,
  PRINT_JOB_TYPE_ID as PRINT_SERVICE_TYPE_ID,
} from "../../const";
import { pzFullQueryResultToDto, pzFullQueryIncludeProps, pzFullQueryResult } from "./queries/full";
import { pzSearchQueryIncludeProps, pzSearchQueryResultToDto } from "./queries/forSearch";

class PrintZoneService {
  async add(dto: PrintZoneCreateDto, hostIp: string) {
    // 1. 해당하는 태그 만들기
    const { tags: tagNames } = dto;
    const whenTagsFetched = tagNames.map((t) =>
      tagService.getTagOrInsertWhenNotExists(t)
    );
    const tags = await Promise.all(whenTagsFetched);

    // 2. printZone record 만들기
    const pzCreateData: Prisma.PrintZonesCreateInput = {
      id: dto.id,
      writer_ip: hostIp,
      company: dto.company,
      latitude: dto.latitude,
      longitude: dto.longitude,
      phone_number: dto.phone_number,
      AreaCode: {
        connect: {
          id: dto.area_code,
        },
      },
      address_detail: dto.address_detail,
      description: dto.description,
      priority: PrintZonePriorities.Basic,
      status:
        dto.reportedBy === ReporterTypes.Merchant
          ? PrintZoneStatus.ReportedByMerchant
          : PrintZoneStatus.ReportedByUser,
    };
    await db.printZones.create({
      data: pzCreateData,
    });

    // 3. service record 만들기
    const svcRelations = dto.services.map((s) => {
      const serviceRelation: Prisma.ServicesCreateManyInput = {
        id: s.id,
        PaperSize_id: s.paperSizeId,
        PaperType_id: s.paperTypeId,
        ServiceType_id: s.serviceTypeId,
        PrintZone_id: dto.id,
        color_type: s.color_type,
        price: s.price,
        price_duplex_explicit: s.price_duplex_explicit,
        status: ServiceProposeStatus.Proposed,
      };
      return serviceRelation;
    });
    await db.services.createMany({
      data: svcRelations,
    });

    // 4. printZone 과 Tag 를 연결
    const tagMappingRelations = tags.map((t) => {
      const pzTagCreateData: Prisma.PrintZone_TagCreateManyInput = {
        PrintZone_id: dto.id,
        Tag_id: t.id,
      };
      return pzTagCreateData;
    });
    await db.printZone_Tag.createMany({ data: tagMappingRelations });

    // 5. 생성된 printZone return
    return await this.findUnique(dto.id);
  }

  async findManyByTagId(id: string) {
    const queryResult = await db.tag.findUnique({
      where: {
        id,
      },
      include: {
        PrintZone_Tag: {
          include: {
            PrintZones: {
              select: {
                id: true,
                created_at: true,
                updated_at: true,
                company: true,
                latitude: true,
                longitude: true,
                AreaCode_id: true,
                address_detail: true,
                priority: true,
                status: true,
                Services: {
                  include: {
                    PaperSizes: true,
                    PaperTypes: true,
                    ServiceType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!queryResult) {
      throw new NotFoundError("해당하는 태그가 존재하지 않음");
    }

    const printZones = queryResult.PrintZone_Tag.map((r) => r.PrintZones)
      .filter(
        (r) => r.status === PrintZoneStatus.Registered // 등록이 완료된 PrintZone 만 가져옴
      )
      .map((pz) => {
        // A4 용지 인쇄 서비스만 남겨서 프론트엔드로 보내는 부분
        // TODO: 서비스 노출 우선순위를 정해서 우선순위대로 표시
        const filteredServices = pz.Services.filter(
          (s) => s.ServiceType_id === PRINT_SERVICE_TYPE_ID
        )
          .filter((s) => s.PaperSize_id === A4_PAPER_SIZE_ID)
          .filter((s) => s.PaperType_id === OFFICE_PAPER_TYPE_ID);

        pz.Services = filteredServices;
        return pz;
      });
    return printZones;
  }

  async findUnique(id: string) {
    const r = await db.printZones.findUnique({
      where: {
        id,
      },
      include: pzFullQueryIncludeProps,
    });
    if (!r) {
      throw new NotFoundError("No PrintZone with id");
    }

    const dto = pzFullQueryResultToDto(r);
    return dto;
  }

  async pzInfomationOnMap() {
    try {
      const queryResult = await db.printZones.findMany({
        where: {
          status: PrintZoneStatus.Registered,
        },
        select: {
          id: true,
          latitude: true,
          longitude: true,
          Services: {
            where: {
              status: ServiceProposeStatus.Applied,
            },
            select: {
              ServiceType: {
                select: {
                  type: true,
                  type_en: true,
                },
              },
              color_type: true,
              price: true,
            },
          },
        },
      });
      if (!queryResult) {
        throw new NotFoundError("Not found printzone!!");
      }
      return queryResult.map(({ id, latitude, longitude, Services }) => {
        let bcnt = 0;
        let ccnt = 0;
        let color;
        const color_type = Services.map(({ color_type }) => {
          return color_type;
        });
        for (const c of color_type) {
          if (c === "mono") {
            bcnt++;
          }
          if (c === "color") {
            ccnt++;
          }
        }
        if (bcnt != 0 && ccnt == 0) {
          color = { mono: true, color: false };
        } else if (bcnt == 0 && ccnt != 0) {
          color = { color: true, mono: false };
        } else if (bcnt != 0 && ccnt != 0) {
          color = { color: true, mono: true };
        } else {
          color = { color: false, mono: false };
        }
        const service = Services.map(({ ServiceType, price }) => {
          const { type, type_en } = ServiceType;
          return { type, type_en, price };
        })[0];
        const price = service.price;
        return { id, latitude, longitude, color, service, price };
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findManyByAreaCode(areaCode: string) {
    const queryResult = await db.printZones.findMany({
      where: {
        AreaCode_id: areaCode,
      },
      include: pzSearchQueryIncludeProps,
    });
    return queryResult.map(r => pzSearchQueryResultToDto(r));
  }
}
export const printZoneService = new PrintZoneService();
