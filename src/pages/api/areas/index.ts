import { NextApiRequest, NextApiResponse } from "next";
import { areaService } from "../../../backend/service/Area.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    let { area2id } = req.query;

    if (!area2id) {
      return res.status(400).json("Request must contain area2id");
    }

    area2id = typeof area2id === "string" ? area2id : area2id[0];
    const areas = await areaService.findArea3WithinArea2(area2id);

    return res.json(areas);
  }
};
