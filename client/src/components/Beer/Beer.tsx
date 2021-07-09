import React from 'react'
import { Link } from 'react-router-dom';
import './Beer.scss'

const Beer = ({Name,id,description,alcohol,price,ibu,review, img}) => {

    return (
        // <Link className="recipe" to={`/+++++++/${id}`}>
        <Link className="beer" to={`/beers/${id}`}>
            <div key={id}>
                <img alt="birrita" src={img}></img>
                <div className="beer-text">
                    <h1>{Name}</h1>
                    <div className="numbers">
                    <h4>{alcohol}</h4><span>alcohol</span>
                    <h5>{price}</h5><span>price</span>
                    <h6>{ibu}</h6><span>ibu</span>
                    <p>{review}</p><span>review</span>
                    </div>
                    <h3>{description}</h3>
                </div>
            </div>
        </Link>
    )
}

export default Beer
