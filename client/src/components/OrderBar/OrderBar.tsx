import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderPostsBy } from "../../actions";
import { RootState } from "../../reducers";
import Style from "./OrderBar.module.css";

export default function OrderBar() {
	const orderBy = useSelector((state: RootState) => state.orderPostsBy);
	const dispatch = useDispatch();

	function handleChange(event) {
		return dispatch(orderPostsBy(event.target.value));
	}

	return (
		<div className={Style.container}>
			<form>
				<label> Ordenar por </label>
				<select onChange={event => handleChange(event)} value={orderBy}>
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
