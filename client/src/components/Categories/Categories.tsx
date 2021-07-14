import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { QueryTypes, searchedPosts, setQuerySearch, setTitleSearch } from "../../actions";
import { RootState } from "../../reducers";
import Style from "./Categories.module.css";

export default function Categories() {
	const dispatch = useDispatch();
	const searchQuery: QueryTypes = useSelector((state: RootState) => state.postsSearchQuery);

	function handleChange({ target }) {
		let temp = target.value === "" ? undefined : target.name === "rating" ? target.value.length : target.value;
		dispatch(setQuerySearch({ [target.name]: temp }));
	}

	function handleSubmit(event) {
		event.preventDefault();
		dispatch(searchedPosts(searchQuery));
	}

	function resetFilterValues() {
		let temp: QueryTypes = {};
		for (let prop in searchQuery) {
			temp[prop] = (prop === "title" || prop === "orderBy") ? searchQuery[prop] : undefined;
		}
		dispatch(setQuerySearch(temp));
	}

	return (
		<div className={Style.container}>
			<div className={Style.subcontainer}>
				<h2> Rubia </h2>
				<div>
					<h4> Informacion </h4>
					<p className={Style.informacion}> La gran mayoría de mortales, cuando pensamos en una cerveza, nos imaginamos una bebida de color amarillo tirando a dorado. Eso es porque, aunque existan birras de todos los colores, la rubia es el prototipo de cerveza por excelencia. Pero dentro de esas cervezas rubias, existen muchos tipos muy diferentes, cada uno de ellos elaborados de una manera distinta o con una historia diferente detrás. Siendo estrictos, el término cerveza rubia no se refiere a ningún estilo o variedad específica sino que hace referencia a un amplio abanico de cervezas que tienen un elemento en común: el uso de maltas claras o pálidas. </p>
				</div>
			</div>
			<div className={Style.subcontainer}>
				<h2> Roja </h2>
				<div>
					<h4> Informacion </h4>
					<p className={Style.informacion}> No se trata de un invento ni de un capricho de productores artesanales. Originaria de Escocia, la cerveza roja se encuentra desde hace siglos entre nosotros. Distinguida por su elaboración en la que predominan la malta y la cebada y su color rubí, se diferencia de su prima, la cerveza negra, porque casi no incluyen lúpulo, vegetal difícil de conseguir en Escocia y Gran Bretaña. Con una graduación alcohólica cercana a los 5 grados, se distingue además por sus aromas frutales. </p>
				</div>
			</div>
			<div className={Style.subcontainer}>
				<h2> Negra </h2>
				<div>
					<h4> Informacion </h4>
					<p className={Style.informacion}> Pero, ¿cómo se consigue una cerveza negra? ¿Cómo se logra esa oscuridad final y de manera natural? La principal característica o diferencia respecto a otro tipo de cervezas es la utilización de maltas oscuras provenientes del cereal malteado (humedecido, germinado y secado) al que se le sigue aplicando calor durante períodos más largos de tiempo a mayores temperaturas, para conseguir, precisamente, ese tueste diferencial. En el proceso de tostado de las maltas se reduce el azúcar fermentable que contienen, si bien el tueste resultante les confiere un elenco de aromas y sabores que se transmitirán al producto final. Chocolate, café o regaliz son sólo algunos de esos sabores que suelen estar presentes en las cervezas negras y que con más facilidad se distinguen en nariz o boca.</p>
				</div>
			</div>
		</div >
	)
}
