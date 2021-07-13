import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
    let inf_beer = await prisma.specificType.findMany()
    let types= inf_beer.map(beer=>beer.type)
    res.send(types)
})

export default router;