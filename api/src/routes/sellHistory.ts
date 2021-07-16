import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface Transaction {
	sellerId: number;
}

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const { sellerId }: Transaction = req.body;
	const history = await prisma.transaction.findMany({
		where: {
			post: {
				is: {
					user: {
						id: sellerId
					}
				}
			}
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