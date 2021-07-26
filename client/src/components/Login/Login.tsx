import React, { useEffect, useState } from "react";
// import {User, fetchUsers} from './actions';
// import {StoreState} from './reducers';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Style from "./Login.module.css";
import { useImperativeHandle } from "react";
import axios from "axios";
import { iError, iData } from "./LoginInterfaces";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

function validate(dataState: iData, errors: iError, e): iError {
  let name = e.target.name;

  //AL PRINCIPIO SIN ERRORES A MENOS QUE ALGUIEN DIGA LO CONTRARIO
  errors[name].error = false;
  errors[name].edit = true;

  //REQUIRE
  if (dataState[name] === "") {
    errors[name].require = true;
    errors[name].error = true;
  } else {
    errors[name].require = false;
  }
  return errors;
}

const Login: React.FunctionComponent<{ toogleAuth, closeModal }> = ({ toogleAuth, closeModal }) => {


  //Agregar un estado nuevox

  //////////////////
  /* funcion setStateGlobal */
  /////////////////


  /////////////////////////////////ESTADOS/////////////////////////////////////////////
  const [data, setData] = useState<iData>({
    nameMail: "",
    password: "",
  });

  const [errors, setErrors] = useState<iError>({
    nameMail: {
      edit: false,
      error: false,
      require: false,
      onlyLettersUsAndNumbersOrEmail: "",
    },
    password: {
      edit: false,
      error: false,
      require: false,
      segurityLevel: "",
    },
  });

  /////////////////////////////////ESTADOS/////////////////////////////////////////////


  //////////////////////////////HANDLES///////////////////////////////////////////////////
  const handleOnSubmit = (e) => {
    e.preventDefault();
    let postObj = {
      nameMail: data.nameMail,
      password: data.password,
    };

    axios
      .post(`${process.env.REACT_APP_HOST_BACKEND}/auth/signin/`, { params: postObj })
      .then((e: any) => {
        console.log('Logueado!!!', e.data)
        localStorage.clear()
        localStorage.setItem('tokenLocal', e.data.token)
        toogleAuth()
        closeModal()
      }).catch((error) => console.log('No te pudiste loguear local!'))
  };

  const handleOnChange = (e) => {
    let newState: iData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    setErrors(validate(newState, errors, e));
    // setErrors(newState);
    setData(newState);

  };
  //////////////////////////////FIN HANLDLER///////////////////////////////////////////////////



  //////////////////////////////FACEBOOK///////////////////////////////////////////////////////

  const componentClicked = () => {
    console.log("me pulsaste")
  }

  const responseFacebookLogin = (response: any) => {

    console.log("Respuesta Facebook", response)
    const tokenId = response.accessToken
    const name = response.name;
    const facebookId = response.id;
    const nameMail = name.replaceAll(" ", "_") + "_" + facebookId;

    axios.post(`${process.env.REACT_APP_HOST_BACKEND}/auth/signin`, {
      params: {
        nameMail,
      }
    })
      .then((e) => {
        console.log('Logueado!!!', e.data)
        localStorage.clear()
        localStorage.setItem('tokenFacebook', tokenId)
        toogleAuth()
        closeModal()

      })
      .catch((error) => console.log('No te pudiste loguear con theFacebook!'))
  }
  //////////////////////////////fin facebook///////////////////////////////////////////////////////


  //////////////////////////////LOGICA DE GOOGLE///////////////////////////////////////////////////
  const responseGoogleLogin = (response: any) => {
    console.log(response)
    const tokenId = response.tokenId
    const googleId = response.googleId;
    const nameMail = response.Ts.RT + "_" + response.Ts.TR + "_" + googleId;

    console.log('Respuesta en bruto de google', response);
    axios
      .post(`${process.env.REACT_APP_HOST_BACKEND}/auth/signin`, {
        params: {
          nameMail,
        }
      })
      .then((e) => {
        console.log('Logueado!!!', e.data)
        localStorage.clear()
        localStorage.setItem("tokenGoogle", tokenId)
        toogleAuth()
        closeModal()
      })
      .catch((error) => console.log('No te pudiste loguear con Google!'))
  }
  const onFailureLogin = (response: any) => {
    console.log(response, "Fallo el login!");
  };
  //////////////////////////////fin de logica de google///////////////////////////////////////////////////

  let btnFacebookSize = 1
  return (
    <div id={Style.login}>
      <div style={{ fontWeight: 600, fontSize: "1.5em" }}>ENTRAR🍺</div>
      <form id={Style.form} onSubmit={handleOnSubmit}>
        <input
          onChange={handleOnChange}
          className={`${Style.RegisterInputs} ${errors.password.error ? Style.require : Style.ok
            }`}
          name="nameMail"
          placeholder=" Correo electronico o nombre de usuario"
        />
        <label className={Style.labels}>
          {(() => {
            if (errors.nameMail.edit) {
              return errors.nameMail.require
                ? "Campo requerido!"
                : errors.nameMail.onlyLettersUsAndNumbersOrEmail
                  ? "☢Caracter inválido!"
                  : "Se ve bien 👌";
            } else return " ";
          })()}
        </label>

        <input
          type="password"
          className={`${Style.RegisterInputs} ${errors.password.error ? Style.require : Style.ok
            }`}
          onChange={handleOnChange}
          name="password"
          value={data.password}
          placeholder=" Password"
        />


        <label className={Style.labels}>
          {(() => {
            if (errors.password.edit) {
              return errors.password.require
                ? "Campo requerido!"
                : data.password.length < 5
                  ? " Contraseña muy corta (minimo 5 caracteres)"
                  : "Probemos 🔐";
            } else return " ";
          })()}
        </label>

        <button id={Style.btnRegister}>Continuar</button>
      </form>


      <FacebookLogin
        appId="866652260898974"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebookLogin}
        textButton="Continuar con Google"
        render={renderProps => (
          <button className={Style.imgSm} style={{ background: "url(https://i.imgur.com/ULmHyN2.png)", backgroundSize: "cover", width: `${229 * btnFacebookSize}px`, height: `${55 * btnFacebookSize}px`, border: "none", borderRadius: "3px", marginBottom: "0.4em" }} onClick={renderProps.onClick} />
        )}
      />


      <GoogleLogin
        clientId="1088546554463-3m5mg63vf7k5lq42p2nl1o77mdvd1ho5.apps.googleusercontent.com"
        buttonText="Continuar con Google"
        theme="dark"
        onSuccess={responseGoogleLogin}
        onFailure={onFailureLogin}
        cookiePolicy={"single_host_origin"}
        className="googleLogin"
        style={{ width: "1000px" }}
        render={renderProps => (
          <button className={Style.imgSm} style={{ background: "url(https://i.imgur.com/YTsDRda.png)", backgroundSize: "cover", width: `${229 * btnFacebookSize}px`, height: `${55 * btnFacebookSize}px`, border: "none", borderRadius: "3px", marginBottom: "0.4em" }} onClick={renderProps.onClick} />
        )}
      />


    </div>
  );
};

export default Login;
