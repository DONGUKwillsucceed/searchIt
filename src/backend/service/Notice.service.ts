import { NotFoundError } from "../errors";
import { db } from "../db";

class NoticeService {
  async findMany() {
    const queryResult = await db.notices.findMany({
      select: {
        id: true,
        type: true,
        title: true,
        created_at: true,
      },
    });
    if (!queryResult) {
      throw new NotFoundError("Notice 존재하지 않음");
    }
    return queryResult;
  }

  async findUnique(id: string) {
    const queryResult = await db.notices.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        created_at: true,
        content_html: true,
        opengraph_url: true,
      },
    });
    if (!queryResult) {
      throw new NotFoundError("No PrintZone with id");
    }
    return queryResult;
  }
}

export const noticeService = new NoticeService();
