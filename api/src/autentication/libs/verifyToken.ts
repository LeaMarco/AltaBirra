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
    console.log("token tokenValidation", token, req)
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWRtaW5Sb2xlIjpmYWxzZSwiaWF0IjoxNjI2OTA0MzYzLCJleHAiOjE2MjY5OTA3NjN9.1fqbwBGxx3HQb07ZY2n5kV_MhJxXg37AjpJl5CE-8oo
    if (!token) return res.status(401).json('Acces denied(falta el token!)');

    let infoToken;
    if (process.env.SECRET_CODE) {

        infoToken = jwt.verify(token, process.env.SECRET_CODE) as infoToken
        req.body = { ...req.body, infoToken }
        next();

    }
    else res.sendStatus(500) //NO HAY ENV!
    // req.userName = "añskjdnalskdnlaskdjnaslk"///////////////////////////////PREGUNTAR MARTINA MARTINIARLA

}
//////////////////////////////////////////FIN DE VALIDACION/////////////////////////////////////////////////////
