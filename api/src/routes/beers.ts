import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface Body {
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
  }: Body = req.body;

  const beerGenericType = await prisma.genericType.findUnique({ where: { type: genericType } });
  const beerSpecificType = await prisma.specificType.findUnique({ where: { type: specificType } });

  await prisma.beer.create({
    data: {
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
  }).catch(error => (console.log(error)))
  res.send("creado");
});

export default router;

