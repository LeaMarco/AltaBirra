import React, { useEffect } from "react";
import Style from "./ViewHistory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../actions";
import { RootState } from "../../reducers";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";

export default function ViewHistory() {
	const dispatch = useDispatch();
	const history = useSelector((state: RootState) => state.history);

	useEffect(() => {
		dispatch(getHistory("view", undefined));
	}, [dispatch])

	function deleteConfirm() {
		Swal.fire({
			title: '¿Seguro de borrar todo tu historial?',
			text: "No se puede revertir...",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Borrar Todo'
		}).then(async (result) => {
			if (result.isConfirmed) {
				await axios.delete(`${process.env.REACT_APP_HOST_BACKEND}/viewHistory`, { headers: validationHeadersGenerator() });
				Swal.fire(
					'¡Borrado!',
					'¡Se limpió tu historial!',
					'success'
				)
				dispatch(getHistory("view", undefined));
			}
		})
	}

	return (
		<div className={Style.mainContainer}>
			<h2>Vistos recientemente</h2>
			<div className={Style.cardsContainer}>
				{
					history.length
						?
						<>
							{
								history?.map(post => {
									return (
										<div key={post.post.id} style={{ border: "1px solid black" }} className={Style.subcontainer}>
											<Link to={`/detailBeer/${post.post.id}`} key={post.post.id} style={{ textDecoration: "none", color: "black" }}>
												<div className={Style.detail}>
													<div className={Style.subdetail}>
														<div className={Style.imgContainer}>
															<img src={post.post.image} alt='' className={Style.imgHistory} />
														</div>
														<div className={Style.dataContainer}>
															<h3 className={Style.title}> {post.post.title} </h3>
															<div className={Style.propsContainer}>
																<h5 className={Style.props}> IBU: {post.post.beer.ibu} </h5>
																<h5 className={Style.props}> ABV: {post.post.beer.abv} </h5>
															</div>
														</div>
														<div>
															<h4> ${post.post.countable?.price ? post.post.countable.price : null} </h4>
														</div>
													</div>
												</div>
											</Link>
										</div>
									)
								}).reverse()
							}
							<button onClick={deleteConfirm} className={Style.Button}> Borrar historial de busqueda </button>
						</>

						: <h2> El historial esta vacio </h2>
				}
			</div>
		</div >
	)
}