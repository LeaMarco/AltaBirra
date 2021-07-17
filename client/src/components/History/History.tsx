import React, { useState } from "react";
import Style from "./History.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, Post } from "../../actions";
import { RootState } from "../../reducers";
import { Link } from "react-router-dom";

export default function Historial() {
	const userId = 1;
	const dispatch = useDispatch();
	const history = useSelector((state: RootState) => state.history);
	const [historyType, setHistoryType] = useState<string>("");

	function handleHistory(type: string) {
		dispatch(getHistory(type, userId));
		setHistoryType(type);
	}

	return (
		<div className={Style.container}>
			<div>
				<button onClick={() => handleHistory("buy")}> Historial de compras </button>
				<button onClick={() => handleHistory("sell")}> Historial de ventas </button>
			</div>
			<div>
				{
					history.length
						? history.map(post => {
							return (
								<div key={post.post.id} style={{ border: "1px solid black" }}>
									{
										historyType === "buy"
											? <Link to={`/calificar/${post.post.id}`}> Calificar </Link>
											: null
									}
									<Link to={`/detailBeer/${post.post.id}`} key={post.post.id}><div>
										<h3> {post.post.title} </h3>
										<h4> ${post.price} </h4>
										<h4> {post.createdAt} </h4>
										<h4> Cantidad: {post.count} </h4>
										<h4> Fecha: {post.createdAt} </h4>
									</div></Link>
								</div>
							)
						})
						: null
				}
			</div>
		</div >
	)
}