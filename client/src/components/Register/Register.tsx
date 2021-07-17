import { useEffect } from "react";
import Style from "./Register.module.css";
// import {User, fetchUsers} from './actions';
// import {StoreState} from './reducers';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { iData, iError, segurityLevels } from "./RegisterInterfaces";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

//MANEJO DE ERRORES/////////////////////////

const onlyLettersMge = "Solo debe tener letras mayusculas o minusculas";
const onlyLettersUsAndNumbersMge =
  "Solo debe tener letras mayusculas, minusculas, numeros o guiones bajos";
const patternEmailMge = "Error en el formato del mail ingresado";

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
  // /^[A-Za-zÁÉÍÓÚáéíóúñÑ]{2}[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(dataState[name]) ||

  //ONLY LETTERS
  if (errors[name].hasOwnProperty("onlyLetters")) {
    if (
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(dataState[name]) ||
      dataState[name] === ""
    ) {
      errors[name].onlyLetters = "";
    } else {
      errors[name].onlyLetters = onlyLettersMge;
      errors[name].error = true;
    }
  }

  //ONLY LETTER US AND NUMBERS
  if (errors[name].hasOwnProperty("onlyLettersUsAndNumbers")) {
    if (/^[A-Za-z0-9_]*$/g.test(dataState[name])) {
      errors[name].onlyLettersUsAndNumbers = "";
    } else errors[name].onlyLettersUsAndNumbers = onlyLettersUsAndNumbersMge;
  }

  //PATTERN EMAIL
  if (errors[name].hasOwnProperty("patternEmail")) {
    if (
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g.test(
        dataState[name]
      )
    ) {
      errors[name].patternEmail = "";
    } else errors[name].patternEmail = patternEmailMge;
  }

  //SEGURITY LEVEL
  if (errors[name].hasOwnProperty("segurityLevel")) {
    if (errors[name].hasOwnProperty("segurityLevel")) {
      errors[name].segurityLevel = segurityLevels.low;
    } else errors[name].segurityLevel = false;
  }

  return errors;
}

////////////////////////////////////////
////////////////////////////////////////
const Register: React.FunctionComponent<{}> = (props) => {
  ///////////////LOGICA DE GOOGLE//////////////////////////

  const responseGoogleRegister = (response: any) => {
    const name = response.dt.uU;
    const googleId = response.googleId;
    const username = name + "_" + googleId;
    const email = response.profileObj.email;

    let params = {
      username,
      email,
      googleId,
    };

    console.log(params);
    //
    axios
      .post("http://localhost:3001/auth/signup", {
        params: {
          username,
          email,
          googleId,
          name,
        },
      })
      .then((e) => console.log(e.data));
  };

  const onFailureRegister = (response: any) => {
    console.log(response, "Fallo el registro!");
  };

  const responseGoogleLogin = (response: any) => {
    const nombre = response.dt.uU;
    const googleId = response.googleId;
    const username = nombre + "_" + googleId;

    axios
      .post("http://localhost:3001/auth/signin", {
        username,
        googleId,
      })
      .then((e) => console.log(e.data));
  };
  const onFailureLogin = (response: any) => {
    console.log(response, "Fallo el login!");
  };
  ///////////////////////////////////////////////////////

  const responseFacebook = (response: any) => {
    console.log(response);
  };

  const componentClicked = (response: any) => {
    console.log(response);
  };

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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let postObj = {
      username: data.userName,
      password: data.password,
      email: data.email,
      name: `${data.names} ${data.lastNames}`,
    };

    axios
      .post("http://localhost:3001/auth/signup/", { params: postObj })
      .then((e: any) => {
        if (typeof e.data === "object") alert("Usuario creado!");
        else alert(e.data);
      });
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

  return (
    <div id={Style.register}>
      <div style={{ fontWeight: 600, fontSize: "1.5em" }}>REGISTRARME🍻</div>
      <form id={Style.form} onSubmit={handleOnSubmit}>
        <input
          className={` ${Style.RegisterInputs} ${
            errors.names.error ? Style.require : Style.ok
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
                : "Se ve bien 👌";
            } else return " ";
          })()}
        </label>

        <input
          className={`${Style.RegisterInputs} ${
            errors.lastNames.error ? Style.require : Style.ok
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
          className={`${Style.RegisterInputs} ${
            errors.userName.error ? Style.require : Style.ok
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
          className={`${Style.RegisterInputs} ${
            errors.email.error ? Style.require : Style.ok
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
          className={`${Style.RegisterInputs} ${
            errors.password.error ? Style.require : Style.ok
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

        <button id={Style.btnRegister}> Registarse </button>
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/* <img className={Style.imgSm} src="https://i.imgur.com/9cF89Xp.png" /> */}
        {/* <img className={Style.imgSm} src="https://i.imgur.com/Akk6z13.png" /> */}
      </div>
      <FacebookLogin
        appId="866652260898974"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
      <GoogleLogin
        clientId="245898915217-tmmeiem93tnr14ar1lpv0qdsok0qcpnj.apps.googleusercontent.com"
        buttonText="Register"
        onSuccess={responseGoogleRegister}
        onFailure={onFailureRegister}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Register;
