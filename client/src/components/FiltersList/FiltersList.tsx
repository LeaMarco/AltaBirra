import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchedPosts } from "../../actions";
import { RootState } from "../../reducers";
import Style from "./FiltersList.module.css";

interface filters {
	title?: string;
	genericType?: string;
	specificType?: string;
	rating?: number;
	minPrice?: number;
	maxPrice?: number;
	minIbu?: number;
	maxIbu?: number;
	minAbv?: number;
	maxAbv?: number;
	minOg?: number;
	maxOg?: number;
	minCalories?: number;
	maxCalories?: number;
	hasDryHop?: boolean;
	hasShipping?: boolean;
	hasDiscount?: boolean;
	orderBy?: string;
}

interface params {
	title?: string;
}

export default function FiltersList() {
	const orderBy = useSelector((state: RootState) => state.orderPostsBy);
	const { title } = useParams<params>();
	const dispatch = useDispatch();
	const [filterValues, setFilterValues] = useState<filters>({
		title,
		genericType: undefined,
		specificType: undefined,
		rating: undefined,
		minPrice: undefined,
		maxPrice: undefined,
		minIbu: undefined,
		maxIbu: undefined,
		minAbv: undefined,
		maxAbv: undefined,
		minOg: undefined,
		maxOg: undefined,
		minCalories: undefined,
		maxCalories: undefined,
		hasDryHop: undefined,
		hasShipping: undefined,
		hasDiscount: undefined,
		orderBy
	});

	function handleChange({ target }) {
		let temp = target.value === "" ? undefined : target.name === "rating" ? target.value.length : target.value;
		setFilterValues({ ...filterValues, [target.name]: temp });
	}

	function handleSubmit(event) {
		event.preventDefault();
		dispatch(searchedPosts(filterValues));
	}

	// useEffect(() => {
	// 	setFilterValues({ ...filterValues, orderBy });
	// }, [dispatch]);

	return (
		<div className={Style.container}>
			<h2> Filtros </h2>
			<form className={Style.subcontainer}>
				<div>
					<label> Tipo generico </label>
					<select name="genericType" value={filterValues.genericType} onChange={event => handleChange(event)} >
						<option> </option>
						<option> Rubia </option>
						<option> Roja </option>
						<option> Negra </option>
					</select>
					{
						filterValues.genericType
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div>
					<label> Tipo especifico </label>
					<select name="specificType" value={filterValues.specificType} onChange={event => handleChange(event)} >
						<option> </option>
						<option> Amber </option>
						<option> Vino de cebada </option>
						<option> Ale belga </option>
						<option> Ale escocesa </option>
						<option> Duvel </option>
						<option> Porter </option>
						<option> Alt </option>
						<option> Kölsch </option>
						<option> Trappist </option>
						<option> Flanders negra </option>
						<option> Especial </option>
						<option> Cerveza de trigo </option>
						<option> Cerveza blanca </option>
						<option> Pilsner </option>
						<option> Dortmunder </option>
						<option> Viena </option>
						<option> Munich </option>
						<option> Bock </option>
						<option> Rauchbier </option>
						<option> Schwarzbier </option>
						<option> Gueze </option>
						<option> Faro </option>
						<option> Cerveza de fruta </option>
					</select>
					{
						filterValues.specificType
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div>
					<label> Rating </label>
					<select name="rating" value={"⭐".repeat(filterValues.rating || 0)} onChange={event => handleChange(event)}>
						<option> </option>
						<option> ⭐ </option>
						<option> ⭐⭐ </option>
						<option> ⭐⭐⭐ </option>
						<option> ⭐⭐⭐⭐ </option>
						<option> ⭐⭐⭐⭐⭐ </option>
					</select>
					{
						filterValues.rating
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div className={Style.inputDiv}>
					<label> Precio </label>
					<div>
						<label> Min: </label><input className={Style.smallInput} name="minPrice" value={filterValues.minPrice} onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxPrice" value={filterValues.maxPrice} onChange={event => handleChange(event)} />
					</div>
					{
						filterValues.minPrice || filterValues.maxPrice
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div className={Style.inputDiv}>
					<label> IBU </label>
					<div>
						<label> Min: </label><input className={Style.smallInput} name="minIbu" value={filterValues.minIbu} onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxIbu" value={filterValues.maxIbu} onChange={event => handleChange(event)} />
					</div>
					{
						filterValues.minIbu || filterValues.maxIbu
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div className={Style.inputDiv}>
					<label> ABV </label>
					<div>
						<label> Min: </label><input className={Style.smallInput} name="minAbv" value={filterValues.minAbv} onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxAbv" value={filterValues.maxAbv} onChange={event => handleChange(event)} />
					</div>
					{
						filterValues.minAbv || filterValues.maxAbv
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div className={Style.inputDiv}>
					<label> OG </label>
					<div>
						<label> Min: </label><input className={Style.smallInput} name="minOg" value={filterValues.minOg} onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxOg" value={filterValues.maxOg} onChange={event => handleChange(event)} />
					</div>
					{
						filterValues.minOg || filterValues.maxOg
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div className={Style.inputDiv}>
					<label> Calorias </label>
					<div>
						<label> Min: </label><input className={Style.smallInput} name="minCalories" value={filterValues.minCalories} onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxCalories" value={filterValues.maxCalories} onChange={event => handleChange(event)} />
					</div>
					{
						filterValues.minCalories || filterValues.maxCalories
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div>
					<label> DRY HOP </label>
					<input type="checkbox" name="hasDryHop" onChange={event => setFilterValues({ ...filterValues, hasDryHop: event.target.checked ? true : undefined })} />
					{
						filterValues.hasDryHop
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div>
					<label> Con envio </label>
					<input type="checkbox" name="hasShipping" onChange={event => setFilterValues({ ...filterValues, hasShipping: event.target.checked ? true : undefined })} />
					{
						filterValues.hasShipping
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div>
					<label> Con descuento </label>
					<input type="checkbox" name="hasDiscount" onChange={event => setFilterValues({ ...filterValues, hasDiscount: event.target.checked ? true : undefined })} />
					{
						filterValues.hasDiscount
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div className={Style.reset}>
					<input type="reset" />
				</div>
			</form>
		</div>
	)
}
