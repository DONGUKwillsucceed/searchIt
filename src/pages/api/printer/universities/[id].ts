import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';


export async function PrinterUniversities(id : string){
    const prisma = new PrismaClient();
    const printZones = [];
    const result = await prisma.tag.findUnique({
        where:{
            id
        },
        select:{
            PrintZone_Tag:{
                select:{
                    PrintZone_id:true
                }
            }
        }
    })
    if(!result){
        return ;
    }
    const ids = result.PrintZone_Tag;
    for(const id of ids){
        const {PrintZone_id} = id;
        const result = await prisma.printZones.findUnique({
            where:{
                id : PrintZone_id,
            },
            select:{
                id:true,
                created_at:true,
                updated_at:true,
                company:true,
                latitude:true,
                longitude:true,
                AreaCode_id:true,
                address_detail:true,
                priority:true,
                status:true,
            }
        });
        printZones.push(result);
    }
    return printZones;
}


export default async (req : NextApiRequest, res : NextApiResponse)=>{
    if(req.method === 'GET'){
        const id = <string>req.query.id;
        const data = await PrinterUniversities(id);
        res.status(200).json(data);
    }
}