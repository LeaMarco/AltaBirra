import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import { getDetail } from "../../actions/index"
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function DetailBeer() {

	const dispatch = useDispatch();
	const { id }: any = useParams();

	const info: any = useSelector((state: RootState) => state.detailPosts)

	useEffect(() => {
		dispatch(getDetail(id))
	}, [dispatch]);

	// function addToFavorite() {
	// 	axios.post('http://localhost:3001/addFavorite', {data: {"username": "TestUser", "postId": id}});
	// }

	return (
		<div id="Post">
			<hr />
			{/* <button onClick={addToFavorite}> ❤ </button> */}
			<img src={info.image} alt="La imagen no esta disponible" />
			<div id="post">
				<div>
					<hr />
					<div>
						<h1>{info.title}</h1>
						<div>
							<p>Nombre: {info.beer.name} ibu: {info.beer.ibu}</p>
							<p>abv: {info.beer.abv}</p>
							<p>Cal: {info.beer.calories}</p>
							<p>Rating:{info.rating}</p>
						</div>
						<p>description:{info.description}</p>
					</div>
					<hr />
					<div>
						<h3>Info Cerveza</h3>
						<p>Tipo De Cerveza: {info.beer.genericType.type}</p>
						<p>Descripcion del tipo {info.beer.genericType.type}: {info.beer.genericType.description}</p>
						<hr />
						<p>Estilo de Cerveza: {info.beer.specificType.type}</p>
						<p>Descripcion del Estilo {info.beer.specificType.type}: {info.beer.specificType.description}</p>
					</div>
					<hr />
					<div>
						<h3>Info De Compra</h3>
						<p>Descuento : ${info.countable.discount}</p>
						<div>
							<p>Precio Total : ${info.countable.price} </p>
						</div>
					</div>
					<div>
						<p>Boton "Comprar"</p>
						<p>Boton "Agregar Al Carrito"</p>
						<div>
							Compartir
							<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
								<a href={`http://twitter.com/share?text=Me gusta la ${info.beer.name} de AltaBirra &url=${window.location.href}`}>
									<img src="https://img.icons8.com/color/452/twitter--v1.png" width="30px" />
								</a>
								<a href={`http://www.facebook.com/sharer.php?u=${window.location.href}`}>
									<img src="https://img1.freepng.es/20171221/wgw/facebook-picture-5a3c060eccfa84.1675788915138831508396.jpg" width="25px" />
								</a>
								<a href={`https://wa.me/?text=${window.location.href}`}>
									<img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" width="30px" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}