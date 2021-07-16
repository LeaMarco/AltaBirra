import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface Rating {
	userId: number;
	postId: number;
	rating: number;
	comment: string;
}

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
	const { userId, postId, rating, comment }: Rating = req.body.data;
	const allRating = await prisma.review.findMany({
		where: {
			postId
		},
		select: {
			rating: true
		}
	});
	const averageRating = allRating.length ? +((allRating.map(obj => obj.rating).reduce((a: number, b: number) => (a + b), 0) + rating) / (allRating.length + 1)).toFixed(2) : undefined;

	await prisma.post.update({
		where: {
			id: postId
		},
		data: {
			rating: averageRating,
			review: {
				create: {
					rating,
					comment,
					user: {
						connect: { id: userId }
					}
				}
			}
		}
	})
	res.send("creado");
});

export default router;