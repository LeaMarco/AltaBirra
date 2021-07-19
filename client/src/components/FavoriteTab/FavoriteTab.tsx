import React from "react";
import Style from "./FavoriteTab.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, getFavoritePosts, Post } from "../../actions";
import { useHistory } from "react-router-dom";
import { RootState } from "../../reducers";

interface Favorites {
	post: Post;
}

export default function FavoritesTab() {
	const dispatch = useDispatch();
	const history = useHistory();
	const favoritePosts: Favorites[] = useSelector((state: RootState) => state.favoritePosts);

	async function removeFavorite(id) {
		await axios.delete('https://altabirra.herokuapp.com/removeFavorite', { data: { "username": "TestUser", "postId": id } });
		dispatch(getFavoritePosts("TestUser"));
	}

	async function goToDetail(id) {
		await dispatch(getDetail(id))
		history.push(`/detailBeer/${id}`)
	}

	useEffect(() => {
		dispatch(getFavoritePosts("TestUser"));
	}, [dispatch]);

	return (
		<div style={{ backgroundColor: "white", border: "1px solid black", width: "10vw" }}>
			{
				favoritePosts?.map(post => {
					return (
						<div style={{ border: "1px solid black", display: "flex", flexDirection: "column" }}>
							<button onClick={() => removeFavorite(post.post.id)} className={Style.unfav}> ❤ </button>
							<button onClick={() => goToDetail(post.post.id)} style={{ margin: 0 }}> <div>
								<h5> {post.post.title} </h5>
								<img src={post.post.image} height="50vh" />
								<h5> $ {post.post.countable.price} </h5>
							</div> </button>
						</div>
					)
				})
			}
		</div>
	)
}
