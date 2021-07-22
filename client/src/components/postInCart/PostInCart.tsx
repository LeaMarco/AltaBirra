import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, cart, PostValues } from "../../actions";
import axios from "axios";
import style from './PostInCart.module.css';

export function PostinCart({
	postId,
	postTitle,
	description,
	amount,
	countable,
	cartId,
	username,
}) {
	const [quantity, setQuantity] = useState(amount);

	const dispatch = useDispatch();
	let cartIdparsed = parseInt(cartId, 10);

	useEffect(() => {
		addToCart({ postId, quantity, username: "TestUser" });
	}, [quantity]);

	async function despachadora() {
		await removeToCart({ username, postId, cartIdparsed });
		dispatch(getCart(cartIdparsed));
	}
	//estado local con amount
	//handle submit ejecuta action para cambiar amount en db
	return (
		<div className={style.itemCarrito}>
			<Link className={style.Link} to={`/DetailBeer/${postId}`}>
				<div className={style.titleContainer}>
					<h1 className={style.title}>{postTitle}</h1>
					<span>{description.slice(0, 50)}...</span>
					<button
						onClick={(e) => {
							despachadora();
						}}
					>
						Eliminar
					</button>
				</div>
			</Link>
			<div className={style.modifyContainer}>
				<button onClick={(e) => setQuantity(quantity + 1)}>➕</button>
				<p>Amount: {quantity}</p>
				{/* <p>{countable.discount}</p> */}
				<button onClick={(e) => quantity > 1 ? setQuantity(quantity - 1) : alert("Del piso no paso")
				}
				>
					➖
				</button>
			</div>
			<p className={style.amount}>${countable.price * quantity}</p>
		</div>
	);
}

export default PostinCart;

const urladdtocart = "http://localhost:3001/cart";
async function addToCart(data: any) {
	const response = await axios.put<PostValues>(urladdtocart, { params: data });
	return response;
}

const urlremovetocart = "http://localhost:3001/removeToCart";
async function removeToCart(data) {
	const response = await axios.delete<cart[]>(urlremovetocart, { data: data });
	return response;
}
