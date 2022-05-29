import { PrintZones, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { A4_PAPER_SIZE_ID, OFFICE_PAPER_TYPE_ID } from "../../../backend/const";
import { db } from "../../../backend/db";
import { PrintZoneStatus } from "../../../backend/types/PrintZoneStatus";

async function getNearestWithin(lat: number, lon: number, km: number) {
  const nearest = await db.$queryRaw<Array<PrintZones>>`select *, 
    (6371*acos(cos(radians(${lat}))*cos(radians(latitude))*cos(radians(longitude)-radians(${lon}))+sin(radians(${lat}))*sin(radians(latitude)))) AS distance
    from PrintZones
    having distance <=${km}
    order by distance DESC;`;
  console.log(nearest);
  return nearest;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  const _lat = typeof query.lat === "string" ? query.lat : query.lat[0];
  const _lon = typeof query.lon === "string" ? query.lon : query.lon[0];

  const lat = parseFloat(_lat);
  const lon = parseFloat(_lon);

  if (lat === NaN || lon === NaN) {
    return res.status(400).send("Invalid latitude and longitude");
  }

  let printZones = await getNearestWithin(lat, lon, 10);
  printZones = printZones.filter(pz => pz.status == PrintZoneStatus.Registered);
  
  const printZonesWithServices = await Promise.all(printZones.map(async (pz) => {
  console.log("🚀 ~ file: nearest.ts ~ line 34 ~ printZonesWithServices ~ pz", pz)
    const services = await db.services.findMany({
      where: {
        PrintZone_id: pz.id,
        PaperTypes: { id: OFFICE_PAPER_TYPE_ID },
        PaperSizes: { id: A4_PAPER_SIZE_ID },
      },
    });
    return {
      ...pz,
      services,
    };
  }));
  console.log("🚀 ~ file: nearest.ts ~ line 47 ~ printZonesWithServices ~ printZonesWithServices", printZonesWithServices)
  return res.json(printZonesWithServices);
};
