import { NotFoundError } from "../errors";
import { db } from "../db";
import { PrintZoneCreateDto } from "../dto/PrintZoneCreateDto";
import { tagService } from "./Tag.service";
import { PrintZones, Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { ReporterTypes } from "../types/ReporterTypes";
import { PrintZoneStatus } from "../types/PrintZoneStatus";
import { PrintZonePriorities } from "../types/PrintZonePriorities";
import { areaService } from "./Area.service";
import { PrintZoneDto } from "../dto/PrintZoneDto";

class PrintZoneService {
  async add(dto: PrintZoneCreateDto, hostIp: string) {
    // 1. 해당하는 태그 찾기
    const { tags: tagNames } = dto;
    const whenTagsFetched = tagNames.map((t) =>
      tagService.getTagOrInsertWhenNotExists(t)
    );
    const tags = await Promise.all(whenTagsFetched);

    // 2. relation object 형태로 만들기
    const pzCreateData: Prisma.PrintZonesCreateInput = {
      id: uuidv4(),
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

    // 3. printZone 생성
    const printZone = await db.printZones.create({
      data: pzCreateData,
    });

    // 4. printZone 과 Tag 를 연결
    // Single transaction 까지는 필요 없음
    const whenMappingCreated = tags.map(t => {
      const pzTagCreateData: Prisma.PrintZone_TagCreateInput = {
        PrintZones: {
          connect: {
            id: printZone.id,
          },
        },
        Tag: {
          connect: {
            id: t?.id,
          }
        }
      };
      return pzTagCreateData;
    }).map(pz_t => db.printZone_Tag.create({
      data: pz_t,
    }))
    await Promise.all(whenMappingCreated);

    // 5. 생성된 printZone return
    return await this.findUnique(printZone.id);
  }

  async findManyByTagId(id: string) {
    const queryResult = await db.tag.findUnique({
      where: {
        id,
      },
      select: {
        PrintZone_Tag: {
          select: {
            PrintZone_id: true,
          },
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
            },
          },
        },
      },
    });

    if (!queryResult) {
      throw new NotFoundError("태그에 해당하는 프린트존이 존재하지 않음");
    }

    return queryResult.PrintZone_Tag.map((r) => r.PrintZones).map((pz) => pz);
  }

  async findUnique(id: string) {
    const r = await db.printZones.findUnique({
      where: {
        id,
      },
      include: {
        PrintZone_Tag: {
          include: {
            Tag: true,
          }
        },
        AreaCode: true,
        PrintZone_Image: {
          include: {
            Images: true,
          }
        }
      }
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
      address: areaService.toKoreanAddress(r.AreaCode, r.address_detail);
      description: r.description,
      banner_html: r.banner_html,
      priority: r.priority as PrintZonePriorities,
      status: r.status as PrintZoneStatus,
      tags: r.PrintZone_Tag.map(pz_t => pz_t.Tag),
      images: r.PrintZone_Image.map(pz_im => pz_im.Images)
    }

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
    return pzTagQueryWithPrintZone.flatMap((pzts) =>
      pzts.map((pzt) => pzt.PrintZones)
    );
  }

  async searchByCompany(keyword: string) {
    const queryResult = await db.printZones.findMany({
      where: {
        company: {
          search: `${keyword}*`,
        },
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
        },
      })
    );
    queries.push(
      db.printZones.findMany({
        where: {
          address_detail: {
            search: `${keyword}*`,
          },
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
}
export const printZoneService = new PrintZoneService();
