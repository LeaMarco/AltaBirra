import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchedPosts } from "../../actions";
import { RootState } from "../../reducers";
import Style from "./FiltersList.module.css";

interface filters {
	title: string | undefined;
	genericType: string | undefined;
	specificType: string | undefined;
	minPrice: number | undefined;
	maxPrice: number | undefined;
	minIbu: number | undefined;
	maxIbu: number | undefined;
	minAbv: number | undefined;
	maxAbv: number | undefined;
	minOg: number | undefined;
	maxOg: number | undefined;
	minCalories: number | undefined;
	maxCalories: number | undefined;
	hasDryHop: boolean | undefined;
	hasShipping: boolean | undefined;
	hasDiscount: boolean | undefined;
	orderBy: string | undefined;
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

	function handleChange(event) {
		let temp = event.target.value === "-" || event.target.value === "" ? undefined : event.target.value;
		setFilterValues({ ...filterValues, [event.target.name]: temp });
	}

	function handleSubmit(event) {
		event.preventDefault();
		dispatch(searchedPosts(filterValues));
	}

	useEffect(() => {
		setFilterValues({ ...filterValues, orderBy });
	}, [dispatch]);

	useEffect(() => {
		dispatch(searchedPosts(filterValues))
	}, [orderBy]);

	return (
		<div className={Style.container}>
			<h2> Filtros </h2>
			<form className={Style.subcontainer}>
				<div>
					<label> Tipo generico </label>
					<select name="genericType" defaultValue="" onChange={event => handleChange(event)} >
						<option> - </option>
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
					<select name="specificType" defaultValue="" onChange={event => handleChange(event)} >
						<option> - </option>
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
					{/* material UI / Rating ? */}
					<p> Rating </p>
				</div>
				<div className={Style.inputDiv}>
					<label> Precio </label>
					<div>
						<label> Min: </label><input className={Style.smallInput} name="minPrice" defaultValue="" onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxPrice" defaultValue="" onChange={event => handleChange(event)} />
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
						<label> Min: </label><input className={Style.smallInput} name="minIbu" defaultValue="" onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxIbu" defaultValue="" onChange={event => handleChange(event)} />
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
						<label> Min: </label><input className={Style.smallInput} name="minAbv" defaultValue="" onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxAbv" defaultValue="" onChange={event => handleChange(event)} />
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
						<label> Min: </label><input className={Style.smallInput} name="minOg" defaultValue="" onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxOg" defaultValue="" onChange={event => handleChange(event)} />
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
						<label> Min: </label><input className={Style.smallInput} name="minCalories" defaultValue="" onChange={event => handleChange(event)} />
						<label> Max: </label><input className={Style.smallInput} name="maxCalories" defaultValue="" onChange={event => handleChange(event)} />
					</div>
					{
						filterValues.minCalories || filterValues.maxCalories
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div>
					<label> DRY HOP </label>
					<input type="checkbox" name="hasDryHop" defaultValue="" onChange={event => setFilterValues({ ...filterValues, hasDryHop: event.target.checked ? true : undefined })} />
					{
						filterValues.hasDryHop
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div>
					<label> Con envio </label>
					<input type="checkbox" name="hasShipping" defaultValue="" onChange={event => setFilterValues({ ...filterValues, hasShipping: event.target.checked ? true : undefined })} />
					{
						filterValues.hasShipping
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
				<div>
					<label> Con descuento </label>
					<input type="checkbox" name="hasDiscount" defaultValue="" onChange={event => setFilterValues({ ...filterValues, hasDiscount: event.target.checked ? true : undefined })} />
					{
						filterValues.hasDiscount
							? <button onClick={event => handleSubmit(event)}> + </button>
							: null
					}
				</div>
			</form>
		</div>
	)
}
