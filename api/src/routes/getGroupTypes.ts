import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.put("/", async (req: Request, res: Response) => {
    const {typeToChange, name, description} = req.body.data     
      await prisma.genericType.update({
        where: { type: typeToChange },
        data: {
         type: name,
         description
        },
      }).catch((error) => res.status(500).send(error));
      res.status(200).send('Tipo genérico editado con exito');
    });


router.post("/", async (req: Request, res: Response) => {
    const {name, description} = req.body.data
    await prisma.genericType.create({
        data: {
          type: name,
          description
        },
      }).catch((error) => res.status(500).send(error));
    res.send("Tipo genérico agregado con éxito")
})

router.get("/", async (req: Request, res: Response) => {
    let inf_beer = await prisma.genericType.findMany()
    await prisma.$queryRaw
    let types= inf_beer.map(beer=> beer.type)
    res.send(types)
})

router.get("/detail", async (req: Request, res: Response) => {
  console.log(typeof(req.query.type), "bodyyyy")
    const type: string | undefined= req.query.type?.toString()
    let detail = await prisma.genericType.findUnique({
        where: { type: type }
      })
      console.log(detail, "DETAILLL")
    res.send(detail)
})

export default router;