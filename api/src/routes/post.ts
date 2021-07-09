import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import paginated from "../functions/funciones";
const router = Router();
const prisma = new PrismaClient();

// the /beers returns ALL the data instead when you do /beers?page=1 it returns it paged according to the number placed on page
interface Beer {
  Name: string;
  Abv: number;
  Og: number;
  Ibu: number;
  Calories: number;
  DryHop: boolean;
  Volume: number;
  Type: string;
  GenericType: string;
  SpecificType: string;
}

interface InfoPost {
  Title: string;
  Description: string;
  img: string;
  Stock: number;
  Rating: number;
  Shipping: boolean;
  Visibility: boolean;
  CreatedAt: Date;
  UserName: string;
}

interface Countable {
  Price: number;
  Discount: number;
  ExpireDate: Date
}

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const {
    Name,
    Abv,
    Og,
    Ibu,
    Calories,
    DryHop,
    Volume,
    GenericType,
    SpecificType,
  }: Beer = req.body.beer;

  const {
    Title,
    Description,
    img,
    Stock,
    Rating,
    Shipping,
    Visibility,
    CreatedAt,
    UserName,
  }: InfoPost = req.body.infoPost;

  const { Price, Discount }: Countable = req.body.countable;

  const user = await prisma.user.findUnique({ where: { UserName: UserName } });
  const beerGenericType = await prisma.genericType.findUnique({
    where: { GenericType: GenericType },
  });
  const beerSpecificType = await prisma.specificType.findUnique({
    where: { SpecificType: SpecificType },
  });

  await prisma.post.create({
    data: {
      Title,
      Description,
      img,
      Stock,
      Rating,
      Shipping,
      Visibility,
      CreatedAt,
      UserName: {
        connect: { id: user?.id },
      },
      beer: {
        create: {
          data: {
            Name,
            Abv,
            Og,
            Ibu,
            Calories,
            DryHop,
            Volume,
            genericType: {
              connect: { id: beerGenericType?.id },
            },
            specificType: {
              connect: { id: beerSpecificType?.id },
            },
          },
        },
      },
      countableId: {
          create:{
              data:{
                  Price,
                  Discount,
              }
          }
      }
    },
  }).catch((error) => console.log(error));
  res.send("creado");
});

export default router;
