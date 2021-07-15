import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
	const id: number = req.body.id;
	await prisma.post.delete({
		where: {
			id: id
		}
	})
	res.send("post borrado");
});

export default router;