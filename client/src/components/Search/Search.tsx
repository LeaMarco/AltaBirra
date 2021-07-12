import React, { useState } from "react";
import FiltersList from "../FiltersList/FiltersList";
import OrderBar from "../OrderBar/OrderBar";
import Posts from "../Posts/Posts";
import Style from "./Search.module.css";

export default function Search() {
	const [showFilters, setShowFilters] = useState<boolean>(false);
	return (
		<div className={Style.container}>
			<div className={Style.filtersTab}>
				{
					showFilters
						? <FiltersList />
						: null
				}
				<button onClick={() => setShowFilters(!showFilters)}> {showFilters ? "◀" : "▶"} </button>
			</div>
			<div className={Style.subcontainer}>
				{/* <div className={Style.orderBar}>
					<OrderBar />
				</div> */}
				<Posts />
			</div>
		</div>
	)
}
