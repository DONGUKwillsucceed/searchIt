import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../backend/errors";
import { noticeService } from "../../backend/service/Notice.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const notices = await noticeService.findMany();
      res.status(200).json(notices);
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        res.status(404).send("id에 해당하는 태그를 찾지 못했습니다.");
      } else {
        res.status(500).send(err.message);
      }
    }
  }
};
