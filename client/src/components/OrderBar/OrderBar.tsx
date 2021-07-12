import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QueryTypes, searchedPosts, setQuerySearch } from "../../actions";
import { RootState } from "../../reducers";
import Style from "./OrderBar.module.css";

export default function OrderBar() {
	const searchQuery: QueryTypes = useSelector((state: RootState) => state.postsSearchQuery);
	const dispatch = useDispatch();

	function handleChange(event) {
		dispatch(setQuerySearch({ orderBy: event.target.value }));
	}

	useEffect(() => {
		dispatch(searchedPosts(searchQuery));
	}, [searchQuery.orderBy])

	return (
		<div className={Style.container}>
			<form>
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
			</form>
		</div>
	)
}
