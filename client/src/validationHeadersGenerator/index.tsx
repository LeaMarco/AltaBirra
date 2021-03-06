

/**

@abstract  Devuelve el objeto de validacion para el header, dependiendo los datos que se encuentren en el locarstorage
@author el Eze

@example GET EXAMPLE
axios.get(`http://localhost:3001/auth/autoLogin`, {
       headers: validationHeadersGenerator()
     }).then(e => {
       toogleAuth()
     }).catch(e => { console.log("ERROR EN AA", e) })


@example POST EXAMPLE
    const response = await axios.post<PostValues>(urlpost, { params: data }, { headers: validationHeadersGenerator() });
@example PATCH EXAMPLE
    axios.patch(`${process.env.REACT_APP_HOST_BACKEND}/desactivateAccount`, null, { headers: validationHeadersGenerator() })
/////////////////////////////////////////////////////////////////////////////////////
Luego de enviar a validar esto desde el FRONT, en el API solo se debe intermediar el tokenValidation en app.ts, y si se quiere usar un usuario usar la funcion findUserWithAnyTokenBabe en cada ruta de la forma que sigue

...ruta
  const user = await findUserWithAnyTokenBabe(req, prisma)
...
//////////////////////////////////////////////////////////////////////////////////////////////////////
Si queres ver como es la funcion, mantene apretado CONTROL y hace hover sobre ella
/////////////////////////////////////////////////////////////////////////////////////////////////////



@template
<bold> Si llegaste hasta aca deja de leer documentacion y ponete a codear, loquita </bold>





.
  */
export function validationHeadersGenerator() {

  if (Object.keys(localStorage).join().includes("token")) {
    const { tokenFacebook, tokenLocal, tokenGoogle } = localStorage

    const uniqueSearchLabel =
      tokenFacebook ? "username"
        :
        tokenLocal ? "id"
          :
          tokenGoogle ? "email"
            : null

    const tokenType =
      tokenFacebook ? "tokenFacebook"
        :
        tokenLocal ? "tokenLocal"
          :
          tokenGoogle ? "tokenGoogle"
            : null

    const token =
      tokenFacebook ? tokenFacebook
        :
        tokenLocal ? tokenLocal
          :
          tokenGoogle ? tokenGoogle
            : null

    const validationHeaders = {
      tokenType, //type de token
      uniqueSearchLabel, //label unica para buscar en el where
      token//el token propiamente dicho}
    }


    return validationHeaders
  }

  else return {}

}


