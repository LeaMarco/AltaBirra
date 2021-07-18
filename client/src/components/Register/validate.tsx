
import { iData, iError, segurityLevels } from "./RegisterInterfaces";

//MANEJO DE ERRORES/////////////////////////

const onlyLettersMge = "Solo debe tener letras mayusculas o minusculas";
const onlyLettersUsAndNumbersMge =
    "Solo debe tener letras mayusculas, minusculas, numeros o guiones bajos";
const patternEmailMge = "Error en el formato del mail ingresado";

export function validate(dataState: iData, errors: iError, e): iError {
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