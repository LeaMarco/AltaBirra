import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RootState } from "../../reducers/index";
import { useDispatch, useSelector } from "react-redux";
import { cart, getCart } from "../../actions";
import { PostinCart } from "../postInCart/PostInCart";
import axios from 'axios';
import Swal from "sweetalert2";
import styles from './Cart.module.css';
import { validationHeadersGenerator } from "../../validationHeadersGenerator";


function Cart() {
  const haveToken = Object.keys(localStorage).join().includes("token")
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const cartsRegisterUser: any = useSelector((state: RootState) => state.cart);
  const [cartsGuestUser, setCartsGuestUser] = useState<any[]>()

  const deleteGuestItem = (postIdDelete: number) => {
    if (cartsGuestUser) {
      let newCartsGuestUser = [...cartsGuestUser].filter(e => e.post.id != postIdDelete)
      setCartsGuestUser(newCartsGuestUser)
    }

  }



  const [merpastate, setMerpa] = useState("");

  let cartIdparsed = parseInt(id, 10);



  useEffect(() => {
    //Solo si tiene un token de validacion realiza la llamada, sino, no hace nada
    if (haveToken) dispatch(getCart(id));
    // else getGuestCartPosts()

    else axios
      .get(`${process.env.REACT_APP_HOST_BACKEND}/getMultiplePostByIds`, { params: { guestsItemsInCart: localStorage.guestsItemsInCart } })
      .then(response => {
        setCartsGuestUser(response.data)
      })

    //O tiene un token, o tiene el carrito, el carrito se elimina al loguearse o registrare, ya que se carga a la base de datos

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

        if (haveToken) {
          despachadora(id)
          Swal.fire(
            '¡Borrado!',
            '¡Se limpió tu carrito!',
            'success'
          )
        }

        else {
          setCartsGuestUser([])
          localStorage.removeItem("guestsItemsInCart")
          Swal.fire(
            '¡Borrado!',
            '¡Se limpió tu carrito de invitado!',
            'success'
          )
        }

      }


    })

  }
  // console.log(cartsGuestUser, !haveToken && Array.isArray(cartsGuestUser) && cartsGuestUser?.length > 0)
  return (
    <div className={styles.cartContainer}>
      {/* <div id="button-checkout"></div> */}
      <div className={styles.cart}>
        {
          haveToken && Array.isArray(cartsRegisterUser) && cartsRegisterUser.length > 0 ? (
            cartsRegisterUser.map((post) => (
              <PostinCart pickupdir={post.post.pickupdir} username={post.cart?.userId.username} cartId={id} postId={post.post.id} postTitle={post.post.title} description={post.post.description} amount={post.amount} countable={post.post.countable} />
            ))
          )
            :
            !haveToken && Array.isArray(cartsGuestUser) && cartsGuestUser?.length > 0 ? (
              cartsGuestUser.map(item => (
                <PostinCart pickupdir={item.post.pickupdir} username={item.cart?.userId.username} cartId={id} postId={item.post.id} postTitle={item.post.title} description={item.post.description} amount={item.amount} countable={item.post.countable} deleteGuestItem={deleteGuestItem} />
              ))
            )
              :
              (
                <p className={styles.emptyCart}>¡Mi copa esta vacia y tu carrito también!</p>
              )
        }
      </div>
      <div>
        {
          haveToken && Array.isArray(cartsRegisterUser) && cartsRegisterUser.length > 0 ?

            <div> <Link className={styles.Link} to={`/compra/${id}`}>Comprar</Link>
              <button className={styles.deleteButton} onClick={(e) => deleteConfirm(cartIdparsed)}> Limpiar carrito</button>
            </div>

            :
            !haveToken && Array.isArray(cartsGuestUser) && cartsGuestUser?.length > 0 ?
              <div>
                <button onClick={() => alert("Debe ingresar primero!")} className={styles.Link} >Comprar</button>
                <button className={styles.deleteButton} onClick={(e) => deleteConfirm(cartIdparsed)}> Limpiar carrito</button>
              </div>
              : ""

        }
      </div>

    </div >
  );
}

const urldeleteallcart = `${process.env.REACT_APP_HOST_BACKEND}/deleteAllCart`;
async function deleteAllCart(data) {
  //☢ Posible error aca, documentacion ambigua sobre pasaje de headers por axios.delete -Ezequiel, Raccon City 1997.
  console.log("delete")
  const response = await axios.delete<cart[]>(urldeleteallcart, { headers: validationHeadersGenerator(), data: { data } });
  return response;
}



export default Cart;