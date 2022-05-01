import { NotFoundError } from "../errors";
import { db } from "../db";
import { tagService } from "./Tag.service";

class PrintZoneService {
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
}
export const printZoneService = new PrintZoneService();
