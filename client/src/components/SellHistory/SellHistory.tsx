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
			{
				history.length
					? <>
					<div className={Style.cardsContainer}>
					{history.map(post => {
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
								<h3 className={Style.title}> {post.post.title} </h3>
									<div className={Style.subdetail}>
										<div className={Style.imgContainer}>
											<img src={post.post.image} alt='' className={Style.imgHistory}/>
										</div>
										<div className={Style.dataContainer}>
											<div className={Style.propsContainer}>
												<h4> IBU: {post.post.beer.ibu} </h4>
												<h4> ABV: {post.post.beer.abv} </h4>
											</div> 
											
										</div>
										<div className={Style.CountableContainer}>
												<h5 className={Style.props}> Fecha: {post.createdAt} </h5>
												<h5 className={Style.props}> Estado: {post.state} </h5>
												<h5 className={Style.props}> Cantidad: {post.post.quantity} </h5>
											<div>
												<h4> Precio: ${post.post.countable.price} </h4>
											</div>
										</div>
									</div>
								</div></Link>
							</div>
						)
					})}
					</div>
					</>
					: <h2> No hay ventas registradas para esta cuenta </h2>
			}
		</div>
	)
}