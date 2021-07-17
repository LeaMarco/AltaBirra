import React from "react";
import { useState } from "react";
import Style from "./Rate.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Rate() {
	const [beer, setBeer] = useState<number>(0);
	const id: number = +useParams<{ id: string }>()?.id;

	function handleChange(event) {
		setBeer(event.target.value.length);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await axios.put("http://localhost:3001/ratePost", { data: { postId: id, userId: 2, rating: beer, comment: "Buena cerveza" } });
		let button = document.getElementById(`${event.target.name}Button`);
		if (button) button.style.visibility = "hidden";
	}

	return (
		<div className={Style.container}>
			<div>
				<h3> Calificar la cerveza </h3>
				<form name="beer" onSubmit={event => handleSubmit(event)}>
					<select onChange={event => handleChange(event)}>
						<option>  </option>
						<option> ⭐ </option>
						<option> ⭐⭐ </option>
						<option> ⭐⭐⭐ </option>
						<option> ⭐⭐⭐⭐ </option>
						<option> ⭐⭐⭐⭐⭐ </option>
					</select>
					<button id="beerButton"> Ok </button>
				</form>
			</div>
		</div >
	)
}