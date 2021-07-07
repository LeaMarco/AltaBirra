import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Beers from "../Beers/Beers";
import beers from "./Birrasjson";
import "./Home.scss";

const Home = () => {
//   const dispatch = useDispatch();
  //   const beers = useSelector((state) => state.beers);

//   useEffect(() => {
//     // dispatch(getAllBeers());
//   }, [dispatch]);

  return (
    <div className="Beers-container">
    <Beers beers={beers}/>
    </div>
  )

}
export default Home;