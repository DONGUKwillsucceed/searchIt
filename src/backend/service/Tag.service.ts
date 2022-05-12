import { db } from "../db";
import { LogicalError, NotFoundError } from "../errors";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_TAG_TYPE_ID, TAG_DEFAULT_WEIGHT } from "../const";

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

  async findManyByTagTypeWithPrintZoneCount(tagType: string) {
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
      id: t.id,
      university: t.value,
      count: t._count.PrintZone_Tag,
    }));
  }

  async getTagOrInsertWhenNotExists(tagName: string) {
    let tag = await db.tag.findFirst({
      where: {
        value: tagName,
      },
    });

    if (!tag) {
      const id = uuidv4();
      tag = await db.tag.create({
        data: {
          id,
          created_at: new Date(),
          weight: TAG_DEFAULT_WEIGHT,
          value: tagName,
          search_engine_expose: 0,
          TagTypes: {
            connect: {
              id: DEFAULT_TAG_TYPE_ID,
            },
          },
        },
      });
    }
    return tag;
  }
}
export const tagService = new TagService();
