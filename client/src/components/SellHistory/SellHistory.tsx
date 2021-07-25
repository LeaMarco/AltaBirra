import React, { useEffect, useState } from "react";
import Style from "./SellHistory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../actions";
import { RootState } from "../../reducers";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SellHistory() {
	const userId = 1;
	const dispatch = useDispatch();
	const history = useSelector((state: RootState) => state.history);
	const [filter, setFilter] = useState<string | undefined>(undefined);
	const [newState, setNewState] = useState<string>("Cancelada");

	useEffect(() => {
		dispatch(getHistory("sell", filter, userId));
	}, [dispatch, filter])

	async function handleSubmit(event, post) {
		event.preventDefault();
		await axios.put(`${process.env.REACT_APP_HOST_BACKEND}/transactionState`, { transactionId: post.id, newState });
		dispatch(getHistory("sell", filter, userId));
	}

	return (
		<div className={Style.container}>
			<div className={Style.filter}>
				<label> Filtrar por: </label>
				<select onChange={event => setFilter(event.target.value === "Todas" ? undefined : event.target.value)}>
					<option> Todas </option>
					<option> Completa </option>
					<option> Procesando </option>
					<option> Cancelada </option>
				</select>
			</div>
			{
				history.length
					? history.map(post => {
						return (
							<div key={post.post.id} style={{ border: "1px solid black" }} className={Style.subcontainer}>
								{
									post.state === "Procesando"
										? <form onSubmit={event => handleSubmit(event, post)}>
											<select onChange={event => setNewState(event.target.value)}>
												<option> Cancelada </option>
												<option> Completa </option>
											</select>
											<button> Ok </button>
										</form>
										: null
								}
								<Link to={`/detailBeer/${post.post.id}`} key={post.post.id} style={{ textDecoration: "none", color: "black" }}><div className={Style.detail}>
									<div className={Style.subdetail}>
										<img src={post.post.image} alt='' height="150vh" />
										<h2> {post.post.title} </h2>
										<div>
											<h4> Precio: ${post.price} </h4>
											<h4> Estado: {post.state} </h4>
											<h4> Cantidad compradas: {post.quantity} </h4>
											<h4> Fecha: {post.createdAt} </h4>
										</div>
									</div>
								</div></Link>
							</div>
						)
					})
					: null
			}
		</div>
	)
}