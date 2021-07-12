import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import { getDetail } from "../../actions/index"
import { useParams } from "react-router-dom";

export default  function DetailBeer() {

    const dispatch = useDispatch();
    const { id }: any = useParams();

    const info: any = useSelector((state: RootState) =>  state.detailPosts)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch]);

    return (
        <div id="Post">
            <hr />
            <img src={info.image} alt="La imagen no esta disponible" />
            {console.log(info)}
            <div id="post">
                <div>
                    <hr />
                    <div>
                        <h1>{info.title}</h1>
                        <div>
                            <p>Nombre: {info.beer.name} ibu: {info.beer.ibu}</p>
                            <p>abv: {info.beer.abv}</p>
                            <p>Cal: {info.beer.calories}</p>
                            <p>Rating:{info.rating}</p>
                        </div>
                        <p>description:{info.description}</p>
                    </div>
                    <hr />
                    <div>
                        <h3>Info Cerveza</h3>
                        <p>Tipo De Cerveza: {info.beer.genericType.type}</p> 
                        <p>Descripcion del tipo {info.beer.genericType.type}: {info.beer.genericType.description}</p>
                        <hr />
                        <p>Estilo de Cerveza: {info.beer.specificType.type}</p>
                        <p>Descripcion del Estilo {info.beer.specificType.type}: {info.beer.specificType.description}</p>
                    </div>
                    <hr />
                    <div>
                        <h3>Info De Compra</h3>
                        <p>Descuento : ${info.countable.discount}</p>
                        <div>
                            <p>Precio Total : ${info.countable.price} </p>
                        </div>
                    </div>
                    <div>
                        <p>Boton "Comprar"</p>
                        <p>Boton "Agregar Al Carrito"</p>
                    </div>
                </div>
            </div>  
        </div>
    )
}