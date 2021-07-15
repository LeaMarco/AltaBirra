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
  let cartIdparsed = parseInt(id, 10);

  useEffect(() => {
    dispatch(getCart(id));
    generarboton(carts)
  });

  //armar array de items

  async function despachadora(id) {
    await deleteAllCart(id);
    dispatch(getCart(id));
  }
  async function generarboton(carts) {
    if (Array.isArray(carts)) {
      await carts.map(post => {
        let item = {
          "description": post.post.title,
          "quantity": post.amount,
          "unit_price": 2
        };
        items.push(item)
      })
      merpa(items)
    }
    else {
      console.log("Perate");
    }
  }

  let items: any = [];

  return (
    <div>
      {/* {useScript()} */}
      <ul>
        {Array.isArray(carts) ? (
          carts.map((post) => (
            <PostinCart username={post.cart?.userId.username} cartId={id} postId={post.post.id} postTitle={post.post.title} description={post.post.description} amount={post.amount} countable={post.post.countable} />
          ))
        ) : (
          <p>No hay posts</p>
        )
        }
      </ul>
      <button onClick={(e) => despachadora(cartIdparsed)}> BORROTODO</button>
    </div >
  );
}

const urldeleteallcart = "http://localhost:3001/deleteAllCart";
async function deleteAllCart(data) {
  console.log(data, "data deleteallcart")
  const response = await axios.delete<cart[]>(urldeleteallcart, { data: { data } });
  return response;
}

const urlmp = "http://localhost:3001/checkout/";
async function merpa(data) {
  console.log(data, "data MERPA")
  const response = await axios.post<object>(urlmp, { data: { data } });
  return response;
}

function useScript(idPreferencia) {
  useEffect(() => {
    var script = document.createElement("script");
    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = "30499530-adebedfe-5388-46d1-bfe2-c370ec579da8";
    let a = document.getElementById("button-checkout")
    if (a) a.innerHTML = "";
    if (a) a.appendChild(script);
  })
}

export default Cart;