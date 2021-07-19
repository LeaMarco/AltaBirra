import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
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

interface Favorites {
	post: Post;
}

export default function DetailBeer() {
	const dispatch = useDispatch();
	const { id }: any = useParams();
	const info: any = useSelector((state: RootState) => state.detailPosts);
	const favorites: Favorites[] = useSelector((state: RootState) => state.favoritePosts);
	const [isFavorite, setIsFavorite] = useState<boolean>(favorites.some(post => post.post.id === Number(id)));
	const [cantidad, setCantidad] = useState(1)
	const history = useHistory()
	const MySwal = withReactContent(Swal)

	useEffect(() => {
		dispatch(getDetail(id))
	}, [dispatch]);


	async function addToFavorite() {
		await axios.post('https://altabirra.herokuapp.com/addFavorite', { data: { "username": "TestUser", "postId": id } });
		dispatch(getFavoritePosts("TestUser"));
		setIsFavorite(true);
	}

	const addToCart = async () => {
		const response = await axios.put(`https://altabirra.herokuapp.com/addToCart`, { params: { "username": "TestUser", "postId": parseInt(id), "quantity": cantidad } })
		return (response.data)

	}

	async function removeFavorite() {
		await axios.delete('https://altabirra.herokuapp.com/removeFavorite', { data: { "username": "TestUser", "postId": id } });
		dispatch(getFavoritePosts("TestUser"));
		setIsFavorite(false);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		await addToCart()
		await getCart(id)
		history.push(`/compra/1`); ///////////FALTA CARGAR EL ID DEL USUARIO QUE ESTÉ EN LA PÁGINA
	};


	return (
		<div className={Style.detailContainer}>
			<div className={Style.detailViewContainer}>
				<div className={Style.detailView}>
					<div className={Style.imageSection}>
						<div className={Style.favbutton}>
							{
								isFavorite
									? <button onClick={removeFavorite} className={Style.unfav}> ❤ </button>
									: <button onClick={addToFavorite} className={Style.fav}> ❤ </button>
							}
						</div>
						<img src={info.image} alt="La imagen no esta disponible" />
						<p className={Style.ratingStars}>{info.rating}⭐⭐⭐⭐</p>
					</div>
					<div className={Style.beerDescription}>
						<div id="post">
							<div>
								<div className={Style.Head}>
									<h1>{info.title}</h1>
									{/* <p>Nombre: {info.beer.name}</p> */}
									<div className={Style.types}>
										<p>{info.beer.genericType.type}/</p><p>{info.beer.specificType.type}</p>
									</div>
								</div>
								<div className={Style.textContent}>
									{/* <p>Descripcion del tipo {info.beer.genericType.type}: {info.beer.genericType.description}</p> */}
									<div className={Style.specs}>
										<p>ibu: {info.beer.ibu}</p>
										<p>abv: {info.beer.abv}</p>
										<p>Cal: {info.beer.calories}</p>
									</div>
									<p>Description: {info.description}</p>
									<div className={Style.infoBeer}>
										<h3>Info Cerveza</h3>
										<p>Descripcion del Estilo {info.beer.specificType.type}: {info.beer.specificType.description}</p>
									</div>
									<div className={Style.infoCompra}>
										<h3>Info De Compra</h3>
										<div className={Style.buyInfo}>
											<div className={Style.buyButtons}>
												<button className={Style.buttonComprar} type="submit">Comprar!</button>
												<button className={Style.addtoCartButton} onClick={async () => {
													MySwal.fire({
														position: 'center',
														icon: 'success',
														title: await addToCart(),
														showConfirmButton: false,
														timer: 1500,
													})
												}}>Agregar al Carrito</button>
											</div>
											<div className={Style.buttonsPago}>
												{info.countable.discount !== 0 ?
													<p className={Style.originalPrice}> ${(info.countable.price - info.countable.price * (info.countable.discount / 100)).toFixed(2)} </p> : <p className={Style.originalPrice} > ${info.countable.price}</p>}
												{info.countable.discount !== 0 ?
													<div className={Style.SecondPrices}>
														<p className={Style.priceWODiscount}>${info.countable.price}</p>
														<p className={Style.discount}>{info.countable.discount}%OFF</p>
													</div>
													: null}
											</div>
										</div>
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
			</div>
		</div >

	)
}
