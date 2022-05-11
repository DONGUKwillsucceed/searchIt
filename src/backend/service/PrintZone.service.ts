import { NotFoundError } from "../errors";
import { db } from "../db";

class PrintZoneService {
  async add() {

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
    const queryResult = await db.printZones.findUnique({
      where: {
        id,
      },
    });
    if (!queryResult) {
      throw new NotFoundError("No PrintZone with id");
    }
    const { writer_ip, ...rest } = queryResult;
    return rest;
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
