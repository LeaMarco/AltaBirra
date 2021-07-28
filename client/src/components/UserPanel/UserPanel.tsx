import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";
import Style from "./UserPanel.module.css";
import { useHistory } from 'react-router-dom';
import { useState } from "react";


export default function UserPanel() {
	const history = useHistory();
	const [seeAdmin, setSeeAdmin]= useState<boolean>(false)
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
			<h2> TestUser </h2>
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
			<button className={Style.subcontainerNoFuncional} style={{ backgroundColor: "grey" }}> Configuracion de cuenta </button>
			<button className={Style.subcontainerNoFuncional} onClick={handleDesactivarCuenta}> Desactivar cuenta </button>
			<Link to="/admin" className={Style.subcontainer}>
				<div >
					Panel de administrador
				</div>
			</Link>	
		</div >
	);
}