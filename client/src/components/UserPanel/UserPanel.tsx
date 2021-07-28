import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";
import Style from "./UserPanel.module.css";
import { useHistory } from 'react-router-dom';
import { ModalChangePassword } from "./ChangePassword/ChangePasswordModal/Modal.component";
import { useState } from "react";
import { ChangePassword } from "./ChangePassword/ChangePasswordComponent/ChangePassword";



export default function UserPanel() {

	const [seeModal, setSeeModal] = useState<boolean>(false)
	const [showYeahNewPassword, setShowYeahNewPassword] = useState<boolean>(false)
	function toggleSeeModal() {
		setSeeModal(!seeModal)
	}



	const history = useHistory();

	function handleDesactivarCuenta(e) {
		e.preventDefault()
		axios.patch(`${process.env.REACT_APP_HOST_BACKEND}/desactivateAccount`, null, { headers: validationHeadersGenerator() }).then(res => {
			localStorage.clear()
			console.log(res)
			history.push("")
		})
	}



	return (
		<div className={Style.container}>
			<div id={Style.controlPanel}> Panel de control </div>

			<Link to="/historialVistos" className={Style.subcontainer}>
				<div >
					Vistos recientemente
				</div>
			</Link>
			<Link to="/historialCompras" className={Style.subcontainer}>
				<div >
					Historial de compras
				</div>
			</Link>
			<Link to="/historialVentas" className={Style.subcontainer}>
				<div >
					Historial de ventas
				</div>
			</Link>
			<Link to="/post" className={Style.subcontainer}>
				<div >
					Crear nuevo post
				</div>
			</Link>

			{
				localStorage.tokenLocal ?
					<button onClick={toggleSeeModal} className={Style.subcontainer} > Cambiar contraseña </button>
					:
					""
			}

			<ModalChangePassword isOpen={seeModal} handleClose={toggleSeeModal} >

				{
					showYeahNewPassword ?
						<img src={"https://www.uala.com.mx/assets/images/gif/security.gif?"/*  + new Date().getTime() */} />

						:
						<ChangePassword setYeahNewPassword={setShowYeahNewPassword} toggleSeeModal={toggleSeeModal} />
				}

			</ModalChangePassword>

			<button className={Style.subcontainer} onClick={handleDesactivarCuenta}> Desactivar cuenta </button>


		</div >
	);
}