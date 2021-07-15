import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RootState } from "../../reducers/index";
import { useDispatch, useSelector } from "react-redux";
import { cart, getCart } from "../../actions";
import { PostinCart } from "../postInCart/PostInCart";
import axios from 'axios';



function Cart() {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const carts: any = useSelector((state: RootState) => state.cart);
  console.log(id, "IDDDDDDDDDDDDDDDD")
  // let cartIdparsed = parseInt(id, 10);
  useEffect(() => {
    dispatch(getCart(id));
  }, []);

  async function despachadora(id) {
    await deleteAllCart(1);
    dispatch(getCart(1));
  }

  return (
    <div>
      <ul>
        {Array.isArray(carts) ? (
          carts.map((post) => (
            <PostinCart username={post.cart?.userId.username} cartId={id} postId={post.post.id} postTitle={post.post.title} description={post.post.description} amount={post.amount} countable={post.post.countable} />
          ))
        ) : (
          <p>No hay posts</p>
        )}
      </ul>
      <button onClick={(e) => despachadora(id)}> BORROTODO</button>
    </div >
  );
}

const urldeleteallcart = "http://localhost:3001/deleteAllCart";
async function deleteAllCart(data) {
  console.log(data, "data deleteallcart")
  const response = await axios.delete<cart[]>(urldeleteallcart, { data: { data } });
  return response;
}



export default Cart;