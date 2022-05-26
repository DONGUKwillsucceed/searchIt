import { NextApiRequest, NextApiResponse } from "next";
import { printZoneService } from "../../../backend/service/PrintZone.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const printZone = await printZoneService.pzInfomationOnMap();
      res.status(200).json(printZone);
    } catch (err: any) {
      res.status(500).send(err.toJSON ? err.toJSON() : null);
    }
  }
};
