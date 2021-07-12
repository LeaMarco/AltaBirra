import React from "react";
import Beers from "../Beers/Beers";
import BeersVot from "../Beers/BeersVot";
import BeersNew from "../Beers/BeersNew";
import beers from "./Birrasjson";
import "./Home.scss";

const Home = () => {
  /* beers={"beers"} */
  return (
    <div className="Beers-container">

     <Beers />
     <BeersVot />
     <BeersNew />

    </div>
  )
}
export default Home;