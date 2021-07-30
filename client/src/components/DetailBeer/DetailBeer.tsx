import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import { Modal } from "./DetailModal.component";
import {
	getCart,
	getDetail,
	getFavoritePosts,
	Post,
} from "../../actions/index";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Style from "./Detail.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Beer from "../Beer/Beer";
import { card } from "mercadopago";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";
import { response } from "express";

interface Favorites {
	post: Post;
}

export default function DetailBeer() {
	const hasToken = Object.keys(localStorage).join().includes("token")
	const carts: any = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch();
	const { id }: any = useParams();
	const info: any = useSelector((state: RootState) => state.detailPosts);
	const favorites: Favorites[] = useSelector((state: RootState) => state.favoritePosts);
	const [isFavorite, setIsFavorite] = useState<boolean>(favorites.some(post => post.post.id === Number(id)));
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const history = useHistory();
	const MySwal = withReactContent(Swal);
	const isUser = useSelector((state: RootState) => state.loginState);

	useEffect(() => {
		dispatch(getDetail(id));
		if (isUser) axios.post(`${process.env.REACT_APP_HOST_BACKEND}/viewHistory`, { data: { postId: id } }, { headers: validationHeadersGenerator() });
	}, [dispatch]);



	const addToCart = async () => {
		const response = await axios.put(`${process.env.REACT_APP_HOST_BACKEND}/addToCart`, { params: { "username": "TestUser", "postId": parseInt(id) } }, { headers: validationHeadersGenerator() })
		dispatch(getCart(1)); ////////////TIENE QUE TRAER EL ID DEL USUARIO QUE ESTÁ CONECTADO
		return (response.data)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await addToCart()
		await getCart(id)
		history.push(`/compra/1`);
	};

	function shutLogForBuy(e) {
		e.preventDefault();
		MySwal.fire({
			position: 'center',
			icon: 'warning',
			title: "Debes loguearte para comprar cervezas 🍻",
			showConfirmButton: false,
			timer: 1500,
		})

	}

	async function addFavoriteInLocalStorage() {
		if (localStorage.guestsItemsInCart) {
			const localStorageParse = JSON.parse(localStorage.guestsItemsInCart)
			/* if (localStorage.guestsItemsInCart[id]) ☢ Si le subis en el carrito, y despues tocas en agregar. Le volves a asignar 1 !!
				localStorage.setItem("guestsItemsInCart", JSON.stringify({ ...localStorageParse, [id]: ++localStorageParse[id] }))

			else  */localStorage.setItem("guestsItemsInCart", JSON.stringify({ ...localStorageParse, [id]: 1 }))
		}
		else localStorage.setItem("guestsItemsInCart", `{"${id}":1}`)

		// localStorage.setItem("guestsItemsInCart", "{'1':2,'3':3}")

		/* e.preventDefault()
		await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/getMultiplePostByIds`, { params: { guestsItemsInCart: localStorage.guestsItemsInCart } }).then(response => console.log(response.data))
		console.log(localStorage.guestsItemsInCart) */
	}

	return info?.beer ? (
		<div className={Style.detailContainer}>
			<div className={Style.detailViewContainer}>
				<div className={Style.Head}>
					<h1>{info.title}</h1>
					<div className={Style.types}>
						<p>{info.beer.genericType.type} / </p><p>&nbsp;{info.beer.specificType.type}</p>
					</div>
				</div>
				<div className={Style.detailView}>

					<div className={Style.imageSection}>
						<img src={info.image} alt="La imagen no esta disponible" />
						<div className={Style.reviews}>
							<div className={Style.reviewsTitle}>{info.review.length > 0 ? (<p>Reviews</p>) : null}</div>
							<div className={Style.ratingComment}>
								{info.review.slice(0, 5).map((comment) => (
									<p>{"⭐".repeat(comment.rating)}<br /><p>{comment.comment}</p></p>))
								}</div>
							<div className={Style.ratingTotal}>
								<p className={Style.ratingStars}><p>Rating Total</p>{"⭐".repeat(info.rating)}</p>
								{info.review.length > 0 ? (<p>{info.review.length} opiniones</p>) : null}
							</div>
							{info.review.length > 0 ? (<button onClick={() => setModalIsOpen(true)}>Ver mas Reviews</button>) : null}
							<Modal isOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)}>
								<p>Reviews</p>
								<div className={Style.modalContent}>
									{info.review.map((comment) => (
										<p>{"⭐".repeat(comment.rating)}<br /><p>{comment.comment}</p></p>))
									}
								</div>
								<button onClick={() => setModalIsOpen(false)}>Cerrar</button>
							</Modal>

						</div>
					</div>
					<div className={Style.beerDescription}>
						<div id="post">
							<div className={Style.textContent}>
								<h3>Información de la Cerveza</h3>
								<div className={Style.specs}>
									<p>IBU <br />{info.beer.ibu}%</p>
									<p>ABV <br />{info.beer.abv}%</p>
									<p>CAL <br />{info.beer.calories}</p>
								</div>
								<div className={Style.infoBeer}>
									<p>Description: {info.description}</p>
									<p>Descripcion del Estilo {info.beer.specificType.type}: {info.beer.specificType.description}</p>
								</div>
								<div className={Style.infoCompra}>
									<h3>Información De Compra</h3>

									{info.stock === 0 ? <div className={Style.soldout}>NO HAY STOCK</div> :
										<div className={Style.buyInfo}>
											<div className={Style.buyButtons}>
												<form onSubmit={hasToken ? handleSubmit : shutLogForBuy} >

													<button className={Style.buttonComprar} type="submit">¡COMPRAR AHORA!</button>

												</form>
												<button className={Style.addtoCartButton} onClick={async () => {

													if (hasToken) {
														MySwal.fire({
															position: 'center',
															icon: 'success',
															title: await addToCart(),
															showConfirmButton: false,
															timer: 1500,
														})
													}
													else {
														addFavoriteInLocalStorage()
														MySwal.fire({
															position: 'center',
															icon: 'success',
															title: "Agregada a carrito de invitad@ 🛒",
															showConfirmButton: false,
															timer: 1500,
														})
													}
												}}>AGREGAR AL CARRITO</button>
											</div>
											<div className={Style.buttonsPago}>
												{info.countable.discount !== 0 ?
													<p className={Style.originalPrice}> ${(info.countable.price - info.countable.price * (info.countable.discount / 100)).toFixed(2)} </p> : <p className={Style.originalPrice}> ${info.countable.price}</p>}
												{info.countable.discount !== 0 ?
													<div className={Style.SecondPrices}>
														<p className={Style.priceWODiscount}>${info.countable.price}</p>
														<p className={Style.discount}>{info.countable.discount}%OFF</p>
													</div>
													: null}
											</div>
										</div>}
								</div>
								<div className={Style.share}>
									Compartir
									<div className={Style.socialLinks}>
										<a target="_blank" href={`http://twitter.com/share?text=Me gusta la ${info.beer.name} de AltaBirra &url=${window.location.href}`}>
											<img src="https://img.icons8.com/color/452/twitter--v1.png" width="30px" />
										</a>
										<a target="_blank" href={`http://www.facebook.com/sharer.php?u=${window.location.href}`}>
											<img src="https://img1.freepng.es/20171221/wgw/facebook-picture-5a3c060eccfa84.1675788915138831508396.jpg" width="25px" />
										</a>

										<a target="_blank" href={`https://wa.me/?text=${window.location.href}`}>
											<img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" width="30px" />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >

	) : <span>Cargando!</span>
}
