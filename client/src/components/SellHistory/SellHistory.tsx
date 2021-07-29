import React, { useEffect, useState } from "react";
import Style from "./SellHistory.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../actions";
import { RootState } from "../../reducers";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SellHistory() {
	const dispatch = useDispatch();
	const history = useSelector((state: RootState) => state.history);
	const [filter, setFilter] = useState<string | undefined>(undefined);
	const [newState, setNewState] = useState<string>("Cancelada");

	useEffect(() => {
		dispatch(getHistory("sell", filter));
	}, [dispatch, filter])

	function handleSubmit(event, id) {
		event.preventDefault();
		axios.put(`${process.env.REACT_APP_HOST_BACKEND}/transactionState`, { transactionId: id, newState })
			.then(() => {
				setNewState("Cancelada");
				dispatch(getHistory("sell", filter));
			});
	}

	console.log(history);

	return (
		<div className={Style.mainContainer}>
			<h2>Historial de Ventas</h2>
			<div className={Style.filter}>
				<label> Filtrar por: </label>
				<select className={Style.select} onChange={event => setFilter(event.target.value === "Todas" ? undefined : event.target.value)}>
					<option> Todas </option>
					<option> Completa </option>
					<option> Procesando </option>
					<option> Cancelada </option>
				</select>
			</div>
			<div className={Style.cardsContainer}>
				{
					history.length
						? history.map(post => {
							return (
								<div key={post.createdAt} style={{ border: "1px solid black" }} className={Style.subcontainer}>
									{
										post.state === "Procesando"
											? <form onSubmit={event => handleSubmit(event, post.id)}>
												<select onChange={event => setNewState(event.target.value)}>
													<option> Cancelada </option>
													<option> Completa </option>
												</select>
												<button> Ok </button>
											</form>
											: null
									}
									<Link to={`/detailBeer/${post.post.id}`} key={post.post.id} style={{ textDecoration: "none", color: "black" }}>
										<div className={Style.detail}>
											<h3 className={Style.title}> {post.post.title} </h3>
											<div className={Style.subdetail}>
												<div className={Style.imgContainer}>
													<img src={post.post.image} alt='' className={Style.imgHistory} />
												</div>
												<div className={Style.dataContainer}>
													<div className={Style.propsContainer}>
														<h4> IBU: {post.post.beer.ibu} </h4>
														<h4> ABV: {post.post.beer.abv} </h4>
													</div>

												</div>
												<div className={Style.CountableContainer}>
													<h5 className={Style.props}> Fecha: {`${post.createdAt.slice(8, 10)}/${post.createdAt.slice(5, 7)}/${post.createdAt.slice(0, 4)}`} </h5>
													<h5 className={Style.props}> Estado: {post.state} </h5>
													<h5 className={Style.props}> Cantidad: {post.quantity} </h5>
													<div>
														<h4> Precio: ${post.price} </h4>
													</div>
												</div>
											</div>
										</div>
									</Link>
								</div>
							)
						})
						: <h2> No hay ventas registradas para esta cuenta </h2>
				}
			</div>
		</div>
	)
}