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
import Style from "./Preview.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Beer from "../Beer/Beer";
import { card } from "mercadopago";

interface Favorites {
	post: Post;
}

export default function Preview({ info, image }) {


	let dataPrevie = {
		beer: {
		  abv: "abv?",
		  dryHop: false,
		  genericType: "Tipo genérico?",
		  ibu: "ibu?",
		  volume: "volume?",
		  og: "og?",
		  specificType: "Tipo específico?",
		  calories: "cal?",
		},
		infoPost: {
		  title: "Nombre de tú cerveza",
		  description: "Acá irá tu descripción",
		  image: image ? image : "https://i.imgur.com/FsGTu6Q.png",
		  stock: 1,
		  shipping: false,
		  visibility: true,
		  username: "testUser",
		},
		countable: {
		  price: "???",
		  discount: "?",
		  expireDate: Date.now(),
		}
	  }




	return info?.beer ? (

		<div className={Style.detailViewContainer}>
			<div className={Style.detailView}>
				<div className={Style.imageSection}>
					{image.length > 5 ? (<img src={image} alt="La imagen no esta disponible" />) : info.infoPost.image ? (<img src={info.infoPost.image} alt="La imagen no esta disponible" />) : <img src="https://i.imgur.com/FsGTu6Q.png" alt="La imagen no esta disponible" />}
					<p className={Style.ratingStars}>{info.rating}⭐⭐⭐⭐</p>
				</div>
				<div className={Style.beerDescription}>
					<div id="post">
						<div className={Style.Head}>
							<h1>{info.infoPost.title?info.infoPost.title:dataPrevie.infoPost.title}</h1>
							<div className={Style.types}>
								<p>{info.beer.genericType?info.beer.genericType:dataPrevie.beer.genericType}/</p><p>{info.beer.specificType?info.beer.specificType:dataPrevie.beer.specificType}</p>
							</div>
						</div>
						<div className={Style.textContent}>
							<div className={Style.specs}>
								<p>ibu: {info.beer.ibu?info.beer.ibu:dataPrevie.beer.ibu}</p>
								<p>abv: {info.beer.abv?info.beer.abv:dataPrevie.beer.abv}</p>
								<p>Cal: {info.beer.calories?info.beer.calories:dataPrevie.beer.calories}</p>
							</div>
							<p>{info.infoPost.description?info.infoPost.description:dataPrevie.infoPost.description}</p>

							<div className={Style.infoCompra}>
								<h3>Info De Compra</h3>
								<div className={Style.buyInfo}>
									<div className={Style.buttonsPago}>
										{ info.countable.discount !== 0 && info.countable.discount!== undefined?
											<p className={Style.originalPrice}> ${(info.countable.price - info.countable.price * (info.countable.discount / 100)).toFixed(2)} </p> : <p className={Style.originalPrice} > ${info.countable.price?info.countable.price:dataPrevie.countable.price}</p>}
										{info.countable.discount !== 0 && info.countable.discount!== undefined?
											<div className={Style.SecondPrices}>
												<p className={Style.priceWODiscount}>${info.countable.price}</p>
												<p className={Style.discount}>{info.countable.discount}%OFF</p>
											</div>
											: null}
									</div>
									<div className={Style.buyButtons}>
										
											<button className={Style.buttonComprar} >Comprar!</button>
										
										<button className={Style.addtoCartButton}>Agregar al Carrito</button>
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

	) : <span>Cargando!</span>
}
