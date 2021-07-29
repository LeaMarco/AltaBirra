import Beer from "../Beer/Beer";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadUsersPremium } from "../../actions";
import './beers.css';
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Carousel } from 'react-responsive-carousel';

const Beers = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 768, min: 464 },
      items: 2
    },
    smallMobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersPremium());
  }, [dispatch]);

  const usersPremium = useSelector((state) => state["usersPremium"]);
  return (
    <div className="containerBeersPremium">
      <h1 id="titulo">Las recomendadas de Alta Birra</h1>
      <Carousel className="beers">
        {
          typeof usersPremium === "object"
            ? usersPremium.map((userPremium) => (
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
              />))
            : <h1>Cargando...</h1>
        }
      </Carousel>
    </div>
  );
};

export default Beers;
