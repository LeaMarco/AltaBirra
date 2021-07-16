import { Request, Response, NextFunction, request } from 'express';
import jwt from 'jsonwebtoken';

interface payload {
    usernam: string,
    iat: number,
    exp: number
}


/* export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authToken');

    if (!token) return res.status(401).json('Acces denied');

    // El metodo verify toma el token y devuelve los datos que estaban dentro de ese token
    const payload = jwt.verify(token, 'secretKey') as payload

    req.username = payload.usernam;

    next();
} */