import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

interface Rating {
	userId: number;
	postId: number;
	rating: number;
	comment: string;
}

async function getAverageRating(postId: number) {
	const result = await prisma.review.aggregate({
		where: {
			postId
		},
		_avg: {
			rating: true
		}
	})
	return result._avg.rating ? result._avg.rating : undefined;
}

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
	const user = await findUserWithAnyTokenBabe(req, prisma)
	const { postId, rating, comment }: Rating = req.body;
	await prisma.review.create({
		data: {
			rating,
			comment,
			user: {
				connect: { id: user?.id }
			},
			post: {
				connect: { id: postId }
			}
		}
	});
	await prisma.post.update({
		where: {
			id: postId
		},
		data: {
			rating: await getAverageRating(postId)
		}
	})
	res.send("creado");
});

export default router;