import { useSelector } from "react-redux";
import React from "react";
import Style from "./BeerLoading.module.css";
import beerLoading from "../../img/beerLoading2.jpg";

const BeerLoading = () => {
  
  return (
    <div className={Style.containerBeerLoading}>
      <img src={beerLoading} />
    </div>
  );
};

export default BeerLoading;
