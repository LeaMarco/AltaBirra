import React, { useEffect, useState } from "react";
import Style from "./Selling.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, getSellingPosts } from "../../actions";
import { RootState } from "../../reducers";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Selling() {
	const userId = 1;
	const dispatch = useDispatch();
	const sellingPosts = useSelector((state: RootState) => state.sellingPosts);

	useEffect(() => {
		dispatch(getSellingPosts());
	}, [dispatch])

	return (
		<div className={Style.container}>
			{
				sellingPosts.length
					? sellingPosts.map(post => {
						return (
							<div key={post.id} style={{ border: "1px solid black" }} className={Style.subcontainer}>
								<Link to={`/detailBeer/${post.id}`} key={post.id} style={{ textDecoration: "none", color: "black" }}><div className={Style.detail}>
									<div className={Style.subdetail}>
										<img src={post.image} alt='' height="150vh" />
										<div>
											<h1> {post.title} </h1>
											<h4> Precio: ${post.countable.price} </h4>
											<h4> Stock: {post.stock} </h4>
											{/* <h4> {post.} </h4>
											<h4> {post.} </h4> */}
										</div>
										<Link to={`/editPost/${post.id}`} className={Style.edit}> Editar Post </Link>
									</div>
								</div></Link>
							</div>
						)
					})
					: <h2> No hay cervezas en venta todavia, usa la seccion crear post para empezar a vender </h2>
			}
		</div>
	)
}