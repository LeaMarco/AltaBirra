import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

interface UserQuery {
	username?: string;
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	// const { username }: UserQuery = req.query;
	const user = await findUserWithAnyTokenBabe(req, prisma)
	const posts = await prisma.postsOnFavorites.findMany({
		where: {
			favoriteId: user?.favoriteId
		},
		select: {
			post: {
				include: {
					beer: true,
					countable: true
				}
			}
		}
	})
	res.json(posts);
})

export default router;