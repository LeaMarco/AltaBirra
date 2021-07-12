import React from 'react'
import { Link } from 'react-router-dom';
import Style from "./Card.module.css";


const Post = ({ title, id, price, image, rating, discount, ibu, abv }) => {
	return (
		<Link className={Style.container} to={`/post/${id}`}>
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
		</Link>
	)
}

export default Post
