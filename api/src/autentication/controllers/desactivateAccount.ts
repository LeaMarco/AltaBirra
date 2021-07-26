import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { findUserWithAnyTokenBabe } from "./auth.controller";

const router = Router();
const prisma = new PrismaClient();

router.patch("/", async (req: Request, res: Response) => {
    console.log('HOLAAAA');
    const user = await findUserWithAnyTokenBabe(req, prisma)

    if (!user) return res.status(500).send("Error inesperado: fallo la busqueda del usuario en base de datos.")

    await prisma.user.update({
        where: {
            id: user.id
        }, data: { activeCount: false, verify: false }
    }).catch(() => res.status(500).send("Error inesperado: se encontro al usuario en base de datos pero no se pudo actualizar su condicion de unregister")
    )

    return res.send(user)
    // return res.sendStatus(400)

})

export default router;