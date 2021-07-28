import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

interface CartToTransaction {
  postId: number;
  quantity: number;
  price: number;
  buyerId: number;
}

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const buyer = await findUserWithAnyTokenBabe(req, prisma);
  const cart = await prisma.postsOnCart.findMany({
    where: { cartId: buyer?.cartId },
    include: { post: { include: { countable: true } } },
  });
  if (buyer) {
    cart.map(async (item) =>
      await prisma.transaction.create({
        data: {
          quantity: item.amount,
          price: item.post.countable.price,
          buyerId: buyer?.id,
          postId: item.post.id,
        },
      })
    );
  }
  await prisma.postsOnCart.deleteMany({where: { cartId: buyer?.cartId }})
  res.send("transaccion creada");
});

export default router;
