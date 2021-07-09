import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import paginated from "../functions/funciones";
const router = Router();
const prisma = new PrismaClient();

// the /beers returns ALL the data instead when you do /beers?page=1 it returns it paged according to the number placed on page
interface Body {
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
  }:Body = req.body;
  const beerGenericType = await prisma.genericType.findUnique({ where: { GenericType: GenericType } });
  const beerSpecificType = await prisma.specificType.findUnique({ where: { SpecificType: SpecificType } });

  await prisma.beer.create({
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
  }).catch(error=>(console.log(error)))
  res.send("creado");
});

export default router;

