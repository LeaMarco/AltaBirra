import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
	const transactionId: number = Number(req.body.transactionId);
	const newState: any = req.body.newState;
	await prisma.transaction.update({
		where: {
			id: transactionId
		},
		data: {
			state: newState
		}
	})
	return res.send();
});

export default router;