import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

export async function printerByUni(uni : string | string[]){
    const prisma = new PrismaClient();
    const printZones : any[] = [];
    const PrintZone_ID = await prisma.tag.findMany({
        where : {
            Value: <string>uni,
        },
        select :{
            PrintZone_Tag : {
                select :{
                    PrintZoneID:true,
                }
            }
        }
    });
    const {PrintZone_Tag} = PrintZone_ID[0];
    for(const tag of PrintZone_Tag){
        const {PrintZoneID} = tag;
        console.log(PrintZoneID);
        const printerZone = await prisma.printZones.findMany({
            where : {
                PrintZoneID : <string>PrintZoneID
            }
        })
        printZones.push(printerZone[0]);
    }
    return printZones;
}

export default async(req : NextApiRequest, res : NextApiResponse)=>{
    if(req.method === 'GET'){
        const uni:string | string[] = req.query.uni;
        console.log(uni);
        const printers = await printerByUni(uni);
        if(!printers){
            res.status(404).json({message : 'not Found!!!'});
        }
        else{
            res.status(200).json(printers);
        }
    }
}