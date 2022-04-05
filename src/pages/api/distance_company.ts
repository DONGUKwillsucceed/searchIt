import { PrintZones, PrismaClient } from '@prisma/client';
import { queryByRole } from '@testing-library/react';
import type { NextApiRequest, NextApiResponse } from 'next'



export async function loc_distance_List(lat: number, lon: number) {
    const prisma = new PrismaClient();
    const distance_List = await prisma.$queryRaw<Array<PrintZones>>`select PrintZoneID,Company,Latitude,Longitude,PriceA4Black,PriceA4Color,
    PhoneNumber,Description,PrinterCustomHTML,address_detail,
    (6371*acos(cos(radians(${lat}))*cos(radians(Latitude))*cos(radians(Longitude)-radians(${lon}))+sin(radians(${lat}))*sin(radians(Latitude)))) AS distance
    from PrintZones
    having distance <=5
    order by distance DESC;`
    
    return distance_List
}
  
 
export default async (req: NextApiRequest, res: NextApiResponse) => {
  //res: NextApiResponse<PrintZones> 
  const { query } = req;

  // query 잘못 왔을 때 처리 -> 예외처리

  const _lat = typeof query.lat === 'string' ? query.lat : query.lat[0];
  const _lon = typeof query.lon === 'string' ? query.lon : query.lon[0];

  const lat = parseFloat(_lat);
  const lon = parseFloat(_lon);

  if(lat === NaN || lon === NaN) {
    return res.status(400).send('');
  }

  const apilist = await loc_distance_List(lat,lon)
  // console.log(apilist)
  return res.json(apilist)
} 
 