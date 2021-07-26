import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

interface Transaction {
	postId: number;
	quantity: number;
}

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const buyer = await findUserWithAnyTokenBabe(req, prisma)
	const { postId, quantity }: Transaction = req.body;
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