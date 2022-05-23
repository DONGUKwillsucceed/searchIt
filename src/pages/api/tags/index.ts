import { NextApiRequest, NextApiResponse } from "next";
import { tagService } from "../../../backend/service/Tag.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    let { query } = req.query;
    if (!query) {
      return res.status(400).json("Request must contain keyword");
    }

    query = typeof query === "string" ? query : query[0];

    try {
      const data = await tagService.searchTagName(query);
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).send(err.toJSON ? err.toJSON() : null);
    }
  }
};
