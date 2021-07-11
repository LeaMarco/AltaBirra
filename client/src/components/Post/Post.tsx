import React from 'react'
import { Link } from 'react-router-dom';
import Style from "./Post.module.css";


const Post = ({ title, id, price, image, rating, discount, ibu, abv }) => {

	return (
		<Link className={Style.container} to={`/post/${id}`}>
			<div key={id}>
				<img alt="" src={image}></img>
				<div>
					<h1>{title}</h1>
					<div>
						<h4>{rating}</h4>
						<h5>{price}</h5>
						<h6>{discount}</h6>
						<h6>{ibu}</h6>
						<h6>{abv}</h6>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default Post
