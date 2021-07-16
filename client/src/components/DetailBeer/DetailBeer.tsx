import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import {
  getCart,
  getDetail,
  getFavoritePosts,
  Post,
} from "../../actions/index";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Style from "./Detail.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Beer from "../Beer/Beer";

interface Favorites {
  post: Post;
}

export default function DetailBeer() {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const info: any = useSelector((state: RootState) => state.detailPosts);
  const favorites: Favorites[] = useSelector(
    (state: RootState) => state.favoritePosts
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(
    favorites.some((post) => post.post.id === Number(id))
  );
  const [cantidad, setCantidad] = useState(1);
  const history = useHistory();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  async function addToFavorite() {
    await axios.post("http://localhost:3001/addFavorite", {
      data: { username: "TestUser", postId: id },
    });
    dispatch(getFavoritePosts("TestUser"));
    setIsFavorite(true);
  }

  const addToCart = async () => {
    const response = await axios.put(`http://localhost:3001/addToCart`, {
      params: {
        username: "TestUser",
        postId: parseInt(id),
        quantity: cantidad,
      },
    });
    return response.data;
  };

  async function removeFavorite() {
    await axios.delete("http://localhost:3001/removeFavorite", {
      data: { username: "TestUser", postId: id },
    });
    dispatch(getFavoritePosts("TestUser"));
    setIsFavorite(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await addToCart();
    await getCart(id);
    history.push(`/compra/1`); ///////////FALTA CARGAR EL ID DEL USUARIO QUE ESTÉ EN LA PÁGINA
  };

  return (
    <div style={{ backgroundColor: "grey", width: "100%", height: "100%" }}>
      {!Object.keys(info).length ? (
        <div style={{ backgroundColor: "grey", width: "100%", height: "100%" }}>
          compra birra
        </div>
      ) : (
        <div className={Style.post}>
          <hr />
          {isFavorite ? (
            <button onClick={removeFavorite} className={Style.unfav}>
              {" "}
              ❤{" "}
            </button>
          ) : (
            <button onClick={addToFavorite} className={Style.fav}>
              {" "}
              ❤{" "}
            </button>
          )}
          <img src={info.image} alt="La imagen no esta disponible" />
          <div id="post">
            <div>
              <hr />
              <div>
                <h1>{info.title}</h1>
                <div>
                  <p>
                    Nombre: {info.beer.name} ibu: {info.beer.ibu}
                  </p>
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
                <p>
                  Descripcion del tipo {info.beer.genericType.type}:{" "}
                  {info.beer.genericType.description}
                </p>
                <hr />
                <p>Estilo de Cerveza: {info.beer.specificType.type}</p>
                <p>
                  Descripcion del Estilo {info.beer.specificType.type}:{" "}
                  {info.beer.specificType.description}
                </p>
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
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    placeholder="cantidad"
                    type="number"
                    defaultValue="1"
                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                  />
                  <button type="submit">Comprar!</button>
                </form>
                <button
                  onClick={async () => {
                    MySwal.fire({
                      position: "center",
                      icon: "success",
                      title: await addToCart(),
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }}
                >
                  Agregar al Carrito
                </button>
                <div>
                  Compartir
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href={`http://twitter.com/share?text=Me gusta la ${info.beer.name} de AltaBirra &url=${window.location.href}`}
                    >
                      <img
                        src="https://img.icons8.com/color/452/twitter--v1.png"
                        width="30px"
                      />
                    </a>
                    <a
                      href={`http://www.facebook.com/sharer.php?u=${window.location.href}`}
                    >
                      <img
                        src="https://img1.freepng.es/20171221/wgw/facebook-picture-5a3c060eccfa84.1675788915138831508396.jpg"
                        width="25px"
                      />
                    </a>
                    <a href={`https://wa.me/?text=${window.location.href}`}>
                      <img
                        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                        width="30px"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
