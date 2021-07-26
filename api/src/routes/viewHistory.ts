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

interface Countable {
	id: number;
	price: number;
	discount: number;
	expireDate: Date;
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
	countable: Countable;
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
	post: Post;
}

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const userId: number = Number(req.query.userId);
	const user = await prisma.user.findUnique({ where: { id: userId } });
	const history: Results[] = await prisma.postsOnViews.findMany({
		where: {
			viewsId: user?.viewsId
		},
		select: {
			post: {
				include: {
					beer: true,
					countable: true
				}
			}
		}
	})
	res.send(history);
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const username: string = String(req.body.data.username);
	const postId: number = Number(req.body.data.postId);
	const user = await prisma.user.findUnique({ where: { username: username } });
	const viewsId = (await prisma.views.findFirst({ where: { userId: user } }))?.id;
	try {
		await prisma.postsOnViews.create({
			data: {
				post: {
					connect: { id: postId }
				},
				views: {
					connect: { id: viewsId }
				}
			}
		})
		return res.send("creado");
	}
	catch (err) {
		return res.send("existente");
	}
});

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
	const userId: number = req.body.userId;
	const user = await prisma.user.findUnique({ where: { id: userId } });
	const viewsId = (await prisma.views.findFirst({ where: { userId: user } }))?.id;
	await prisma.postsOnViews.deleteMany({
		where: {
			viewsId: user?.viewsId
		}
	})
	return res.send("borrado");
});

export default router;