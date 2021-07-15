import React from "react";
import { useState } from "react";
import Style from "./Rate.module.css";
import axios from "axios";

export default function Rate() {
	const [seller, setSeller] = useState<number>(0);
	const [beer, setBeer] = useState<number>(0);
	const postId = 1;

	function handleChange(event) {
		event.target.name === "seller" ? setSeller(event.target.value) : setBeer(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		// await axios.post("http://localhost:3001/rate", { data: { postId: 1, } });
		let button = document.getElementById(`${event.target.name}Button`);
		if (button) button.style.visibility = "hidden";
	}

	return (
		<div className={Style.container}>
			<div>
				<h3> Calificar al vendedor </h3>
				<form name="seller" onSubmit={event => handleSubmit(event)}>
					<select onChange={event => handleChange(event)}>
						<option>  </option>
						<option> ⭐ </option>
						<option> ⭐⭐ </option>
						<option> ⭐⭐⭐ </option>
						<option> ⭐⭐⭐⭐ </option>
						<option> ⭐⭐⭐⭐⭐ </option>
					</select>
					<button id="sellerButton"> Ok </button>
				</form>
			</div>
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