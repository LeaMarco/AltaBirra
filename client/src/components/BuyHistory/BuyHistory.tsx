import React, { useEffect } from "react";
import Style from "./BuyHistory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../actions";
import { RootState } from "../../reducers";
import { Link } from "react-router-dom";

export default function BuyHistory() {
	const userId = 1;
	const dispatch = useDispatch();
	const history = useSelector((state: RootState) => state.history);

	useEffect(() => {
		dispatch(getHistory("buy", userId));
	}, [dispatch])

	return (
		<div className={Style.container}>
			{
				history.length
					? history.map(post => {
						return (
							<div key={post.post.id} style={{ border: "1px solid black" }}>
								<Link to={`/calificar/${post.post.id}`}> Calificar </Link>
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
		</div >
	)
}