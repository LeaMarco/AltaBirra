import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface Cart {
    data: number;
}

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
    const data: number = req.body.data;
    // const user = await prisma.user.findUnique({ where: { username: username } });
    // const cart = await prisma.cart.findFirst({ where: { userId: user } });
    if(data)await prisma.postsOnCart.deleteMany({
        where: {
            cartId:data
        }
    })
    res.send("Borrado del carrito");
});

export default router;