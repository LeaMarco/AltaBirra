import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const user = await findUserWithAnyTokenBabe(req, prisma)

	const posts = await prisma.post.findMany({
		where: {
			userId: user?.id
		},
		include: {
			beer: true,
			countable: true
		}
	})
	res.json(posts);
})

export default router;