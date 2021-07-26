import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";






const router = Router();
const prisma = new PrismaClient();


interface User {
    username: string,
    email: string,
    password: string,
    name: string,
}




export function encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};


function validatePassword(password: string, user: User): boolean {
    return bcrypt.compareSync(password, user.password);
}





export const signup = async (req: Request, res: Response) => {
    const { username, email, name, password } = req.body.params;
    let guestsItemsInCart = JSON.parse(req.body.params.guestsItemsInCart)
    // let guestsItemsInCart = req.body.params.guestsItemsInCart
    console.log("guestsItemsInCart", guestsItemsInCart, "guestsItemsInCart")
    // Busco al usuario
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    //Conversor obj a array, formateado para crear filas de postsOnCart
    let postsOnCartArray = []
    for (let i in guestsItemsInCart) {
        postsOnCartArray.push({ postId: parseInt(i), amount: guestsItemsInCart[i] })
    }//////////////////////////////////////////////////////////////////

    console.log(postsOnCartArray)


    if (!user) {
        //Si el usuario NO existe
        const userRol = await prisma.role.findUnique({ where: { name: "USER" } })

        //Creo el usuario
        const userCreado = await prisma.user.create({
            data: {
                username,
                email,
                name,
                password: password ? encryptPassword(password) : "socialPassword",
                role: {
                    connect: { id: userRol?.id }
                },
                cart: {
                    create: {
                        posts: {
                            createMany: {
                                data: postsOnCartArray
                            }
                        }
                    }
                },
                favorite: {
                    create: {}
                }
            }
        }).catch((e) => res.send("Error al registrar al usuario"))

        return res.json(userCreado)
    }

    else if (user.activeCount) return res.sendStatus(409)//Si existe y tiene la cuenta activada, rebota y lo manda a loguearse

    else if (user.activeCount === false) {//1) Si existe en base de datos, pero tiene la cuenta desactivada

        await prisma.user.update({
            where: {
                id: user.id
            }, data: { activeCount: true }//2) Se la activa!
        }).catch(() => res.status(500).send("Error inesperado: se encontro al usuario en base de datos pero no se pudo reactivar su cuenta"))

        return res.sendStatus(200)
    }

    res.status(500).send("Error inesperado: llame a batman")

};




export const signin = async (req: Request, res: Response) => {

    // const infoToken = req.body.infoToken

    const user = await prisma.user.findUnique({
        where: {
            username: req.body.params.nameMail
        }
    })

    if (!user || user.activeCount === false) return res.sendStatus(400);

    else if (process.env.SECRET_CODE) {

        const userData = {
            id: user.id,
            nombre: user.name,
            premium: user.premium,
            favoritos: user.favoriteId
        }


        if (req.body.params.password) {//Si es registrado local
            const correctPassword: boolean = validatePassword(req.body.params.password, user);
            if (correctPassword === false) return res.status(400).send('Credencial invalida');

            const token: string = jwt.sign({ id: user.id, adminRole: false }, process.env.SECRET_CODE, { expiresIn: 60 * 60 * 24 })
            res.json({ token, userData })
        }
        else {//Si es registrado social
            res.json(userData)
        }

    }

    else {
        res.status(500).send("CONTRASEÑA PARA GENERAR TOKENS AUSENTE EN VARIABLES DE ENTORNO DEL SERVER!")
    }
}



//DEPRECADO HASTA NUEVO AVISO
export const localSignIn = async (req: Request, res: Response) => {


    const { id } = req.body.infoToken


    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!user) return res.sendStatus(400);

    else {

        const userData = {
            id: user.id,
            nombre: user.name,
            premium: user.premium,
            favoritos: user.favoriteId
        }

        res.json(userData)

    }

};




interface payload {
    username: string,
    iat: number,
    exp: number
}




