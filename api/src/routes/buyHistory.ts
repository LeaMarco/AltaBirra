import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface Algo {
	price: number;
	createdAt: Date;
	post: Post;
}

interface History {
	price: number;
	createdAt: Date;
	post: Post;
	count: number;
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

interface Results {
	[key: string]: History;
}

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const buyerId: number = Number(req.query.userId);
	const history: Algo[] = await prisma.transaction.findMany({
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
	const posts: Results = {};
	history.map((post: Algo) => {
		!posts.hasOwnProperty(post.post.id) ? posts[post.post.id] = { ...post, count: 1 } : posts[post.post.id].count += 1;
	})
	res.send(Object.values(posts));
});

export default router;