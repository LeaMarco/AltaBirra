import React, { useEffect } from "react";
import Style from "./ViewHistory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../actions";
import { RootState } from "../../reducers";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function ViewHistory() {
	const userId = 1;
	const dispatch = useDispatch();
	const history = useSelector((state: RootState) => state.history);

	useEffect(() => {
		dispatch(getHistory("view", undefined, userId));
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
				await axios.delete(`${process.env.REACT_APP_HOST_BACKEND}/viewHistory`, { data: { userId } });
				Swal.fire(
					'¡Borrado!',
					'¡Se limpió tu historial!',
					'success'
				)
				dispatch(getHistory("view", undefined, userId));
			}
		})
	}

	return (
		<div className={Style.container}>
			<button onClick={deleteConfirm}> Borrar historial de busqueda </button>
			{
				history.length
					? history.map(post => {
						return (
							<div key={post.post.id} style={{ border: "1px solid black" }} className={Style.subcontainer}>
								<Link to={`/detailBeer/${post.post.id}`} key={post.post.id} style={{ textDecoration: "none", color: "black" }}><div className={Style.detail}>
									<h3> {post.post.title} </h3>
									<div className={Style.subdetail}>
										<img src={post.post.image} alt='' />
										<div>
											<h4> ${post.post.price} </h4>
										</div>
									</div>
								</div></Link>
							</div>
						)
					})
					: null
			}
		</div >
	)
}