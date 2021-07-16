import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface UserQuery {
	username?: string;
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const { username }: UserQuery = req.query;
	const user = await prisma.user.findUnique({ where: { username } });
	console.log(user);
	const posts = await prisma.postsOnFavorites.findMany({
		//☢ comente esta de abajo sino rompia el codigo
		where: {
			// favoriteId: user?.favoriteId
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