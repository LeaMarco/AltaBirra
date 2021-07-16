import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, cart, PostValues } from "../../actions";
import axios from "axios";

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
		<div>
			<Link to={`/DetailBeer/${postId}`}>
				<li>
					<h1>{postTitle}</h1>
					<span>{description}</span>
				</li>
			</Link>
			<button onClick={(e) => setQuantity(quantity + 1)}>➕</button>
			<p>Amount: {quantity}</p>
			<p>{countable.price * quantity}</p>
			<p>{countable.discount}</p>
			<button onClick={(e) => quantity > 1 ? setQuantity(quantity - 1) : alert("Del piso no paso")
			}
			>
				➖
			</button>
			<button
				onClick={(e) => {
					despachadora();
				}}
			>
				❌
			</button>
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
