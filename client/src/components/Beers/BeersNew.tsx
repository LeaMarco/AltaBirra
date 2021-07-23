import Beer from "../Beer/Beer";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadUsersPremium } from "../../actions";
import './beers.css';
import axios from "axios";
import { useState } from "react";

const Beers = () => {
  const dispatch = useDispatch();
  const [news, setNews]:any=useState()
  async function searchNews() {
    const response = await axios.get<PostValues>("http://localhost:3001/beer/news");
    setNews(response.data)
    return response;
  }


  useEffect(() => {
   searchNews();
  }, [dispatch]);

  
  return (
    <div className="containerBeersPremium">
      <h1 id="titulo">Las nuevas!</h1>
      <div className="beers">
      {
        Array.isArray(news)?
         news.map((userPremium) => (
          
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




interface PostValues {
	beer: {
		abv: number;
		og: number;
		ibu: number;
		calories: number;
		dryHop: boolean;
		volume: number;
		genericType: string;
		specificType: string;
	};
	infoPost: {
		title: string;
		description: string;
		image: string;
		stock: number;
		rating: number;
		shipping: boolean;
		visibility: boolean;
		username: string;
	};
	countable: {
		price: number;
		discount: number;
	};
	date: Date;
};