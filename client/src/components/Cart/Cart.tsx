import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RootState } from "../../reducers/index";
import { useDispatch, useSelector } from "react-redux";
import { cart, getCart } from "../../actions";
import { PostinCart } from "../postInCart/PostInCart";
import axios from 'axios';
import Swal from "sweetalert2";


function Cart() {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const carts: any = useSelector((state: RootState) => state.cart);
  const [merpastate, setMerpa] = useState("");


  let cartIdparsed = parseInt(id, 10);

  useEffect(() => {
    dispatch(getCart(id));
  }, []);

  async function despachadora(id) {
    await deleteAllCart(id);
    dispatch(getCart(id));
  }
  function deleteConfirm(id) {
    Swal.fire({
      title: '¿Seguro de borrar todo tu carrito?',
      text: "No se puede revertir...",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar Todo'
    }).then((result) => {
      if (result.isConfirmed) {
        despachadora(id)
        Swal.fire(
          '¡Borrado!',
          'Se limpió tu carrito',
          'success'
        )
      }
    })
  }

  return (
    <div>
      <div id="button-checkout"></div>
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
      <button onClick={(e) => deleteConfirm(cartIdparsed)}> Limpiar carrito</button>
      <Link to={`/compra/${id}`}>Comprar</Link>
    </div >
  );
}

const urldeleteallcart = "http://localhost:3001/deleteAllCart";
async function deleteAllCart(data) {
  const response = await axios.delete<cart[]>(urldeleteallcart, { data: { data } });
  return response;
}



export default Cart;