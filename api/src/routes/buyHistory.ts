import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const buyerId: number = Number(req.query.userId);
	const history = await prisma.transaction.findMany({
		where: {
			buyerId
		},
		select: {
			price: true,
			createdAt: true,
			post: {
				include: {
					beer: true
				}
			}
		}
	})
	res.send(history);
});

export default router;