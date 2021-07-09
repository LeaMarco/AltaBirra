import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
const router = Router();
const prisma = new PrismaClient();

interface Beer {
  name: string;
  abv: number;
  og: number;
  ibu: number;
  calories: number;
  dryHop: boolean;
  volume: number;
  genericType: string;
  specificType: string;
}

interface InfoPost {
  title: string;
  description: string;
  image: string;
  stock: number;
  rating: number;
  shipping: boolean;
  visibility: boolean;
  username: string;
}

interface Countable {
  price: number;
  discount: number;
}

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    abv,
    og,
    ibu,
    calories,
    dryHop,
    volume,
    genericType,
    specificType,
  }: Beer = req.body.beer;

  const {
    title,
    description,
    image,
    stock,
    rating,
    shipping,
    visibility,
    username,
  }: InfoPost = req.body.infoPost;

  const { price, discount }: Countable = req.body.countable;

  const user = await prisma.user.findUnique({ where: { username: username } });
  const beerGenericType = await prisma.genericType.findUnique({
    where: { type: genericType }
  });
  const beerSpecificType = await prisma.specificType.findUnique({
    where: { type: specificType }
  });

  await prisma.post.create({
    data: {
      title,
      description,
      image,
      stock,
      rating,
      shipping,
      visibility,
      user: {
        connect: { id: user?.id },
      },
      beer: {
        create: {
          name,
          abv,
          og,
          ibu,
          calories,
          dryHop,
          volume,
          genericType: {
            connect: { id: beerGenericType?.id },
          },
          specificType: {
            connect: { id: beerSpecificType?.id },
          },
        },
      },
      countable: {
        create: {
          price,
          discount,
          expireDate: new Date()
        }
      }
    },
  }).catch((error) => console.log(error));
  res.send("creado");
});

export default router;