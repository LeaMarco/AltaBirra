import React from "react";
import Beers from "../Beers/Beers";
import BeersVot from "../Beers/BeersVot";
import BeersNew from "../Beers/BeersNew";
import "./Home.scss";
import CreateManyPost from "./postCreator";

const Home = () => {

  return (
    <div className="Beers-container">
      <button onClick={() => CreateManyPost(1000)}> CREAR</button>

      <Beers />
      <BeersVot />
      <BeersNew />
    </div>
  );
};
export default Home;
