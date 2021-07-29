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
		<div className={Style.mainContainer}>
			<h2>Post en venta</h2>

			{
				sellingPosts.length
					? <>
					<div className={Style.cardsContainer}>
					{sellingPosts.map(post => {
						return (
							<div key={post.id} style={{ border: "1px solid black" }} className={Style.subcontainer}>
								<Link to={`/detailBeer/${post.id}`} key={post.id} style={{ textDecoration: "none", color: "black" }}><div className={Style.detail}>
									<div className={Style.subdetail}>
										<div className={Style.imgContainer}>
											<img src={post.image} alt='' className={Style.imgHistory}/>
										</div>
										<div className={Style.dataContainer}>
											<h3 className={Style.title}> {post.title} </h3>
											<div className={Style.propsContainer}>
												<h5 className={Style.props}> Precio: ${post.countable.price} </h5>
												<h5 className={Style.props}> Stock: {post.stock} </h5>
											</div>
										</div>
										<Link to={`/editPost/${post.id}`} className={Style.Button}> Editar Post </Link>
									</div>
								</div></Link>
							</div>
						)
					})}</div>
					</>
					: <h2> No hay cervezas en venta todavia, usa la seccion crear post para empezar a vender </h2>
			}
		</div>
	)
}