import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface SearchQuery {
	search?: string;
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const { search }: SearchQuery = req.query;

	const posts = await prisma.post.findMany({
		where: {
			title: {
				contains: search,
				mode: "insensitive"
			}
		},
		select: {
			title: true
		},
		distinct: ['title'],
		take: 5
	})
	res.json(posts);
})

export default router;