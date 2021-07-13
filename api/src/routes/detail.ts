import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/:id", async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    console.log("Entre")
    let inf_beer = await prisma.post.findUnique({
        where: {
            id: id,
        },
        include:{
            beer:{
                include:{
                    genericType:true,
                    specificType:true
                }
            },
            countable:true,
        }
    })
    res.send(inf_beer)
})

export default router;