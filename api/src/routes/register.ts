import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("asdasdasd")
  const { username, email, name, password, googleId, facebookId } = req.body;
  const userRol = await prisma.role.findUnique({ where: { name: "USER" } })
  await prisma.user.create({
    data: {
      username,
      email,
      name,
      password,
      role: {
        connect: { id: userRol?.id }
      },
      cart: {
        create: {}
      },
      favorite: {
        create: {}
      }
    }
  }).catch((e) => res.send("Error (usuario ya creado?)"))
  res.send("creado");
});





export default router;