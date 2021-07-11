import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface PostQuery {
	title?: string;
	genericType?: string;
	specificType?: string;
	minIbu?: number;
	maxIbu?: number;
	minPrice?: number;
	maxPrice?: number;
	minAbv?: number;
	maxAbv?: number;
	minOg?: number;
	maxOg?: number;
	minCalories?: number;
	maxCalories?: number;
	rating?: number;
	hasShipping?: boolean;
	hasDiscount?: boolean;
	hasDryHop?: boolean;
	orderBy?: string;
}

interface orderBeers {
	price?: string;
	ibu?: string;
	abv?: string;
}

interface orderPosts {
	beer?: orderBeers;
	countable?: orderBeers;
	rating?: string;
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const {
		title,
		genericType,
		specificType,
		minIbu,
		maxIbu,
		minPrice,
		maxPrice,
		minAbv,
		maxAbv,
		minOg,
		maxOg,
		maxCalories,
		minCalories,
		rating,
		hasShipping,
		hasDiscount,
		hasDryHop,
		orderBy
	}: PostQuery = req.query;

	let orderTemp: orderPosts | undefined;
	switch (orderBy) {
		case "Menor precio": {
			orderTemp = { countable: { price: 'asc' } };
			break;
		}
		case "Mayor precio": {
			orderTemp = { countable: { price: 'desc' } };
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
			title: title,
			shipping: hasShipping,
			rating: rating,
			countable: {
				AND: [
					{ price: { gte: minPrice } },
					{ price: { lte: maxPrice } },
					//discount?
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
		//orderBy: orderTemp
	})
	res.json(posts);
})

export default router;