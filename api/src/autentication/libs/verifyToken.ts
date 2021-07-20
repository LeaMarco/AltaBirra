import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken"
//////////////////////////////////////VALIDACION/////////////////////////////////////////////////////////////////////
interface payload {
    id: number;
    adminRole: boolean;
    iat: number;
    exp: number;
}


export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('authToken');

    if (!token) return res.status(401).json('Acces denied(falta el token!)');

    // El metodo verify toma el token y devuelve los datos que estaban dentro de ese token
    let payload;
    if (process.env.SECRET_CODE) {
        payload = jwt.verify(token, process.env.SECRET_CODE) as payload
    }
    else res.sendStatus(501) //NO HAY ENV!

    req.body = { ...req.body, payload }
    req.userName = "asd"

    next();

}
//////////////////////////////////////////FIN DE VALIDACION/////////////////////////////////////////////////////
