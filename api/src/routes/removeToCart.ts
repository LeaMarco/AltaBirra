import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

interface Cart {
	username: string;
	postId: number;
	cartId: number;
}

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
	const { username, postId, cartId }: Cart = req.body;
	const user = await findUserWithAnyTokenBabe(req, prisma)
	const cart = await prisma.cart.findFirst({ where: { userId: user } });
	if (cart?.id) await prisma.postsOnCart.delete({
		where: {
			cartId_postId: { cartId: cart.id, postId: postId }
		}
	})
		.catch((error) => res.status(500).send(error));
	res.status(200).send("Post eliminado")
});

export default router;

