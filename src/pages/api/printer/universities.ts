import { NextApiRequest, NextApiResponse } from "next";
import { tagService } from "../../../backend/service/Tag.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const data = await tagService.countPrintZonesForTagType("university");
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).send(err.toJSON ? err.toJSON() : null);
    }
  }
};
