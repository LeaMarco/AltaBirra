import React, { useEffect, useState} from "react";
import { useParams,Link } from "react-router-dom";
import { RootState } from "../../reducers/index";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../actions";
import {PostinCart} from "../PostinCart/PostinCart"


function Cart() {
    
    const dispatch = useDispatch();
    const { id }: any = useParams();
    const carts: any = useSelector((state: RootState) => state.cart);
    console.log(carts,"carts")



  useEffect(() => {
    dispatch(getCart(id));
  }, []);



  return (
    <ul>
      {Array.isArray(carts) ? (
        carts.map((post) => (
          <PostinCart postId={post.post.id} postTitle={post.post.title} description={post.post.description} amount={post.amount} countable={post.post.countable}/>
        ))
      ) : (
        <p>No hay posts</p>
      )}
    </ul>
  );
}

export default Cart;