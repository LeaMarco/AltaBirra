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
		if (status === "approved") {
			console.log("ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
			status = null

			axios.post(`${process.env.REACT_APP_HOST_BACKEND}/transaction`, null, { headers: validationHeadersGenerator() })
				.then(() => {
					redirect.push(`/historialCompras`)
				})
				.catch(() => (console.log("no se pudo crear la transaccion")))
		}
	}, [])

	useEffect(() => {
		dispatch(getHistory("buy", filter, userId));
	}, [dispatch, filter])




	return (
		<div className={Style.mainContainer}>
			<h2>Historial de Compras</h2>
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
								<Link to={`/calificar/${post.post.id}`} className={Style.Button}> Calificar </Link>

							</div>
						)
					})}
					</div>
					</>
					: <h2> No hay compras registradas para esta cuenta </h2>
			}
		</div >
	)
}