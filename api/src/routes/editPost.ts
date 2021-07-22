import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { LabeledStatement } from "typescript";

const router = Router();
const prisma = new PrismaClient();

interface Beer {
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
  shipping: boolean;
  visibility: boolean;
  username: string;
}

interface Countable {
  price: number;
  discount: number;
}


router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body.params, "soy los params")
  const {
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
    shipping,
    visibility,
    username,
  }: InfoPost = req.body.params.infoPost;

  const { price, discount }: Countable = req.body.params.countable;

  const postId: number = req.body.params.postId
  const user = await prisma.user.findUnique({ where: { username: username } });
  const beerGenericType = await prisma.genericType.findUnique({
    where: { type: genericType }
  });
  const beerSpecificType = await prisma.specificType.findUnique({
    where: { type: specificType }
  });

  await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      description,
      image,
      stock,
      shipping,
      visibility,
      user: {
        connect: { id: user?.id },
      },
      beer: {
        create: {
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
  res.status(200).send('Post editado con exito');
});

export default router;