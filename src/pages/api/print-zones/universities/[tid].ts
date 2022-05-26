import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../../../backend/errors";
import { printZoneService } from "../../../../backend/service/PrintZone.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const id = req.query.tid as string;
    if (!id) {
      return res.status(400).send("적절한 tid(Tagid) 가 포함되지 않았습니다.");
    }

    try {
      const printZones = await printZoneService.findManyByTagId(id);
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
