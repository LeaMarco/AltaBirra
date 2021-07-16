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


function encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

function validatePassword(password: string, user: User): boolean {
    return bcrypt.compareSync(password, user.password);
}




export const signup = async (req: Request, res: Response) => {

    const { username, email, name, password, googleId, facebookId } = req.body.params;
    console.log("asddsa", username, email, name, password, facebookId, facebookId, "asddsa")

    // Busco al usuario
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    //Si existe le digo que se loguee
    if (user) return res.send("Usuario ya registrado! Logueate!")

    { //busco el rol (no hace falta podria pasarle el numero y listo)
        const userRol = await prisma.role.findUnique({ where: { name: "USER" } })

        //Creo el usuario (porque paso el else sin entrar en el return)
        const userCreado = await prisma.user.create({
            data: {
                username,
                email,
                name,
                password: encryptPassword(password || googleId || facebookId),
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
        }).catch((e) => res.send("Error al registrar usuario"))

        return res.json(userCreado)
    }


};


export const signin = async (req: Request, res: Response) => {

    console.log("Entre!")

    const user = await prisma.user.findUnique({
        where: {
            username: req.body.params.nameMail
        }
    })

    // console.log(user, "user")

    if (!user) return res.status(200).json('Credencial invalida');
    console.log(req.body.params.password)

    const correctPassword: boolean = validatePassword(req.body.params.googleId || req.body.params.password, user || "");

    if (!correctPassword) return res.status(400).send('Credencial invalida');

    const token: string = jwt.sign({ username: user.username }, "secretKey", { expiresIn: 60 * 60 * 24 })
    res.header('authToken', token).send("Usuario validado, y toquen enviado")


};



interface payload {
    username: string,
    iat: number,
    exp: number
}

export const profile = async (req: Request, res: Response) => {

    const token = req.header('authToken');

    if (!token) return res.status(401).json('Acces denied');
    // El metodo verify toma el token y devuelve los datos que estaban dentro de ese token
    const payload = jwt.verify(token, 'secretKey') as payload
    //Validacion de entrada a la ruta
    const username = payload.username;

    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) return res.status(404).send("Acceso denegado")
    else {
        res.send("Bienvenido a tu perfil!!!!");
    }
};



export const wipe = async (req: Request, res: Response) => {
    //Validacion de entrada a la ruta
    await prisma.user.deleteMany({})
    res.send("Database wipeada");
};

