import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { db } from '../db';

export async function findManyByTagType(tagType: string) {
  const queryResult = await db.tag.findMany({
    where: {
      TagTypes: {
        type: tagType,
      },
    },
    
  });
}
