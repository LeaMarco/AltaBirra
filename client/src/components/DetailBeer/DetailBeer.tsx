import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import { getDetail } from "../../actions/index"
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Style from './Detail.module.css'

export default function DetailBeer() {

	const dispatch = useDispatch();
	const { id }: any = useParams();
	const info: any = useSelector((state: RootState) => state.detailPosts)

	let price: number = info?.countable?.price
	let discount: number = info?.countable?.discount
	let price_disc: string = (price - discount).toFixed(2)
	// let price_disc: string = (price - discount).toString()

	useEffect(() => {
		dispatch(getDetail(id))
	}, [dispatch]);

	function addToFavorite() {
		alert(`Agregaste a Favorito a ${info?.title} `)
		axios.post('http://localhost:3001/addFavorite', { data: { "username": "TestUser", "postId": id } });
	}

	return (

		<div className={Style.post}>
			
			{console.log(info)}
			{/* {
				discount > 0? <h1>${discount}</h1>: <h1>Lo siento el Descuento se de "{discount}" :l</h1>
			}  */}
			<div className={Style.subTitle}>
				<button className={Style.botonFav} onClick={addToFavorite}><strong>❤</strong></button>
				<hr className={Style.hrSup} />
				<h1>{info.title}</h1>
				<hr className={Style.hrInf} />
			</div>
			<div className={Style.asdf}>
				{/*///////////////////////////////// Imagen ////////////////////////////////////////// */}
				<div className={Style.img}>
					<img className={Style.imagen} src={info.image} alt="La imagen no esta disponible" />
				</div>
				{/* ///////////////////////////// Contenedor del Post //////////////////////////////// */}
				<div className={Style.marg}>
					{/* <div> */}
					<div className={Style.subTitle}>
						<h3>{info?.beer?.name}</h3>
					</div>
					<div className={Style.asdf}>
						<p className={Style.fsColor} > <strong>ibu:</strong>  {info?.beer?.ibu}</p>
						<p className={Style.fsColor} > <strong>abv:</strong>  {info?.beer?.abv}</p>
						<p className={Style.fsColor} > <strong>Cal:</strong>  {info?.beer?.calories}</p>
					</div>
					<div>
						<p className={Style.subTitle}  > Description:</p>
						<p className={Style.fsColor}  >{info?.description}</p>
					</div>
					<div  >
						<h3 className={Style.subTitle}>Info De Compra</h3>
						<div className={Style.asdf}>
							{
								discount > 0 ?
									<p className={Style.fsColorP}> <strong> Precio: </strong> <s className={Style.oldPrice}>{price}</s> ${price_disc}</p> :
									<p className={Style.fsColorP}> <strong> Precio: </strong> ${price}</p>
							}
						</div>
						<div className={Style.asdf}>
							<button className={Style.button} >Comprar</button>
							<button className={Style.button} >Agregar Al Carrito</button>
						</div>
					</div>
				</div>
			</div>
			<div className={Style.subTitle}>
				<h1 >Rating: <progress className={Style.progress} value={info?.rating} max="5" />  {info?.rating} / 5 ⭐</h1>
			</div>
			<div>
				<div>
					<h3 className={Style.subTitle} >Info Cerveza</h3>
					<div className={Style.asd}>
						<div className={Style.desType}>
							<p className={Style.subTitle} >Tipo De Cerveza: {info?.beer?.genericType.type}</p>
							<p className={Style.fsColor} >Descripcion del tipo {info?.beer?.genericType.type}: {info?.beer?.genericType.description}</p>
						</div>
						<div className={Style.desType}>
							<p className={Style.subTitle} >Estilo de Cerveza: {info?.beer?.specificType.type}</p>
							<p className={Style.fsColor} >Descripcion del Estilo {info?.beer?.specificType.type}: {info?.beer?.specificType.description}</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div>
					<div className={Style.compartir} >
						<div className={Style.redes} >
							<a className={Style.aCompartir} target="_blank" href={`http://twitter.com/share?text=Me gusta la ${info?.beer?.name} de AltaBirra &url=${window.location.href}`}><img src="https://img.icons8.com/color/452/twitter--v1.png" width="30px" /></a>
							<a className={Style.aCompartir} target="_blank" href={`http://www.facebook.com/sharer.php?u=${window.location.href}`}><img src="https://img1.freepng.es/20171221/wgw/facebook-picture-5a3c060eccfa84.1675788915138831508396.jpg" width="25px" /></a>
							<a className={Style.aCompartir} target="_blank" href={`https://wa.me/?text=${window.location.href}.com Entra la concha de tu hermana`}><img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" width="30px" /></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}