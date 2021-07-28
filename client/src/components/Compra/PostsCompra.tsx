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
  pickupdir,
  countable,
  cartId,
  username,
}) {
  const [estado, setEstado] = useState({ "pickup": false, "envio": false });
  const [buyerdir, setBuyerdir] = useState({ dir: "" });
  console.log(buyerdir, "estado PostsCompra")

  let checkboxClick = (e) => {
    let { name, checked } = e.target;
    setEstado({
      ...estado,
      [name]: checked,
    });
  };
  let handlebuyerdir = (e) => {
    let { name, value } = e.target;
    setBuyerdir({
      ...buyerdir,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style.itemCarrito}>
      <div>
        <h1 className={style.title}>{postTitle}</h1>
        <span>{description.slice(0, 50)}...</span>
        <br />
        <label>Pick Up</label>
        <input name="pickup" checked={estado.pickup} onChange={checkboxClick} type="checkbox" />
        <label>Envio</label>
        <input name="envio" checked={estado.envio} onChange={(e) => checkboxClick(e)} type="checkbox" />
        <div>
          {(estado.pickup) ?
            <div>
              <div>
                <label>Direccion y Horarios: {pickupdir} </label>
              </div>
            </div> : null}
        </div>
        <div>
          {(estado.envio) ?
            <div>
              <div>
                <label>Ingresa tu dirección</label>
                <input name="dir" value={buyerdir.dir} onChange={handlebuyerdir} type="text" autoComplete="off" />
              </div>
            </div> : null}
        </div>
      </div>
      <p>Cantidad: {amount}</p>
      <p>Total: ${(countable.price * amount).toFixed(2)}</p>
    </div>
  );
}

export default PostsCompra;
