import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { cart, getCart } from "../../actions";
import { RootState } from "../../reducers/index";
import axios from 'axios';
import { PostsCompra } from "./PostsCompra";



export function Compra() {
    const dispatch = useDispatch();
    const { id }: any = useParams();
    const carts: any = useSelector((state: RootState) => state.cart);
    const [merpastate, setMerpa] = useState("");
    useScript(merpastate)
    
    useEffect(() => {
        dispatch(getCart(id));
    }, []);

    useEffect(() => {
        if (carts) generarboton(carts)
    }, [id]);

    return (
        <div>
            <ul>
                {Array.isArray(carts) ? (
                    carts.map((post) => (
                        <div>
                            <PostsCompra username={post.cart?.userId.username} cartId={id} postId={post.post.id} postTitle={post.post.title} description={post.post.description} amount={post.amount} countable={post.post.countable} />
                        </div>
                    ))
                ) : (
                    <p>No hay posts</p>
                )
                }
            </ul>
            <div id="button-checkout"></div>
            <Link to={`/cart/${id}`}>Volver para atras</Link>
        </div >
    )
    async function generarboton(carts) {
        if (Array.isArray(carts)) {
            let items: any = [];
            await carts.map(post => {
                let item = {
                    "description": post.post.title,
                    "quantity": post.amount,
                    "unit_price": post.post.countable.price
                };
                items.push(item)
            })
            let merparesponse = await merpa(items);
            setMerpa(merparesponse)
        }
        else {
            console.log("sin carts");
        }
    }

    async function merpa(data) {
        const response = await axios.post("http://localhost:3001/checkout", { data: { data } });
        return response.data.id;
    }

    function useScript(idPreferencia) {
        var script = document.createElement("script");
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = idPreferencia;
        let a = document.getElementById("button-checkout")
        if (a) a.innerHTML = "";
        if (a) a.appendChild(script);
    }

}
export default Compra