import React, { useEffect } from "react";
import Style from "./BuyHistory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../actions";
import { RootState } from "../../reducers";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";

export default function BuyHistory() {
	const userId = 1;
	const dispatch = useDispatch();
	const [filter, setFilter] = useState<string | undefined>(undefined);
	const history = useSelector((state: RootState) => state.history);
	const search = useLocation().search;
	const redirect = useHistory();

	let status = new URLSearchParams(search).get("status")


	useEffect(() => {
		dispatch(getHistory("buy", filter, userId));
	}, [dispatch, filter])

	if (status === "approved") {
		status = null
		axios.post(`${process.env.REACT_APP_HOST_BACKEND}/transaction`, null, { headers: validationHeadersGenerator() })
			.then(() => {				
				redirect.push(`/historialCompras`)
			})
			.catch(() => (console.log("no se pudo crear la transaccion")))
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
								<Link to={`/calificar/${post.post.id}`} style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}> Calificar </Link>
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
					: <h2> No hay compras registradas para esta cuenta </h2>
			}
		</div >
	)
}