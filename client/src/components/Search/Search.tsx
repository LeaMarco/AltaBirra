import React, { useState } from "react";
import FiltersList from "../FiltersList/FiltersList";
import OrderBar from "../OrderBar/OrderBar";
import Cards from "../Cards/Cards";
import Style from "./Search.module.css";

export default function Search() {
  const [showFilters, setShowFilters] = useState<boolean>(true);
  return (
    <div className={Style.container} /* style={{ border: "10px solid yellow" }} */>


      <div className={Style.filtersTab} >
        {showFilters ? <FiltersList /> : null}
        <button onClick={() => setShowFilters(!showFilters)} >
          {" "}
          {showFilters ? "◀" : "▶"}{" "}
        </button>
      </div>


      <div className={Style.subcontainer} >
        <div className={Style.orderBar} >
          <OrderBar />
        </div >
        <div id={Style.cards}>
          <Cards />
        </div>
      </div>


    </div>
  );
}
