import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, cart, PostValues } from "../../actions";
import axios from "axios";

export function PostsCompra({
    postId,
    postTitle,
    description,
    amount,
    countable,
    cartId,
    username,
}) {

    //estado local con amount
    //handle submit ejecuta action para cambiar amount en db
    return (
        <div>
            <li>
                <h1>{postTitle}</h1>
                <span>{description}</span>
            </li>
            <p>Amount: {amount}</p>
            <p>{countable.price * amount}</p>
            <p>{countable.discount}</p>
        </div>
    );
}

export default PostsCompra;
