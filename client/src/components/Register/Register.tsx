import { useEffect } from "react";
import Style from "./Register.module.css";
// import {User, fetchUsers} from './actions';
// import {StoreState} from './reducers';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { iData, iError, segurityLevels } from "./RegisterInterfaces";
import axios from "axios";
// import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { validate } from "./validate";
import { SocialIcon } from 'react-social-icons'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

///leand, facu  
const onlyLettersMge = "Solo debe tener letras mayusculas o minusculas";
const onlyLettersUsAndNumbersMge =
  "Solo debe tener letras mayusculas, minusculas, numeros o guiones bajos";
const patternEmailMge = "Error en el formato del mail ingresado";



////MODEL///////////////////////////////////
/* function closeModel() {
  let btnF = document.getElementById("btnFantasma")
  btnF?.click()
} */

////////////////////////////////////////


////////////////////////////////////////
const Register: React.FunctionComponent<{ closeModal, toogleEnter, toogleRegister, }> = ({ closeModal, toogleEnter,
  toogleRegister, }) => {
  ////////////////////USE STATES///////////////////////////////////////
  const [alreadyRegister, setAlreadyRegister] = useState<boolean>(false)

  const renderLogin = () => {
    toogleRegister()
    toogleEnter()
  }

  const [data, setData] = useState<iData>({
    names: "",
    lastNames: "",
    email: "",
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState<iError>({
    names: {
      edit: false,
      error: false,
      require: false,
      onlyLetters: onlyLettersMge,
    },
    userName: {
      edit: false,
      error: false,
      require: false,
      onlyLettersUsAndNumbers: onlyLettersUsAndNumbersMge,
    },
    lastNames: {
      edit: false,
      error: false,
      require: false,
      onlyLetters: patternEmailMge,
    },
    email: {
      edit: false,
      error: false,
      require: false,
      patternEmail: patternEmailMge,
    },
    password: {
      edit: false,
      error: false,
      require: false,
      segurityLevel: segurityLevels.none,
    },
  });
  const handleOnChange = (e) => {
    let newState: iData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    setErrors(validate(newState, errors, e));
    // setErrors(newState);
    setData(newState);
  };
  ////////////////////FIN DE USE STATES///////////////////////////////////////


  let sizeSocialButtons = 1.1





  ///////////////LOGICA DE GOOGLE//////////////////////////
  const responseGoogleRegister = (response: any) => {

    const name = response.dt.uU;
    const googleId = response.googleId;
    const username = name + "_" + googleId;
    const email = response.profileObj.email;


    //
    axios
      .post("https://altabirra.herokuapp.com/auth/signup", {
        params: {
          username,
          email,
          googleId,
          name,
        },
      })
      .then((e: any) => {
        console.log("Bienvenido !")
        closeModal()
      }).catch((e) => {
        console.log("Ya tenés usuario, logueate!")
        setAlreadyRegister(true)
      })

  };

  const onFailureRegister = (response: any) => {
    console.log(response, "Fallo el registro!");
  };
  ////////////FIN DE LOGICA DE GOOGLE///////////////////



  /////////////LOGICA DE FACEBOOK//////////////////////

  const responseFacebook = (response: any) => {
    console.log(response);

    const name = response.name;
    const facebookId = response.id;
    const username = name.replaceAll(" ", "_") + "_" + facebookId;
    const email = response.email;


    axios.post("https://altabirra.herokuapp.com/auth/signup", {
      params: {
        username,
        email,
        name,
      },
    })
      .then((e: any) => {
        console.log("Bienvenido !")
        closeModal()
      }).catch((e) => {
        console.log(e, "Error!")
        setAlreadyRegister(true)
      })


  };

  const componentClicked = (response: any) => {
    console.log(response);
  };
  ///////////////FIN DE LOGICA DE FACEBOOK/////////////////



  ////////////////////LOGICA DE REGISTRO LOCAL ///////////////////////////////////////

  const handleOnSubmit = async (e) => {


    e.preventDefault();
    let postObj = {
      username: data.userName,
      password: data.password,
      email: data.email,
      name: `${data.names} ${data.lastNames}`,
    };


    console.log(e)
    console.log(postObj)

    axios
      .post("https://altabirra.herokuapp.com/auth/signup/", { params: postObj })
      .then(async (e: any) => {
        console.log("Bienvenido !")
        closeModal()
      }).catch((e) => {
        console.log("Ya tenés usuario, logueate!")
        setAlreadyRegister(true)
      })

  };
  ////////////////////FIN DE LOGICA DE REGISTRO LOCAL///////////////////////////////////////


  return (
    <div id={Style.register}>

      {/* <button onClick={renderLogin}>Render login</button> */}
      <div style={{ fontWeight: 600, fontSize: "1.5em" }}>REGISTRARME🍻</div>
      <form id={Style.form} onSubmit={handleOnSubmit}>
        <input
          className={` ${Style.RegisterInputs} ${errors.names.error ? Style.require : Style.ok
            }`}
          onChange={handleOnChange}
          name="names"
          value={data.names}
          placeholder=" Nombres"
        />
        <label className={Style.labels}>
          {(() => {
            if (errors.names.edit) {
              return errors.names.require
                ? "☢Campo requerido!"
                : errors.names.onlyLetters
                  ? "☢Caracter inválido!"
                  : "Se ve bien 👌"
            } else return " ";
          })()}
        </label>

        <input
          className={`${Style.RegisterInputs} ${errors.lastNames.error ? Style.require : Style.ok
            }`}
          onChange={handleOnChange}
          name="lastNames"
          value={data.lastNames}
          placeholder=" Apellidos"
        />

        <label className={Style.labels}>
          {(() => {
            if (errors.lastNames.edit) {
              return errors.lastNames.require
                ? "☢Campo requerido!"
                : errors.lastNames.onlyLetters
                  ? " ☢Caracter inválido!"
                  : "Genial✨";
            } else return " ";
          })()}
        </label>

        <input
          className={`${Style.RegisterInputs} ${errors.userName.error ? Style.require : Style.ok
            }`}
          onChange={handleOnChange}
          name="userName"
          value={data.userName}
          placeholder=" Username"
        />

        <label className={Style.labels}>
          {(() => {
            if (errors.userName.edit) {
              return errors.userName.require
                ? "☢Campo requerido!"
                : errors.userName.onlyLettersUsAndNumbers
                  ? "☢Caracter inválido, solo letras, numeros y guiones abajo"
                  : "Ok perfecto 😎";
            } else return " ";
          })()}
        </label>

        <input
          className={`${Style.RegisterInputs} ${errors.email.error ? Style.require : Style.ok
            }`}
          onChange={handleOnChange}
          name="email"
          value={data.email}
          placeholder=" Correo electronico"
        />

        <label className={Style.labels}>
          {(() => {
            if (errors.email.edit) {
              return errors.email.require
                ? "☢Campo requerido!"
                : errors.email.patternEmail
                  ? "☢Formato de email invalido"
                  : "Excelente ya casi entras al olimpo cervecero 🍻";
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
                ? "☢Campo requerido!"
                : data.password.length < 5
                  ? " Contraseña muy corta (minimo 5 caracteres)"
                  : "Buenisimo!  🔐";
            } else return " ";
          })()}
        </label>
        {
          alreadyRegister ?
            <button id={Style.btnRegister} onClick={renderLogin} style={{ backgroundColor: "rgb(248, 245, 245)" }}>Ya estás registrado! <span style={{ fontWeight: "bold" }}> Ir a Loguin</span>{'>>'} </button>
            :
            <button id={Style.btnRegister}> Listo! </button>

        }


      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
      </div>


      <FacebookLogin
        appId="866652260898974"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        textButton="Continuar con Google"
        render={renderProps => (

          <button className={Style.imgSm} style={{ background: "url(https://i.imgur.com/ULmHyN2.png)", backgroundSize: "cover", width: `${229 * sizeSocialButtons}px`, height: `${55 * sizeSocialButtons}px`, border: "none", borderRadius: "3px", marginBottom: "0.4em" }} onClick={renderProps.onClick} />

        )}
      />


      <GoogleLogin
        clientId="245898915217-vn77s7m8uipu4lf0n3nkdcqtdu2ej2to.apps.googleusercontent.com"
        buttonText="Continuar con Google"
        theme="dark"
        onSuccess={responseGoogleRegister}
        onFailure={onFailureRegister}
        cookiePolicy={"single_host_origin"}
        className="googleLogin"
        style={{ width: "1000px" }}
        render={renderProps => (

          <button className={Style.imgSm} style={{ background: "url(https://i.imgur.com/YTsDRda.png)", backgroundSize: "cover", width: `${229 * sizeSocialButtons}px`, height: `${55 * sizeSocialButtons}px`, border: "none", borderRadius: "3px", marginBottom: "0.4em" }} onClick={renderProps.onClick} />

        )}
      />
    </div>

  );
};

export default Register;
