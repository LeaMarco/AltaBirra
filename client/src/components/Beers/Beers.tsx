import React from 'react';
import Beer from '../Beer/Beer';

const Beers = ({beers}) => {
    console.log(beers, "typeofbeers")
    return (
        <>
            {(typeof beers === "object") ? (
              beers.map((beer) => (
                <Beer
                  Name={beer.Name}
                  id={beer.id}
                  description={beer.description}
                  alcohol={beer.alcohol}
                  price={beer.price}
                  ibu={beer.ibu}
                  review={beer.review}
                />
              ))
            ) : (
              <h1>Cargando...</h1>
            )}
        </>
    )
}

export default Beers;