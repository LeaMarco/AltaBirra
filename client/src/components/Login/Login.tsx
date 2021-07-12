import React, { useEffect, useState } from "react";
// import {User, fetchUsers} from './actions';
// import {StoreState} from './reducers';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Style from "./Login.module.css";
import { useImperativeHandle } from "react";
import FacebookLogin from "react-facebook-login";

import { iError, iData } from "./LoginInterfaces";

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

  /* 
  if (errors[name].hasOwnProperty("onlyLettersUsAndNumbersOrEmail")) {
    if (
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(dataState[name]) ||
      dataState[name] === "" ||
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g.test(
        dataState[name]
      )
    ) {
      errors[name].onlyLettersUsAndNumbersOrEmail = "";
    } else {
      errors[name].onlyLettersUsAndNumbersOrEmail = "onlyLettersMge";
      errors[name].error = true;
    }
  }

  console.log(errors[name]); */

  console.log(errors[name]);

  return errors;
}

const Login: React.FunctionComponent<{}> = (props) => {
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

  const handleOnSubmit = (e) => {};

  const handleOnChange = (e) => {
    let newState: iData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    setErrors(validate(newState, errors, e));
    // setErrors(newState);
    setData(newState);

    // console.log(data);
    // console.log(errors);
  };

  return (
    <div id={Style.login}>
      <div style={{ fontWeight: 600, fontSize: "1.5em" }}>ENTRAR🍺</div>
      <form id={Style.form} onSubmit={handleOnSubmit}>
        <input
          onChange={handleOnChange}
          className={`${Style.RegisterInputs} ${
            errors.password.error ? Style.require : Style.ok
          }`}
          name="nameMail"
          placeholder=" Correo electronico o nombre de usuario"
        />
        <label className={Style.labels}>
          {/*  {(() => console.log(errors))()} */}
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
          className={`${Style.RegisterInputs} ${
            errors.password.error ? Style.require : Style.ok
          }`}
          onChange={handleOnChange}
          name="password"
          value={data.password}
          placeholder=" Password"
        />
        <label className={Style.labels}>
          {/*  {(() => console.log(errors))()} */}
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
      <img className={Style.imgSm} src="https://i.imgur.com/9cF89Xp.png" />
      <img className={Style.imgSm} src="https://i.imgur.com/Akk6z13.png" />
    </div>
  );
};

export default Login;
