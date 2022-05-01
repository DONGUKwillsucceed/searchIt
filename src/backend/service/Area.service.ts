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
        NOT: {
          id: areaId,
        }
      }
    });
    return queryResult;
  }
}
export const areaService = new AreaService();
