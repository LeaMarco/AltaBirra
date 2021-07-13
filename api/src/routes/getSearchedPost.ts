import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface PostQuery {
	title?: string;
	genericType?: string;
	specificType?: string;
	orderBy?: string;
}

interface OrderBeers {
	price?: Prisma.SortOrder;
	ibu?: Prisma.SortOrder;
	abv?: Prisma.SortOrder;
}

interface OrderPosts {
	beer?: OrderBeers;
	countable?: OrderBeers;
	rating?: Prisma.SortOrder;
}

interface CheckDiscount {
	gte?: number;
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const {
		title,
		genericType,
		specificType,
		orderBy
	}: PostQuery = req.query;

	const rating: number | undefined = !req.query.rating ? undefined : Number(req.query.rating);
	const minIbu: number | undefined = !req.query.minIbu ? undefined : Number(req.query.minIbu);
	const maxIbu: number | undefined = !req.query.maxIbu ? undefined : Number(req.query.maxIbu);
	const minPrice: number | undefined = !req.query.minPrice ? undefined : Number(req.query.minPrice);
	const maxPrice: number | undefined = !req.query.maxPrice ? undefined : Number(req.query.maxPrice);
	const minAbv: number | undefined = !req.query.minAbv ? undefined : Number(req.query.minAbv);
	const maxAbv: number | undefined = !req.query.maxAbv ? undefined : Number(req.query.maxAbv);
	const minOg: number | undefined = !req.query.minOg ? undefined : Number(req.query.minOg);
	const maxOg: number | undefined = !req.query.maxOg ? undefined : Number(req.query.maxOg);
	const minCalories: number | undefined = !req.query.minCalories ? undefined : Number(req.query.minCalories);
	const maxCalories: number | undefined = !req.query.maxCalories ? undefined : Number(req.query.maxCalories);
	const hasShipping: boolean | undefined = !req.query.hasShipping ? undefined : Boolean(req.query.hasShipping);
	const hasDiscount: boolean | undefined = !req.query.hasDiscount ? undefined : Boolean(req.query.hasDiscount);
	const hasDryHop: boolean | undefined = !req.query.hasDryHop ? undefined : Boolean(req.query.hasDryHop);
	const checkDiscount: CheckDiscount | undefined = hasDiscount ? { gte: 1 } : undefined;

	let orderTemp: OrderPosts | undefined;
	switch (orderBy) {
		case "Menor precio": {
			orderTemp = { countable: { price: "asc" } };
			break;
		}
		case "Mayor precio": {
			orderTemp = { countable: { price: "desc" } };
			break;
		}
		case "Menor IBU": {
			orderTemp = { beer: { ibu: "asc" } };
			break;
		}
		case "Mayor IBU": {
			orderTemp = { beer: { ibu: "desc" } };
			break;
		}
		case "Menor ABV": {
			orderTemp = { beer: { abv: "asc" } };
			break;
		}
		case "Mayor ABV": {
			orderTemp = { beer: { abv: "desc" } };
			break;
		}
		case "Mejor rating": {
			orderTemp = { rating: "desc" };
			break;
		}
	}

	const posts = await prisma.post.findMany({
		where: {
			title: {
				contains: title,
				mode: "insensitive"
			},
			shipping: hasShipping,
			rating: { gte: rating },
			countable: {
				AND: [
					{ price: { gte: minPrice } },
					{ price: { lte: maxPrice } },
					{ discount: checkDiscount }
				],
			},
			beer: {
				AND: [
					{ genericType: { type: genericType } },
					{ specificType: { type: specificType } },
					{ ibu: { gte: minIbu } },
					{ ibu: { lte: maxIbu } },
					{ abv: { gte: minAbv } },
					{ abv: { lte: maxAbv } },
					{ og: { gte: minOg } },
					{ og: { lte: maxOg } },
					{ calories: { gte: minCalories } },
					{ calories: { lte: maxCalories } },
					{ dryHop: hasDryHop }
				]
			}
		},
		include: {
			countable: true,
			beer: true
		},
		orderBy: orderTemp
	})
	res.json(posts);
})

export default router;