import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { LabeledStatement } from "typescript";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";


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

  const user = await findUserWithAnyTokenBabe(req, prisma)

  console.log("user", user)
  console.log("patams", req.body.params)

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
  }: Beer = req.body.params.beer;

  const {
    title,
    description,
    image,
    stock,
    rating,
    shipping,
    visibility,
    username,
  }: InfoPost = req.body.params.infoPost;

  const price: number = +req.body.params.countable.price;
  const discount: number = +req.body.params.countable.discount;

  // const user = await prisma.user.findUnique({ where: { id: id } });
  const beerGenericType = await prisma.genericType.findUnique({ where: { type: genericType } });
  const beerSpecificType = await prisma.specificType.findUnique({ where: { type: specificType } });
  console.log("beerGenericType", beerGenericType)
  console.log("beerSpecificType", beerSpecificType)


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
  }).catch((error) => res.status(500).send(error));
  res.status(200).send('Post creado con exito');
});

export default router;