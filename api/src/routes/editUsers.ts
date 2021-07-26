import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.put("/", async (req: Request, res: Response) => {
  const {typeToChange, type, description, group, genericType} = req.body.params 
	const originalType = await prisma.specificType.findUnique({ where: { type: typeToChange } });
      await prisma.specificType.update({
        where: { type: typeToChange },
        data: {
            type: type?type:originalType?.type,
            description: description?description:originalType?.description,
            group: group?group:originalType?.group,
            genericType: {
              connect: { type: genericType?genericType:originalType?.type },
            },
          },
      }).catch((error) => res.status(500).send(error));
      res.status(200).send('Tipo genérico editado con exito');
    });


router.post("/", async (req: Request, res: Response) => {
    const {type, description, group, genericType} = req.body.params
    await prisma.specificType.create({
        data: {
          type: type,
          description,
          group,
          genericType: {
            connect: { type: genericType },
          },
        },
      }).catch((error) => res.status(500).send(error));
    res.send("Tipo específico agregado con éxito")
})


router.get("/", async (req: Request, res: Response) => {
    const type: string | undefined= req.query.type?.toString()
    let bigUsers = await prisma.user.findMany({
      })
      let users= bigUsers.map(user=> user.username)
    res.send(users)
})

router.get("/detail", async (req: Request, res: Response) => {
  const username: string | undefined= req.query.username?.toString()

  let detail = await prisma.user.findUnique({
    where: { username: username },
    include:{ role:true}
  })
  res.send(detail)
})

export default router;