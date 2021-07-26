import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.put("/", async (req: Request, res: Response) => {
  const {typeToChange, type, description} = req.body.params    
	const originalType = await prisma.genericType.findUnique({ where: { type: typeToChange } });
      await prisma.genericType.update({
        where: { type: typeToChange },
        data: {
              type: type?type:originalType?.type,
              description: description?description:originalType?.description,
              },
      }).catch((error) => res.status(500).send(error));
      res.status(200).send('Tipo genérico editado con exito');
    });


router.post("/", async (req: Request, res: Response) => {
    const {type, description} = req.body.params
    await prisma.genericType.create({
        data: {
          type: type,
          description
        },
      }).catch((error) => res.status(500).send(error));
    res.send("Tipo genérico agregado con éxito")
})

router.get("/", async (req: Request, res: Response) => {
    let inf_beer = await prisma.genericType.findMany()
    let types= inf_beer.map(beer=> beer.type)
    res.send(types)
})

router.get("/detail", async (req: Request, res: Response) => {
    const type: string | undefined= req.query.type?.toString()
    let detail = await prisma.genericType.findUnique({
        where: { type: type }
      })
    res.send(detail)
})

export default router;