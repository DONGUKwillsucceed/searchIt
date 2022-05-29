import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextApiRequest, NextApiResponse } from "next";
import { ReplyCreateDto } from "../../../../backend/dto/ReplyCreateDto";
import requestIp from "request-ip";
import { replyService } from "../../../../backend/service/Reply.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    console.log(req.body);

    const dto = plainToClass(ReplyCreateDto, req.body);
    console.log(dto);
    
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json(errors[0]);
    }

    const ip = requestIp.getClientIp(req);
    const reply = await replyService.add(dto, ip ?? "");

    return res.json(reply);
  }
};
