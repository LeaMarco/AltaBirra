import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getDetail } from '../../actions';
import Style from "./Card.module.css";


const Post = ({ title, id, price, image, rating, discount, ibu, abv }) => {

	const dispatch = useDispatch()
	const histoy= useHistory()
	const fetchDetail= async()=>{
		await dispatch(getDetail(id))
		histoy.push(`/detailBeer/${id}`)
	}

	return (
		<button className={Style.container} onClick={fetchDetail}>
			<div key={id}>
				<img className={Style.image} alt="" src={image}></img>
				<div>
					<h2>{title}</h2>
					<div className={Style.props}>
						<p> {"⭐".repeat(rating)} </p>
						<div>
							<p> $ {price} </p>
							<p> Ibu: {ibu} </p>
							<p> Abv: {abv} % </p>
						</div>
					</div>
				</div>
			</div>
		</button>
	)
}

export default Post
