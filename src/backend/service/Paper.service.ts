import { db } from "../db";
import { NotFoundError } from "../errors";

class PaperService {
  async findPaperSizeMany() {
    const queryResult = await db.paperSizes.findMany();
    if (!queryResult) {
      throw new NotFoundError("There isn't any papersize!");
    }
    return queryResult;
  }

  async findPaperTypeMany() {
    const queryResult = await db.paperTypes.findMany();
    if (!queryResult) {
      throw new NotFoundError("There isn't any papertype!");
    }
    return queryResult;
  }
}

export const paperService = new PaperService();
