import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.patch("/", async (req: Request, res: Response) => {
    console.log(req.body.data, "soy la dataaaa")
  const {postId, visibility} = req.body.data
      await prisma.post.update({
        where: {id:postId},
        data: {
            visibility: visibility==="true"?true:false
          },
      }).catch((error) => res.status(500).send(error));
      res.status(200).send('Tipo genérico editado con exito');
    });


router.get("/", async (req: Request, res: Response) => {
    const type: string | undefined= req.query.type?.toString()
    let posts = await prisma.post.findMany({
      include: {user:true}})
    res.send(posts)
})

export default router;