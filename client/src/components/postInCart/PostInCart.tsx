import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, cart, PostValues } from "../../actions";
import axios from "axios";
import style from './PostInCart.module.css';
import Swal from "sweetalert2";

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

	async function deleteItem() {
		await removeToCart({ username, postId, cartIdparsed });
		dispatch(getCart(cartIdparsed));
	}
	async function despachadora() {
		Swal.fire({
			title: '¿Seguro de borrar el item?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Borrar'
		}).then((result) => {
			if (result.isConfirmed) {
				deleteItem()
				Swal.fire(
					'¡Borrado!',
					'¡Se borro el item del carrito!',
					'success'
				)
			}
		})

	}
	//estado local con amount
	//handle submit ejecuta action para cambiar amount en db
	return (
		<div className={style.itemCarrito}>
			<Link className={style.Link} to={`/DetailBeer/${postId}`}>
				<div className={style.titleContainer}>
					<h1 className={style.title}>{postTitle}</h1>
					<span>{description.slice(0, 50)}...</span>
				</div>
			</Link>
			<div className={style.modifyContainer}>
				<button onClick={(e) => setQuantity(quantity + 1)}>➕</button>
				<p>Cantidad: {quantity}</p>
				{/* <p>{countable.discount}</p> */}
				<button onClick={(e) => quantity > 1 ? setQuantity(quantity - 1) : alert("Del piso no paso")
				}
				>
					➖
				</button>
			</div>
			<div className={style.priceAndDelete}>
				<p className={style.amount}>${countable.price * quantity}</p>
				<button className={style.deletebutton}
					onClick={(e) => {
						despachadora();
					}}
				>
					Eliminar
				</button>
			</div>
		</div>
	);
}

export default PostinCart;

const urladdtocart = `${process.env.REACT_APP_HOST_BACKEND}/cart`;
async function addToCart(data: any) {
	const response = await axios.put<PostValues>(urladdtocart, { params: data });
	return response;
}

const urlremovetocart = `${process.env.REACT_APP_HOST_BACKEND}/removeToCart`;
async function removeToCart(data) {
	const response = await axios.delete<cart[]>(urlremovetocart, { data: data });
	return response;
}
