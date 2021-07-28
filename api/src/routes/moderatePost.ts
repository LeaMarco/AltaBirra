import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.delete("/", async (req: Request, res: Response) => {
  const { postId } = req.body;
  await prisma.post
    .delete({
      where: { id: postId },
    })
    .catch((error) => res.status(500).send(error));
  res.status(200).send("Post eliminado con exito");
});

router.patch("/", async (req: Request, res: Response) => {
  const { postId, visibility } = req.body.data;
  await prisma.post
    .update({
      where: { id: postId },
      data: {
        visibility: visibility === "true" ? true : false,
      },
    })
    .catch((error) => res.status(500).send(error));
  res.status(200).send("Post editado con exito");
});



router.get("/", async (req: Request, res: Response) => {
  const type: string | undefined = req.query.type?.toString();
  let posts = await prisma.post.findMany({
    include: { user: true },
  });
  res.send(posts);
});

export default router;
