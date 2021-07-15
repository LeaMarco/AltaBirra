import React, { useEffect, useState} from "react";
import { useParams,Link } from "react-router-dom";
// import {removeToCart,addToCart} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

export function PostinCart({postId,postTitle,description,amount,countable}) {
    
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(amount)

     useEffect(() => {
        addToCart(
            {postId,quantity,username:"TestUser"}
        );
     }, [quantity]);

    let obj = {
        "postId":5,
        "username":"TestUser"
    }
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
            <button onClick={(e) => setQuantity(quantity+1)}>➕</button>
            <p>Amount: {quantity}</p>
            <p>{countable.price * quantity}</p>
            <p>{countable.discount}</p>
            <button onClick={(e) => quantity>1 ? setQuantity(quantity-1) : alert("Del piso no paso")}>➖</button>
            <button onClick={(e) => removeToCart({"username":"TestUser","postId":3})}>❌</button>
          </div>
    )
}

export default PostinCart;

export interface PostValues {
	beer: {
		name: string;
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

const urlremovetocart = 'http://localhost:3001/removeToCart';
const urladdtocart = 'http://localhost:3001/cart';


async function addToCart (data:any){
        const response = await axios.put<PostValues>(urladdtocart, { params: data });
        return response;
};
async function removeToCart (data:any){
        const response = await axios.delete<PostValues>(urlremovetocart, { params: data });
        return response;
};