import { db } from "../db";
import { NotFoundError } from "../errors";
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
    if (!queryResult) {
      throw new NotFoundError("Not applied Service with id");
    }
    return queryResult.map((q) => q.ServiceType);
  }
}

export const serviceService = new ServiceService();
