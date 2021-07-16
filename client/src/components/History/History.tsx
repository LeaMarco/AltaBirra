import React from "react";
import Style from "./History.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, Post } from "../../actions";
import { RootState } from "../../reducers";
import { Link } from "react-router-dom";

interface HistoryType {
	post: Post;
}

export default function Historial() {
	const userId = 1;
	const dispatch = useDispatch();
	const history: HistoryType[] = useSelector((state: RootState) => state.history);
	console.log("Historial: ", history);

	function handleHistory(type: string) {
		dispatch(getHistory(type, userId));
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
								<Link to={`/detailBeer/${post.post.id}`} key={post.post.id}><div>
									<h3> post.post.title </h3>
									<h4> post.price </h4>
									<h4> post.createdAt </h4>
								</div></Link>
							)
						})
						: null
				}
			</div>
		</div >
	)
}