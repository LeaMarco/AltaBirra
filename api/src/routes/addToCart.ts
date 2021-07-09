import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface Cart {
	username: string;
	postId: number;
}

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const { username, postId }: Cart = req.body;
	const user = await prisma.user.findUnique({ where: { username: username } });
	const cart = await prisma.cart.findFirst({ where: { userId: user } });
	const post = await prisma.post.findUnique({ where: { id: postId } });
	await prisma.postsOnCart.create({
		data: {
			post: {
				connect: { id: post?.id }
			},
			cart: {
				connect: { id: cart?.id }
			}
		}
	})
	res.send("creado");
});

export default router;