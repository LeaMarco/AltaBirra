import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
	// const id: number = req.body.id;
	const user = await findUserWithAnyTokenBabe(req, prisma)
	const id = user?.id
	await prisma.post.delete({
		where: {
			id: id
		}
	})
});

export default router;