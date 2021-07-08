import Beer from "../Beer/Beer";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchUsers } from "../../actions";

const Beers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const beers = useSelector((state) => state["users"]);

  return (
    <>
      {typeof beers === "object" ? (
        beers.map((beer) => (
          <Beer
            key={beer.id}
          Name={beer.Name} 
            id={beer.id}
            description={beer.description}
            alcohol={beer.alcohol}
            price={beer.price}
            ibu={beer.ibu}
            review={beer.review}
            img={beer.image}
          />
        ))
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};

export default Beers;
