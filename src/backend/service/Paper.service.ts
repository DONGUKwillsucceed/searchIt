import { db } from "../db";

class PaperService {
  async findPaperSizeMany() {
    const queryResult = await db.paperSizes.findMany();
    return queryResult;
  }

  async findPaperTypeMany() {
    const queryResult = await db.paperTypes.findMany();
    return queryResult;
  }
}

export const paperService = new PaperService();
