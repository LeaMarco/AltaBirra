import axios from "axios";
import { Console } from "console";
import { Request, Response, NextFunction, request } from "express";
import jwt from "jsonwebtoken";
//////////////////////////////////////VALIDACION/////////////////////////////////////////////////////////////////////
interface tokenData {
    id: number;
    adminRole: boolean;
    iat: number;
    exp: number;
}

export const tokenValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    ////////////DATOS GENERALES//////////////////////
    const tokenType = req.header("tokenType");
    const uniqueSearchLabel = req.header("uniqueSearchLabel");
    const token = req.header("token");
    /////////////////////////////////////////////////////////

    if (!token) return res.status(401).json("Acces denied (falta el token!)");
    else if (!process.env.SECRET_CODE) return res.sendStatus(500);
    else {
        let tokenData; //VARIABLE GENERAL PARA LOS 3

        //////////////TOKEN LOCAL//////////////

        if (tokenType === "tokenLocal") {
            tokenData = jwt.verify(token, process.env.SECRET_CODE) as tokenData;
            req.body = {
                ...req.body,
                tokenPackage: {
                    ...tokenData,
                    uniqueSearchLabel,
                },
            };
            console.log("Usuario verificado, ", "console.log hecho en verify token")
            next();
        }
        ///////////////////////////////////////

        //////////////TOKEN GOOGLE/////////////
        else if (tokenType === "tokenGoogle") {
            // console.log("Entro en google en verify token!");

            await axios("https://oauth2.googleapis.com/tokeninfo?id_token=" + token)
                .then((res) => {
                    req.body = {
                        ...req.body,
                        tokenPackage: {
                            email: res.data.email,
                            uniqueSearchLabel,
                        },
                    };
                    console.log("Usuario verificado, ", "console.log hecho en verify token")
                    next();
                })
                .catch((e) => res.sendStatus(400));
        }
        //////////////TOKEN FACEBOOK///////////
        else if (tokenType === "tokenFacebook") {
            // console.log("Entro en Facebook en verify token!");

            await axios("https://graph.facebook.com/me?access_token=" + token)
                .then((res) => {
                    const name = res.data.name;
                    const facebookId = res.data.id;

                    const username = name.replace(/ /g, "_") + "_" + facebookId;
                    //console.log(username, uniqueSearchLabel)


                    req.body = {
                        ...req.body,
                        tokenPackage: {
                            username,
                            uniqueSearchLabel,
                        },
                    };
                    console.log("Usuario verificado, ", "console.log hecho en verify token")
                    next();
                })
                .catch((e) => res.sendStatus(400));
        }
        ///////////////////////////////////////
    }
}

