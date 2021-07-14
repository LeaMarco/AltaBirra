import React,{useState} from 'react'
import { useParams,Link } from "react-router-dom";
import {addToCart} from "../../actions";
import {removeToCart} from "../../actions";

export function PostinCart({postId,postTitle,description,amount,countable}) {
    const [state, setstate] = useState(amount)
    //estado local con amount
    //handle submit ejecuta action para cambiar amount en db 

    return (
          <div>
            <Link to= {`/DetailBeer/${postId}`}>
                <li>
                    <h1>{postTitle}</h1>
                    <span>{description}</span>
                </li>          
            </Link>
            <button >➕</button>
            <p>{amount}</p>
            <p>{countable.price}</p>
            <p>{countable.discount}</p>
            <button >➖</button>
          </div>
    )
}

export default PostinCart;