import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/:id", async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    const cart = await prisma.postsOnCart.findMany({
        where: {
            cartId: id,
        },
        select: {
            amount: true,
            post: {
                include: {
                    countable: true,
                }
            },
            cart:{
                include: {
                    userId:true
                }
            }
        }
    }).catch((error) => res.status(500).send(error));
    res.status(200).send(cart)
    
})
export default router;
