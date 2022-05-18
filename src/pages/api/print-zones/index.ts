import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { PrintZoneCreateDto } from "../../../backend/dto/PrintZoneCreateDto";
import { printZoneService } from "../../../backend/service/PrintZone.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const pzCreateDto = plainToClass(PrintZoneCreateDto, req.body);

    const errors = await validate(pzCreateDto);
    if (errors.length > 0) {
      return res.status(400).json(errors[0]);
    }

    const ip = requestIp.getClientIp(req);
    const printZone = await printZoneService.add(pzCreateDto, ip ?? "");

    return res.json(printZone);
  }
};
