import { db } from "../db";
import { LogicalError, NotFoundError } from "../errors";

class TagService {
  async findManyByTagType(tagType: string) {
    const queryResult = await db.tag.findMany({
      where: {
        TagTypes: {
          type: tagType,
        },
      },
    });
    if (!queryResult) {
      throw new NotFoundError("해당하는 tag type 없음");
    }
    return queryResult;
  }

  async countPrintZonesForTagType(tagType: string) {
    const queryResult = await db.tagTypes.findFirst({
      where: {
        type: tagType,
      },
      select: {
        Tag: {
          select: {
            id: true,
            value: true,
            _count: {
              select: {
                PrintZone_Tag: true,
              },
            },
          },
        },
      },
    });

    if (!queryResult) {
      throw new LogicalError("Tag type 에 university 가 존재하지 않음");
    }

    return queryResult.Tag.map((t) => ({
      id: t.value,
      university: t.value,
      count: t._count,
    }));
  }
}
export const tagService = new TagService();
