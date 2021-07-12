import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/:id", async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)

    let inf_beer = await prisma.beer.findUnique({
        where: {
            id: id,
        }
    })
    let inf_gen = await prisma.genericType.findFirst({
        where: {
            id: inf_beer?.genericTypeId
        }
    })
    let inf_spe = await prisma.specificType.findFirst({
        where: {
            id: inf_beer?.specificTypeId
        }
    })

    res.send({
        inf_beer,
        inf_gen,
        inf_spe
    })
})

export default router;