import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
// import paginated from "../functions/funciones";
const router = Router();
const prisma = new PrismaClient();

// the /beers returns ALL the data instead when you do /beers?page=1 it returns it paged according to the number placed on page

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const {UserName, Email, Name, Password} = req.body
    const userRol = await prisma.rol.findUnique({where: {Rol:"USER"}})
    await prisma.user.create({
        data: {
            UserName,
            Email,
            Name,
            Password,
            rol: {
              connect:{id:userRol?.id }
            }
          }
    })
    res.send("creado")
});

export default router;




