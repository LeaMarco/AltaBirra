import Beer from "../Beer/Beer";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadUsersPremium } from "../../actions";
import './beers.css';

const Beers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersPremium());
  }, [dispatch]);

  const usersPremium = useSelector((state) => state["usersPremium"]);
 console.log(usersPremium, "user premium")
  const firstRandomBeer= Math.ceil(Math.random()*6)
  
  return (
    <div className="containerBeersPremium">
      <h1 id="titulo">Las recomendadas de Alta Birra</h1>
      <div className="beers">
      {
        typeof usersPremium === "object" 
        ? usersPremium.slice(firstRandomBeer, firstRandomBeer+5).map((userPremium) => (
          

          <Beer
            key={userPremium.id}
            id={userPremium.id}
            image={userPremium.image}
            title={userPremium.title}
            ibu={userPremium.beer.ibu}
            abv={userPremium.beer.abv}
            discount={userPremium.countable.discount}
            price={userPremium.countable.price}
            rating={userPremium.rating}
          /> ))
        : <h1>Cargando...</h1>
      }
      </div>
    </div>
  );
};

export default Beers;
