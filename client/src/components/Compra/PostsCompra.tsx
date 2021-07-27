import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, cart, PostValues } from "../../actions";
import axios from "axios";
import style from './PostsCompra.module.css';

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
        <div className={style.itemCarrito}>
            <div>
                <h1 className={style.title}>{postTitle}</h1>
                <span>{description.slice(0, 50)}...</span>
            </div>
            <p>Cantidad: {amount}</p>
            <p>Total: ${(countable.price * amount).toFixed(2)}</p>
        </div>
    );
}

export default PostsCompra;
