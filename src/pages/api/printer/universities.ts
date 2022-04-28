import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export async function countPrinterUniversities(){
    const prisma = new PrismaClient();
    let data = [];
    const result = await prisma.tagTypes.findFirst({
        where : {
            type : 'university'
        },
        select : {
            Tag:{
                select:{
                    value:true,
                    _count:{
                        select:{
                            PrintZone_Tag:true
                        }
                    }
                }
            }
        }
    });
    if(!result){
        return ;
    }
    const unis = result.Tag
    for(const uni of unis){
        const {PrintZone_Tag} = uni._count;
        const info = {
            college : uni.value,
            count : PrintZone_Tag
        }
        data.push(info);
    }
    return data;
}


export default async (req : NextApiRequest, res : NextApiResponse)=>{
    if(req.method === 'GET'){
        const data = await countPrinterUniversities();
        res.status(200).json(data);
    }
}