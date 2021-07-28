import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { encryptPassword, findUserWithAnyTokenBabe, validatePassword } from "./auth.controller";

const router = Router();
const prisma = new PrismaClient();

router.patch("/", async (req: Request, res: Response) => {
    const user = await findUserWithAnyTokenBabe(req, prisma).catch(() => {
        res.status(500).send("Error inesperado: el usuario paso su token, pero se produjo un error que rompio la busqueda del mismo en base de datos ")
    })

    console.log(user)

    if (!user) return res.status(500).send("Error inesperado: al buscar el usuario encontramos un null, a pesar de que paso su token.")

    const { oldPassword, newPassword } = req.body.payload

    if (validatePassword(oldPassword, user)) {
        await prisma.user.update({
            where: {
                id: user.id
            }, data: { password: encryptPassword(newPassword) }

        }
        )
            .then(response => res.sendStatus(200))

            .catch(() => res.status(500).send("Error inesperado: se encontro al usuario en base de datos pero no se pudo actualizar su contraseña")
            )
    }
    else return res.status(403).send("Contraseña de usuario local inválida")

})

export default router;