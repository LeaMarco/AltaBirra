import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();


router.get('/verifyUser', async(req: Request, res: Response, next: NextFunction) => {
    const user:string = String(req.headers.user);
    
    const match:any = await prisma.user.findUnique({
        where: {
            userHash: user
        }
    })

    if(match){
        const userV = await prisma.user.update({
            where: {
                userHash: user
            },
            data: {
                verify: true
            }
        })

        return res.json({match, userV});
    }

    return res.send('NO SE ENCONTRO EL USERHASH');
    
    
    // const verify = await prisma.user.findUnique({
    //     where: {
    //         userHash: user
    //     }
    // })
    
    
    // let inf_beer = await prisma.specificType.findMany()
    // let types= inf_beer.map(beer=>beer.type)
    // res.send(types)
});

export default router;
