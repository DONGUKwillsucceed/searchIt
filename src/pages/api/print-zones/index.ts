import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { PrintZoneCreateDto } from "../../../backend/dto/PrintZoneCreateDto";
import { printZoneService } from "../../../backend/service/PrintZone.service";
import { printZoneSearchService } from "../../../backend/service/PrintZone.service/PrintZoneSearch.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // 새로운 print zone 추가
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

  // print zone 검색, 쿼리스트링 q 사용
  if (req.method === "GET" && req.query.q) {
    const query = req.query.q;

    let keyword: string;
    if (typeof query !== "string") {
      keyword = query[0];
    } else {
      keyword = query;
    }
    console.log("🚀 ~ file: index.ts ~ line 33 ~ query", keyword);

    let dtos = await printZoneSearchService.search(keyword);
    console.log("🚀 ~ file: index.ts ~ line 37 ~ queryResult", dtos);

    return res.json(dtos);
  }

  // area code 를 통해 쿼리
  if (req.method === "GET" && req.query["area-code"]) {
    const query = req.query["area-code"];

    let areaCode: string;
    if (typeof query !== "string") {
      areaCode = query[0];
    } else {
      areaCode = query;
    }
    console.log("🚀 ~ file: index.ts ~ line 33 ~ query", areaCode);

    let dtos = await printZoneService.findManyByAreaCode(areaCode);
    console.log("🚀 ~ file: index.ts ~ line 37 ~ queryResult", dtos);

    return res.json(dtos);
  }
};
