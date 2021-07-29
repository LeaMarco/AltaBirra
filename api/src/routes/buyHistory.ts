import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

interface History {
	state: string,
	quantity: number,
	price: number;
	createdAt: Date;
	post: Post;
}

interface Post {
	id: number;
	title: string;
	description: string;
	image: string;
	rating: number;
	stock: number;
	shipping: boolean;
	visibility: boolean;
	createdAt: Date;
	beerId: number;
	userId: number;
	countableId: number;
	beer: Beer;
}

interface Beer {
	id: number;
	abv: number;
	og: number | null;
	ibu: number;
	calories: number | null;
	dryHop: boolean | null;
	volume: number;
	genericTypeId: number;
	specificTypeId: number;
}

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const user = await findUserWithAnyTokenBabe(req, prisma);
	const { filter }: any = req.query;
	const history: History[] = await prisma.transaction.findMany({
		where: {
			buyerId: user?.id,
			state: filter
		},
		include: {
			post: {
				include: { beer: true }
			}
		}
	})
	res.send(history);
});

export default router;