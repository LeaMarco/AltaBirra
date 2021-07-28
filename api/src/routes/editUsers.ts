import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.put("/", async (req: Request, res: Response) => {
  const {activeCount, role, username} = req.body.data
      await prisma.user.update({
        where: {username},
        data: {
            activeCount: activeCount==="true"?true:false,
            role: {connect:{name:role}}
          },
      }).catch((error) => res.status(500).send(error));
      res.status(200).send('Tipo genérico editado con exito');
    });


router.get("/", async (req: Request, res: Response) => {
    const type: string | undefined= req.query.type?.toString()
    let users = await prisma.user.findMany({
      include: {role:true}})
    res.send(users)
})

export default router;