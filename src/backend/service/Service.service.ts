import { db } from "../db";
import { ServiceProposeStatus } from "../types/ServiceProposeStatus";

class ServiceService {
  async findMany(id: string) {
    const queryResult = await db.services.findMany({
      where: {
        PrintZone_id: id,
        status: ServiceProposeStatus.Applied,
      },
    });
    return queryResult;
  }
}

export const serviceService = new ServiceService();
