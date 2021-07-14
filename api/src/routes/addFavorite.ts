import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const username: string = req.body.username;
	const postId: number = Number(req.body.postId);
	const user = await prisma.user.findUnique({ where: { username: username } });
	const favorite = await prisma.favorite.findFirst({ where: { userId: user } });
	const post = await prisma.post.findUnique({ where: { id: postId } });
	await prisma.postsOnFavorites.create({
		data: {
			post: {
				connect: { id: post?.id }
			},
			favorite: {
				connect: { id: favorite?.id }
			}
		}
	})
	res.send("creado");
});

export default router;