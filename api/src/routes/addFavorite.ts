import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {




	const username: string = String(req.body.data.username);
	const postId: number = Number(req.body.data.postId);
	const user = await prisma.user.findUnique({ where: { username: username } });
	const favorite = await prisma.favorite.findFirst({ where: { userId: user } });
	try {
		await prisma.postsOnFavorites.create({
			data: {
				post: {
					connect: { id: postId }
				},
				favorite: {
					connect: { id: favorite?.id }
				}
			}
		})
		res.send("creado");
	}
	catch (error) {
		res.status(400).send(error);
	}
});

export default router;