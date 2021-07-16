import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDetail, getFavoritePosts, Post } from '../../actions';
import Style from "./Card.module.css";
import axios from "axios";
import { RootState } from '../../reducers';

interface Favorites {
	post: Post;
}

const Card = ({ title, id, price, image, rating, discount, ibu, abv }) => {
	const favorites: Favorites[] = useSelector((state: RootState) => state.favoritePosts);
	const [isFavorite, setIsFavorite] = useState<boolean>(favorites.some(post => post.post.id === Number(id)));
	const dispatch = useDispatch()
	const history = useHistory()

	const fetchDetail = async () => {
		await dispatch(getDetail(id))
		history.push(`/detailBeer/${id}`)
	}

	async function addToFavorite() {
		await axios.post('http://localhost:3001/addFavorite', { data: { "username": "TestUser", "postId": id } });
		dispatch(getFavoritePosts("TestUser"));
		setIsFavorite(true);
	}

	async function removeFavorite() {
		await axios.delete('http://localhost:3001/removeFavorite', { data: { "username": "TestUser", "postId": id } });
		dispatch(getFavoritePosts("TestUser"));
		setIsFavorite(false);
	}

	return (
		<div className={Style.container}>
			{
				isFavorite
					? <button onClick={removeFavorite} className={Style.unfav}> ❤ </button>
					: <button onClick={addToFavorite} className={Style.fav}> ❤ </button>
			}
			<button onClick={fetchDetail} style={{ backgroundColor: "transparent", border: "none" }}>
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
			</button>
		</div>
	)
}

export default Card
