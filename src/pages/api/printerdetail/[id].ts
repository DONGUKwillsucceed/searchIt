import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../../backend/errors";
import { printDetailService } from "../../../backend/service/PrintDetail.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const id = req.query.id as string;
    try {
      const printZones = await printDetailService.findUnique(id);
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
