import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
	// const username: string = String(req.body.username);
	const postId: number = Number(req.body.postId);
	const user = await findUserWithAnyTokenBabe(req, prisma)
	const favorite = await prisma.favorite.findFirst({ where: { userId: user } });
	try {
		if (favorite) {
			await prisma.postsOnFavorites.delete({
				where: {
					favoriteId_postId: { favoriteId: favorite.id, postId }
				}
			})
		}
		res.send("borrado de favoritos");
	}
	catch (error) {
		res.status(400).send(error);
	}
});

export default router;