export const profile = async (req: Request, res: Response) => {

    res.sendStatus(207)


    /*  const token = req.header('authToken');
 
     if (!token) return res.status(401).json('Acces denied');
     // El metodo verify toma el token y devuelve los datos que estaban dentro de ese token
     const payload = jwt.verify(token, 'secretKey') as payload
     //Validacion de entrada a la ruta
     const username = payload.username;
 
     const user = await prisma.user.findUnique({ where: { username } })
 
     if (!user) return res.status(404).send("Acceso denegado")
     else {
         res.send("Bienvenido a tu perfil!!!!");
     } */
};


//DEPRECADO HASTA NUEVO AVISO
export const socialSignIn = async (req: Request, res: Response) => {

    const email = req.query.email?.toString()//esto lo envia google! solo mail!
    const username = req.query.userName?.toString()//esto lo envia facebook, solo username! (porque es lo que devuelven los token)

    const user = await prisma.user.findUnique({
        where: {
            email,
            username
        }
    })

    if (!user) return res.sendStatus(400);

    else {
        const userData = {
            id: user.id,
            nombre: user.name,
            premium: user.premium,
            favoritos: user.favoriteId
        }
        res.json(userData)
    }
}

/**
 * 
@example •Como usarla
 const user = await findUserWithAnyTokenBabe(req, prisma)

•Funcion trasbambalains
async function findUserWithAnyTokenBabe(req: Request, prisma: PrismaClient) {

    const tokenPackage = req.body.tokenPackage //todo lo que tenga el  token
    const uniqueSearchLabel = tokenPackage.uniqueSearchLabel //Puede ser username, email o id, dependiendo si viene de facebook, google o local respectivamente.
    const uniqueSearchValue = tokenPackage[uniqueSearchLabel] //el valor que esta en el dato unique

    const user = await prisma.user.findUnique({
        where: {
            [uniqueSearchLabel]: uniqueSearchValue //siempre envia un solo dato unique, y poniendolo asi lo busca de forma correcta sea lo que sea
        }
    })
    return user
}
@author Ezequiel Aguilera. Racoon City, 1998. Comienzos del último Octubre.
*/
export async function findUserWithAnyTokenBabe(req: Request, prisma: PrismaClient) {

    const tokenPackage = req.body.tokenPackage //todo lo que tenga el  token
    const uniqueSearchLabel = tokenPackage.uniqueSearchLabel //Puede ser username, email o id, dependiendo si viene de facebook, google o local respectivamente.
    const uniqueSearchValue = tokenPackage[uniqueSearchLabel] //el valor que esta en el dato unique

    const user = await prisma.user.findUnique({
        where: {
            [uniqueSearchLabel]: uniqueSearchValue //siempre envia un solo dato unique, y poniendolo asi lo busca de forma correcta sea lo que sea
        }
    })
    return user
}
////////////////////////////////////////////////////////////////////////////////////////////////


export const autoLogin = async function (req: Request, res: Response) {

    const user = await findUserWithAnyTokenBabe(req, prisma)

    /* const tokenPackage = req.body.tokenPackage //todo lo que tenga el  token
    const uniqueSearchLabel = tokenPackage.uniqueSearchLabel //Puede ser username, email o id, dependiendo si viene de facebook, google o local respectivamente.
    const uniqueSearchValue = tokenPackage[uniqueSearchLabel] //el valor que esta en el dato unique

    const user = await prisma.user.findUnique({
        where: {
            [uniqueSearchLabel]: uniqueSearchValue //siempre envia un solo dato unique, y poniendolo asi lo busca de forma correcta sea lo que sea
        }
    }) */


    //console.log(user)
    if (!user) return res.sendStatus(400)
    else return res.sendStatus(200)
}



export const wipe = async (req: Request, res: Response) => {
    await prisma.transaction.deleteMany({})
    await prisma.post.deleteMany({})
    await prisma.user.deleteMany({})

    // await prisma.user.deleteMany({})
    res.send(process.env.SECRET_CODE);
};

