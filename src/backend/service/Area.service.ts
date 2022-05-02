import { db } from "../db";

class AreaService {
  async findAllArea2() {
    const queryResult = await db.areaCode.findMany({
      where: {
        ko_area_3: "",
      },
    });
    return queryResult;
  }

  async findArea3WithinArea2(areaId: string) {
    const areaPrefix = areaId.substring(0, 4);
    const queryResult = await db.areaCode.findMany({
      where: {
        id: {
          startsWith: areaPrefix,
        },
        AND: [
          {
            NOT: {
              id: areaId,
            },
          },
          {
            id: {
              endsWith: "000",
            },
          },
        ],
      },
    });
    return queryResult;
  }
}
export const areaService = new AreaService();
