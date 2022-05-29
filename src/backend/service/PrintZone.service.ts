import { NotFoundError } from "../errors";
import { db } from "../db";
import { PrintZoneCreateDto } from "../dto/PrintZoneCreateDto";
import { tagService } from "./Tag.service";
import { Prisma } from "@prisma/client";
import { ReporterTypes } from "../types/ReporterTypes";
import { PrintZoneStatus } from "../types/PrintZoneStatus";
import { PrintZonePriorities } from "../types/PrintZonePriorities";
import { areaService } from "./Area.service";
import { PrintZoneDto } from "../dto/PrintZoneDto";
import { ServiceProposeStatus } from "../types/ServiceProposeStatus";
import {
  A4_PAPER_SIZE_ID,
  OFFICE_PAPER_TYPE_ID,
  PRINT_JOB_TYPE_ID as PRINT_SERVICE_TYPE_ID,
} from "../const";

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
              },
              include: {
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
  }

  async findUnique(id: string) {
    const r = await db.printZones.findUnique({
      where: {
        id,
      },
      include: {
        AreaCode: true,
        PrintZone_Tag: {
          include: {
            Tag: true,
          },
        },
        PrintZone_Image: {
          include: {
            Images: true,
          },
        },
        Services: {
          include: {
            PaperSizes: true,
            PaperTypes: true,
            ServiceType: true,
          },
        },
      },
    });
    if (!r) {
      throw new NotFoundError("No PrintZone with id");
    }

    const dto: PrintZoneDto = {
      id: r.id,
      created_at: r.created_at,
      updated_at: r.updated_at,
      company: r.company,
      latitude: r.latitude,
      longitude: r.longitude,
      phone_number: r.phone_number,
      address: areaService.toKoreanAddress(r.AreaCode, r.address_detail),
      description: r.description,
      banner_html: r.banner_html,
      priority: r.priority as PrintZonePriorities,
      status: r.status as PrintZoneStatus,
      tags: r.PrintZone_Tag.map((pz_t) => pz_t.Tag),
      images: r.PrintZone_Image.map((pz_im) => pz_im.Images),
      services: r.Services,
    };

    return dto;
  }

  async searchByTag(keyword: string) {
    const tagQueryResult = await db.tag.findMany({
      where: {
        value: {
          search: `${keyword}*`,
        },
      },
    });
    const pzTagQueryWithPrintZone = await Promise.all(
      tagQueryResult.map((q) =>
        db.printZone_Tag.findMany({
          where: {
            Tag_id: q.id,
          },
          include: {
            PrintZones: true,
          },
        })
      )
    );
    return pzTagQueryWithPrintZone
      .flatMap((pzts) => pzts.map((pzt) => pzt.PrintZones))
      .filter((pz) => pz.status === PrintZoneStatus.Registered); // 등록된 PrintZone 만 표시
  }

  async searchByCompany(keyword: string) {
    const queryResult = await db.printZones.findMany({
      where: {
        company: {
          search: `${keyword}*`,
        },
        status: PrintZoneStatus.Registered,
      },
    });
    return queryResult;
  }

  async searchByAddress(keyword: string) {
    const queries = [];
    queries.push(
      db.printZones.findMany({
        include: {
          AreaCode: true,
        },
        where: {
          AreaCode: {
            ko_area_2: {
              search: `${keyword}*`,
            },
          },
          status: PrintZoneStatus.Registered,
        },
      })
    );
    queries.push(
      db.printZones.findMany({
        include: {
          AreaCode: true,
        },
        where: {
          AreaCode: {
            ko_area_3: {
              search: `${keyword}*`,
            },
          },
          status: PrintZoneStatus.Registered,
        },
      })
    );
    queries.push(
      db.printZones.findMany({
        where: {
          address_detail: {
            search: `${keyword}*`,
          },
          status: PrintZoneStatus.Registered,
        },
      })
    );
    return (await Promise.all(queries)).flatMap((pz) => pz);
  }

  async search(keyword: string) {
    const queries = [];
    queries.push(this.searchByTag(keyword));
    queries.push(this.searchByCompany(keyword));
    queries.push(this.searchByAddress(keyword));
    return (await Promise.all(queries)).flatMap((pz) => pz);
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
            select: {
              ServiceType: {
                select: {
                  type: true,
                  type_en: true,
                },
              },
              color_type: true,
            },
          },
        },
      });
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
        const service = Services.map(({ ServiceType }) => {
          const { type, type_en } = ServiceType;
          return { type, type_en };
        })[0];
        return { id, latitude, longitude, color, service };
      });
    } catch (e) {
      console.log(e);
    }
  }
}
export const printZoneService = new PrintZoneService();
