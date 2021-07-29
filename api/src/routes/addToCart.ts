import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

interface Cart {
    username: string;
    postId: number;
    quantity: number;
}

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
    const { postId, quantity }: Cart = req.body.params;
    // const user = await prisma.user.findUnique({ where: { username: username } });
    const user = await findUserWithAnyTokenBabe(req, prisma)
    // const cart = await prisma.cart.findFirst({ where: { userId: user } });
    // const post = await prisma.post.findUnique({ where: { id: postId } });

    if (user) {

        const amount = (await prisma.postsOnCart.findUnique(
            {
                where: {
                    cartId_postId: { cartId: user.cartId, postId }
                }
            })
        )?.amount || 0

        await prisma.postsOnCart.upsert({
            create: {
                cartId: user.cartId,
                postId: postId,
                amount: 1
            },
            update: {
                amount: !quantity ? amount + 1 : quantity
            },
            where: {
                cartId_postId: { cartId: user.cartId, postId }
            }
        })
            .catch((error) => res.status(500).send(error));
    }


    res.status(200).send("Birra agregada al carrito");

})

export default router;

/* if (cart?.id) await prisma.postsOnCart.update({
    where: {
        cartId_postId: { cartId: cart.id, postId: postId }
    }, data: { amount: quantity }
}).catch(async () =>

    await prisma.postsOnCart.create({
        data: {
            post: {
                connect: { id: post?.id }
            },
            cart: {
                connect: { id: cart?.id }
            },
            amount: quantity
        }
    }))

    .catch((error) => res.status(500).send(error)); */

