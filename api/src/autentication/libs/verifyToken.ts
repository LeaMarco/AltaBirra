import axios from "axios";
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

            next();
        }
        ///////////////////////////////////////

        //////////////TOKEN GOOGLE/////////////
        else if (tokenType === "tokenGoogle") {
            console.log("Entro en google en verify token!");

            await axios("https://oauth2.googleapis.com/tokeninfo?id_token=" + token)
                .then((res) => {
                    req.body = {
                        ...req.body,
                        tokenPackage: {
                            email: res.data.email,
                            uniqueSearchLabel,
                        },
                    };
                    next();
                })
                .catch((e) => res.sendStatus(400));
        }
        //////////////TOKEN FACEBOOK///////////
        else if (tokenType === "tokenFacebook") {
            console.log("Entro en Facebook en verify token!");

            await axios("https://graph.facebook.com/me?access_token=" + token)
                .then((res) => {
                    const name = res.data.name;
                    const facebookId = res.data.id;

                    const username = name.replace(/ /g, "_") + "_" + facebookId;
                    console.log(username, uniqueSearchLabel)


                    req.body = {
                        ...req.body,
                        tokenPackage: {
                            username,
                            uniqueSearchLabel,
                        },
                    };
                    next();
                })
                .catch((e) => { console.log(e); res.sendStatus(400) });
        }
        ///////////////////////////////////////
    }
};

///////////////////////////////////////

//  console.log(req.body.tokenPackage,"here")
//  if(uniqueSearchLabel) console.log(req.body.tokenPackage[uniqueSearchLabel])

/*    else if (tokenGoogle) {
          axios("https://oauth2.googleapis.com/tokeninfo?id_token=" + tokenGoogle)
            .then((res) => {
              axios.get("http://localhost:3001/auth/socialSignIn", { params: { email: res.data.email } })
                .then((e) => {
                  console.log(e, "auto autentificado de GOOGLE exitoso")
                  toogleAuth()
                })
                .catch(e => console.log(e))
            })
        }
      .then((res) => {
              console.log("Respuesta facebook token validado", res,)
              const name = res.data.name;
              const facebookId = res.data.id;
              const userName = name.replaceAll(" ", "_") + "_" + facebookId;
              // console.log(nameMail)
              axios.get("http://localhost:3001/auth/socialSignIn", { params: { userName } })
                .then((e) => {
                  console.log(e, "auto autentificado de FACEBOOK exitoso")
                  toogleAuth()
                })
                .catch(e => console.log(e))


    /*  const token = req.header('tokenPackage');
     // console.log(token)

     // console.log("token tokenValidation", token, req)
     //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWRtaW5Sb2xlIjpmYWxzZSwiaWF0IjoxNjI2OTA0MzYzLCJleHAiOjE2MjY5OTA3NjN9.1fqbwBGxx3HQb07ZY2n5kV_MhJxXg37AjpJl5CE-8oo
     if (!token) return res.status(401).json('Acces denied(falta el token!)');

     let infoToken;
     if (process.env.SECRET_CODE) {

         infoToken = jwt.verify(token, process.env.SECRET_CODE) as infoToken
         req.body = { ...req.body, infoToken }
         next();


     }
     else res.sendStatus(500) //NO HAY ENV! */
// req.userName = "añskjdnalskdnlaskdjnaslk"///////////////////////////////PREGUNTAR MARTINA MARTINIARLA

//////////////////////////////////////////FIN DE VALIDACION/////////////////////////////////////////////////////
