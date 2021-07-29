import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QueryTypes, searchedPosts, setQuerySearch } from "../../actions";
import { RootState } from "../../reducers";
import Style from "./OrderBar.module.css";

export default function OrderBar() {
	const dispatch = useDispatch();
	const searchQuery: QueryTypes = useSelector((state: RootState) => state.postsSearchQuery);
	const posts: any = useSelector((state: RootState) => state.searchedPosts);
	const [page, setPage] = useState(searchQuery.page || 0);
	const { genericType, specificType, rating, hasDiscount, hasShipping, maxAbv, maxIbu, maxOg, minAbv, minOg, minIbu, minCalories, maxCalories, maxPrice, minPrice, hasDryHop, title } = searchQuery;

	function handleChange(event) {
		dispatch(setQuerySearch({ orderBy: event.target.value }));
		setPage(0);
	}

	useEffect(() => {
		dispatch(searchedPosts(searchQuery));
	}, [searchQuery.orderBy, searchQuery.page])

	useEffect(() => {
		dispatch(setQuerySearch({ page }));
	}, [page]);

	useEffect(() => {
		setPage(0);
	}, [genericType, specificType, rating, hasDiscount, hasShipping, maxAbv, maxIbu, maxOg, minAbv, minOg, minIbu, minCalories, maxCalories, maxPrice, minPrice, hasDryHop, title])

	return (
		<div className={Style.container}>
			<button onClick={page ? () => setPage(page - 1) : undefined} style={{ marginRight: "0.25vw", backgroundColor: page ? "inherit" : "grey" }}> ⬅ </button>
			<button onClick={posts?.length === 12 ? () => setPage(page + 1) : undefined} style={{ marginLeft: "0.25vw", backgroundColor: posts?.length === 12 ? "inherit" : "grey" }}> ➡ </button>
			<div>
				<label> Ordenar por </label>
				<select onChange={event => handleChange(event)} value={searchQuery.orderBy}>
					<option> Mejor resultado </option>
					<option> Menor precio </option>
					<option> Mayor precio </option>
					<option> Menor IBU </option>
					<option> Mayor IBU </option>
					<option> Menor ABV </option>
					<option> Mayor ABV </option>
					<option> Mejor rating </option>
				</select>
			</div>
		</div>
	)
}
