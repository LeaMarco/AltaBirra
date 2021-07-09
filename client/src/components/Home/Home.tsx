import React from "react";
import Beers from "../Beers/Beers";
import beers from "./Birrasjson";
import "./Home.scss";

const Home = () => {
  /* beers={"beers"} */
  return (
    <div className="Beers-container">
    <Beers />
    </div>
  )
}
export default Home;