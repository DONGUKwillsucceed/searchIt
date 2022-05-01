import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../errors";

export async function getPzNearUniv(id: string) {
  const prisma = new PrismaClient();
  const queryResult = await prisma.tag.findUnique({
    where: {
      id,
    },
    select: {
      PrintZone_Tag: {
        select: {
          PrintZone_id: true,
        },
        include: {
          PrintZones: {
            select: {
              id: true,
              created_at: true,
              updated_at: true,
              company: true,
              latitude: true,
              longitude: true,
              AreaCode_id: true,
              address_detail: true,
              priority: true,
              status: true,
            },
          },
        },
      },
    },
  });

  if (!queryResult) {
    throw new NotFoundError("해당하는 대학교가 존재하지 않음");
  }

  return queryResult.PrintZone_Tag.map((r) => r.PrintZones).map((pz) => pz);
}