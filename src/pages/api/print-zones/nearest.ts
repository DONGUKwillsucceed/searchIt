import { PrintZones, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../backend/db';

async function getNearestWithin(lat: number, lon: number, km: number) {
    const nearest = await db.$queryRaw<Array<PrintZones>>`select *, 
    (6371*acos(cos(radians(${lat}))*cos(radians(latitude))*cos(radians(longitude)-radians(${lon}))+sin(radians(${lat}))*sin(radians(latitude)))) AS distance
    from PrintZones
    having distance <=${km}
    order by distance DESC;`;
    
    return nearest;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  const _lat = typeof query.lat === 'string' ? query.lat : query.lat[0];
  const _lon = typeof query.lon === 'string' ? query.lon : query.lon[0];

  const lat = parseFloat(_lat);
  const lon = parseFloat(_lon);

  if(lat === NaN || lon === NaN) {
    return res.status(400).send('Invalid latitude and longitude');
  }

  const printZones = await getNearestWithin(lat, lon, 10);
  return res.json(printZones);
} 
