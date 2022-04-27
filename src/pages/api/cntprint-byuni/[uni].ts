import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

export async function countPrinterByUni(uni : string | string[]){
    const prisma = new PrismaClient();
    const data = await prisma.tag.findMany({
        where : {
            Value: <string>uni,
        },
        select :{
            PrintZone_Tag : {
                select : {
                    PrintZoneID:true,
                }
            }
        }
    });
    const {PrintZone_Tag} = data[0];
    const count = PrintZone_Tag.length;
    console.log(count);
    return count;
}


export default async (req : NextApiRequest, res : NextApiResponse)=>{
    if(req.method === 'GET'){
        const uni:string|string[] = req.query.uni;
        const count = await countPrinterByUni(uni);
        res.status(200).json(count);
    }
}
