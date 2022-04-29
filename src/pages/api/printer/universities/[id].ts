import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../../../backend/errors";

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const id = req.query.id as string;

    try {
      const printZones = await getPzNearUniv(id);
      res.status(200).json(printZones);
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        res.status(404).send("id 에 해당하는 태그를 찾지 못했습니다.");
      } else {
        res.status(500).send(err.message);
      }
    }
  }
};
