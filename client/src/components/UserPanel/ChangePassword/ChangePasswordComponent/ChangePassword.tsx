import { useEffect } from "react";
import Style from "./ChangePassword.module.css";
// import {User, fetchUsers} from './actions';
// import {StoreState} from './reducers';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
// import FacebookLogin from "react-facebook-login";
import swal from 'sweetalert';
import { validationHeadersGenerator } from "../../../../validationHeadersGenerator";


interface IformData {
    oldPassword: string;
    newPassword: string;
}




export const ChangePassword: React.FunctionComponent<{ toggleSeeModal, setYeahNewPassword }> = ({ toggleSeeModal, setYeahNewPassword }) => {

    const [errors, setError] = useState<IformData>({ oldPassword: "error!", newPassword: "error!" })

    const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false)

    const [payload, setPayload] = useState<IformData>({ oldPassword: "", newPassword: "" })

    function handleOnChange(e) {
        const newState = { ...payload, [e.target.name]: e.target.value }
        handleErrors(newState, e.target.name)
        setPayload(newState)
    }

    function handleErrors(newState: IformData, name: string) {
        let errorsObject: IformData = { oldPassword: "", newPassword: "" }
        if (newState[name].length < 5) setError({ ...errors, [name]: "error!" })
        else setError({ ...errors, [name]: "" })
        console.log(errors)

    }

    function handleSubmit(e) {
        e.preventDefault()

        axios.patch(`${process.env.REACT_APP_HOST_BACKEND}/changePassword`, { payload }, { headers: validationHeadersGenerator() }).then(res => {

            setYeahNewPassword(true)
            setTimeout(() => {
                window.location.reload()
            }, 2100);

        }).catch(error => {
            console.log(error)
            setIncorrectPassword(true)
        })

    }

    console.log(payload)
    return (
        <form id={Style.form}>
            <div id={Style.tittle}  >Cambiar contraseña 🔏</div>
            <input style={incorrectPassword ? { border: "0.07em solid rgb(180, 68, 34)" } : {}} type="password" className={errors.oldPassword ? Style.inputWithErrors : Style.inputs} onChange={handleOnChange} name="oldPassword" value={payload.oldPassword} placeholder=" Contraseña antigua" />

            {payload.oldPassword.length === 0 ?
                <label style={{ marginTop: "-7px", marginBottom: "17px" }} > Falta la contraseña</label>
                :
                errors.oldPassword ?
                    <label style={{ marginTop: "-7px", marginBottom: "17px" }} > Contraseña muy corta</label>
                    :
                    <label style={{ marginTop: "-7px", marginBottom: "17px" }} > Ok💫</label>}




            <input type="password" className={errors.newPassword ? Style.inputWithErrors : Style.inputs} onChange={handleOnChange} name="newPassword" value={payload.newPassword} placeholder=" Contraseña nueva" />
            {payload.newPassword.length === 0 ?
                <label style={{ marginTop: "-7px", marginBottom: "17px" }} > Falta la contraseña</label>
                :
                errors.newPassword ?
                    <label style={{ marginTop: "-7px", marginBottom: "17px" }} > Contraseña muy corta</label>
                    :
                    <label style={{ marginTop: "-7px", marginBottom: "17px" }} > Genial ✨ </label>}


            <button id={errors.newPassword || errors.oldPassword ? Style.submitWithErrors : Style.submit} onClick={!(errors.newPassword || errors.oldPassword) ? handleSubmit : (e) => { e.preventDefault() }} >
                Cambiar </button>

            {errors.newPassword || errors.oldPassword ?
                <img width="120px" src="https://i.imgur.com/a7BGqTc.png" />
                :
                <img width="120px" src="https://i.imgur.com/zZaoyCh.gif" />
            }

            {incorrectPassword ?
                <label> Contraseña inválida 😦</label>
                :
                <label> </label>

            }






        </form>
    )

};


