import React from "react";
import { useState } from "react";
import Style from "./Rate.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";

export default function Rate() {
	const [beer, setBeer] = useState<number>(1);
	const [mensaje, setMensaje] = useState<string>("");
	const id: number = +useParams<{ id: string }>()?.id;

	function handleChange(event) {
		setBeer(event.target.value.length);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await axios.put(`${process.env.REACT_APP_HOST_BACKEND}/ratePost`, { postId: id, rating: beer, comment: mensaje }, { headers: validationHeadersGenerator() });
		let button = document.getElementById(`${event.target.name}Button`);
		if (button) button.style.visibility = "hidden";
	}

	return (
		<div className={Style.container}>
			<div>
				<h3> Calificar la cerveza </h3>
				<form name="beer" onSubmit={event => handleSubmit(event)}>
					<select onChange={event => handleChange(event)} >
						<option> ⭐ </option>
						<option> ⭐⭐ </option>
						<option> ⭐⭐⭐ </option>
						<option> ⭐⭐⭐⭐ </option>
						<option> ⭐⭐⭐⭐⭐ </option>
					</select>
					<textarea placeholder="dejanos tu comentario" onChange={(e) => setMensaje(e.target.value)}></textarea>
					<button id="beerButton"> Ok </button>
				</form>
			</div>
		</div >
	)
}