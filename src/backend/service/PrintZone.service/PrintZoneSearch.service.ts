import { NotFoundError } from "../../errors";
import { db } from "../../db";
import { PrintZoneCreateDto } from "../../dto/PrintZoneCreateDto";
import { tagService } from "../Tag.service";
import { Prisma } from "@prisma/client";
import { ReporterTypes } from "../../types/ReporterTypes";
import { PrintZoneStatus } from "../../types/PrintZoneStatus";
import { PrintZonePriorities } from "../../types/PrintZonePriorities";
import { areaService } from "../Area.service";
import { PrintZoneDto, PrintZoneSearchResultDto } from "../../dto/PrintZoneDto";
import { ServiceProposeStatus } from "../../types/ServiceProposeStatus";
import {
  A4_PAPER_SIZE_ID,
  OFFICE_PAPER_TYPE_ID,
  PRINT_JOB_TYPE_ID as PRINT_SERVICE_TYPE_ID,
} from "../../const";
import {
  pzFullQueryResultToDto,
  pzFullQueryIncludeProps,
  pzFullQueryResult,
} from "./queries/full";
import {
  pzSearchQueryIncludeProps,
  pzSearchQueryResult,
  pzSearchQueryResultToDto,
} from "./queries/forSearch";

class PrintZoneSearchService {
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
            PrintZones: {
              include: pzSearchQueryIncludeProps,
            },
          },
        })
      )
    );
    return pzTagQueryWithPrintZone
      .flatMap((pzts) => pzts.map((pzt) => pzt.PrintZones))
      .filter((pz) => pz.status === PrintZoneStatus.Registered) // 등록된 PrintZone 만 표시
      .map((pz) => pzSearchQueryResultToDto(pz));
  }

  async searchByCompany(keyword: string) {
    const queryResult = await db.printZones.findMany({
      where: {
        company: {
          search: `${keyword}*`,
        },
        status: PrintZoneStatus.Registered,
      },
      include: pzSearchQueryIncludeProps,
    });
    return queryResult.map(r => pzSearchQueryResultToDto(r));
  }

  async searchByAddress(keyword: string) {
    const queries = [];
    queries.push(
      db.printZones.findMany({
        include: pzSearchQueryIncludeProps,
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
        include: pzSearchQueryIncludeProps,
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
        include: pzSearchQueryIncludeProps,
        where: {
          address_detail: {
            search: `${keyword}*`,
          },
          status: PrintZoneStatus.Registered,
        },
      })
    );
    return (await Promise.all(queries))
      .flat()
      .map((r) => pzSearchQueryResultToDto(r));
  }

  async search(keyword: string) {
    const queries = [] as Promise<PrintZoneSearchResultDto[]>[];
    queries.push(this.searchByTag(keyword));
    queries.push(this.searchByCompany(keyword));
    queries.push(this.searchByAddress(keyword));
    return (await Promise.all(queries)).flat();
  }
}
export const printZoneSearchService = new PrintZoneSearchService();
