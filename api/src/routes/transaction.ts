import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface Transaction {
	username: string;
	postId: number;
	quantity: number;
}

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const { username, postId, quantity }: Transaction = req.body;
	const buyer = await prisma.user.findUnique({ where: { username: username } });
	const post = await prisma.post.findUnique({ where: { id: postId } });
	const countable = await prisma.countable.findFirst({ where: { postId: post } });
	await prisma.transaction.create({
		data: {
			quantity,
			price: countable?.price || 0,
			buyer: {
				connect: { id: buyer?.id }
			},
			post: {
				connect: { id: postId }
			}
		}
	})
	res.send("creado");
});

export default router;