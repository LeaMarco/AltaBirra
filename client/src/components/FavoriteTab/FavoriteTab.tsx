import React from "react";
import Style from "./FavoriteTab.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, getFavoritePosts, Post } from "../../actions";
import { useHistory } from "react-router-dom";
import { RootState } from "../../reducers";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Favorites {
	post: Post;
}

export default function FavoritesTab({ closeModal }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const favoritePosts: Favorites[] = useSelector((state: RootState) => state.favoritePosts);

	async function removeFavorite(id) {
		await axios.delete('http://localhost:3001/removeFavorite', { data: { "username": "TestUser", "postId": id } });
		dispatch(getFavoritePosts("TestUser"));
	}

	async function goToDetail(id) {
		await dispatch(getDetail(id));
		history.push(`/detailBeer/${id}`);
		closeModal();
	}

	useEffect(() => {
		dispatch(getFavoritePosts("TestUser"));
	}, [dispatch]);

	return (
		<Carousel className={Style.carousel} showStatus={false} showIndicators={false}>
			{
				favoritePosts?.map(post => {
					return (
						<div className={Style.card}>
							<button onClick={() => removeFavorite(post.post.id)} className={Style.unfav}> 💔 </button>
							<button onClick={() => goToDetail(post.post.id)} style={{ margin: 0, border: "none" }}> <div>
								<h5> {post.post.title} </h5>
								<img src={post.post.image} height="150vh" />
								<h5> $ {post.post.countable.price} </h5>
							</div> </button>
						</div>
					)
				})
			}
		</Carousel>
	)
}
