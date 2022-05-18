import { db } from "../db";
import { ServiceProposeStatus } from "../types/ServiceProposeStatus";

class ServiceService {
  async findMany(id: string) {
    const queryResult = await db.services.findMany({
      where: {
        PrintZone_id: id,
        status: ServiceProposeStatus.Applied,
      },
      select: {
        ServiceType: true,
      },
    });
    return queryResult.map((q) => q.ServiceType);
  }
}

export const serviceService = new ServiceService();
