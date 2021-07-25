import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";
import Style from "./UserPanel.module.css";

export default function UserPanel() {

	function handleDesactivarCuenta(e) {
		e.preventDefault()
		axios.patch(`${process.env.REACT_APP_HOST_BACKEND}/desactivateAccount`, null, { headers: validationHeadersGenerator() }).then(res => {
			console.log(res)
		})
	}

	return (
		<div className={Style.container}>
			<h2> TestUser </h2>
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
		</div >
	);
}