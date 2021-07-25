import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Style from "./VerifyAccount.module.css";
import axios from "axios";
import verifyLogo from '../../img/verify2.jpg';

export default function VerifyAccount() {

	const { user }: any = useParams();
	console.log('ACA ESTA USER', user);

	const verify = async () => {
		
		await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/verify/verifyUser`, { headers: {user} })
		.then((e) =>{
			if(e.data) console.log('Cuenta verificada!')
		})
		.catch((error) => {
			console.log('Error al obtener la data')
		})
	}

	return (
		<div className={Style.containerVerify}>
			<div className={Style.verify}>
				{/* <img src={verifyLogo} className={Style.verifyLogo}/> */}
				<h1>Haga <a className={Style.link} onClick={verify}>click aquí</a> para completar el proceso de verificación!</h1>
			</div>
		</div >
	);
}