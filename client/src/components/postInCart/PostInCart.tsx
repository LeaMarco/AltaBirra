import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, cart, PostValues } from "../../actions";
import axios from "axios";
import style from './PostInCart.module.css';
import Swal from "sweetalert2";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";

export function PostinCart({
	postId,
	postTitle,
	description,
	amount,
	pickupdir,
	countable,
	cartId,
	username,
	deleteGuestItem = (postIdDelete: number) => console.log("deleteGuestItem no pasada, porque no hace falta")
}) {
	const hasToken = Object.keys(localStorage).join().includes("token")
	const [quantity, setQuantity] = useState(amount);
	const [guestCartQuantity, setGuestCartQuantity] = useState()

	const dispatch = useDispatch();
	let cartIdparsed = parseInt(cartId, 10);

	function guestCartHandleQuantity(direction: 1 | -1) {
		let localStorageParse = JSON.parse(localStorage.guestsItemsInCart)
		localStorageParse[postId] = localStorageParse[postId] + direction
		localStorage.setItem("guestsItemsInCart", JSON.stringify(localStorageParse))
	}

	useEffect(() => {
		addToCart({ postId, quantity, username: "TestUser" });
	}, [quantity]);

	async function deleteItem() {
		if (hasToken) {
			await removeToCart({ username, postId, cartIdparsed });
			dispatch(getCart(cartIdparsed))
		}
		else {
			console.log("entre", postId)
			deleteGuestItem(postId)
		}
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
					<p>{pickupdir}</p>
				</div>
			</Link>
			<div className={style.modifyContainer}>
				<button onClick={(e) => {

					setQuantity(quantity + 1)
					guestCartHandleQuantity(+1)

				}}>➕</button>
				<p>Cantidad: {quantity}</p>
				{/* <p>{countable.discount}</p> */}
				<button onClick={(e) => {
					if (quantity <= 1) alert("Del piso no paso")
					else {
						guestCartHandleQuantity(-1)
						setQuantity(quantity - 1)
					}

				}
				}
				>
					➖
				</button>
			</div>
			<div className={style.priceAndDelete}>
				<p className={style.amount}>${(countable.price * quantity).toFixed(2)}</p>
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
	const response = await axios.put<PostValues>(urladdtocart, { params: data }, { headers: validationHeadersGenerator() });
	return response;
}

const urlremovetocart = `${process.env.REACT_APP_HOST_BACKEND}/removeToCart`;
async function removeToCart(data) {
	const response = await axios.delete<cart[]>(urlremovetocart, { headers: validationHeadersGenerator(), data: data });
	return response;
}
