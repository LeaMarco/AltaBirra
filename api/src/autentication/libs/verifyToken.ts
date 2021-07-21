import { Request, Response, NextFunction, request } from 'express'
import jwt from "jsonwebtoken"
//////////////////////////////////////VALIDACION/////////////////////////////////////////////////////////////////////
interface infoToken {
    id: number;
    adminRole: boolean;
    iat: number;
    exp: number;
}


export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('authToken');

    if (!token) return res.status(401).json('Acces denied(falta el token!)');
    let infoToken;
    if (process.env.SECRET_CODE) {
        infoToken = jwt.verify(token, process.env.SECRET_CODE) as infoToken
    }
    else res.sendStatus(501) //NO HAY ENV!
    // req.userName = "añskjdnalskdnlaskdjnaslk"///////////////////////////////PREGUNTAR MARTINA MARTINIARLA
    req.body = { ...req.body, infoToken }
    next();

}
//////////////////////////////////////////FIN DE VALIDACION/////////////////////////////////////////////////////
