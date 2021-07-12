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
  
  // const data = {
  //   id: usersPremium.id,
  //   image: 'IMAGEN',
  //   name: 'Cerveza IPA',
  //   ibu: 'ibu',
  //   abv: 'abv'
  // }

  // id: number;
	// username: string;
	// email: string;
	// name: string;
	// password: string;
	// premium: boolean;
	// roleId: number;
	// cartId: number
  console.log(usersPremium);
  
  return (
    <div className="containerBeersPremium">

      <h1 id="titulo">Las recomendadas de Alta Birra</h1>
      <div className="beers">
      {
        typeof usersPremium === "object" 
        ? usersPremium.map((userPremium) => (
          
          <Beer
            key={userPremium.id}
            id={userPremium.id}
            image={userPremium.image}
            name={userPremium.beer.name}
            ibu={userPremium.beer.ibu}
            og={userPremium.beer.og}
                        
          /> ))
        : <h1>Cargando...</h1>
      }
      </div>
    </div>
  );
};

export default Beers;
