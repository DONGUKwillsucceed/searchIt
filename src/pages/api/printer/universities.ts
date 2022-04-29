import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { LogicalError } from "../../../backend/errors";

export async function countPrinterUniversities() {
  const prisma = new PrismaClient();
  const queryResult = await prisma.tagTypes.findFirst({
    where: {
      type: "university",
    },
    select: {
      Tag: {
        select: {
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
    university: t.value,
    count: t._count,
  }));
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const data = await countPrinterUniversities();
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).send(err.toJSON ? err.toJSON() : null);
    }
  }
};
