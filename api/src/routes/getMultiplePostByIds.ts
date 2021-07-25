import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {


    const idsArray = req.body.ids
    const posts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    id: {
                        in: idsArray
                    }
                }

            ],
        },
        include: {
            beer: true
        },
    })

    res.json(posts)
})

export default router;