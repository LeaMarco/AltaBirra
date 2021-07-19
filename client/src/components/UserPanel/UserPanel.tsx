import React from "react";
import { Link } from "react-router-dom";
import Style from "./UserPanel.module.css";

export default function UserPanel() {
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
			<button className={Style.subcontainerNoFuncional} style={{ backgroundColor: "grey" }}> Desactivar cuenta </button>
		</div >
	);
}