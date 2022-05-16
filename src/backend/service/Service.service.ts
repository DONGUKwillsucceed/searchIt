import { db } from "../db";

class ServiceService {
  async findMany() {
    const queryResult = await db.services.findMany();
    return queryResult;
  }
}

export const serviceService = new ServiceService();
