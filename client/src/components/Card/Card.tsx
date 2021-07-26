import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDetail, getFavoritePosts, Post } from "../../actions";
import Style from "./Card.module.css";
import axios from "axios";
import { RootState } from "../../reducers";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";

interface Favorites {
  post: Post;
}

const Card = ({
  title,
  id,
  price,
  image,
  rating,
  discount,
  ibu,
  abv,
  description,
}) => {
  const favorites: Favorites[] = useSelector(
    (state: RootState) => state.favoritePosts
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(
    favorites.some((post) => post.post.id === Number(id))
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchDetail = async () => {
    await dispatch(getDetail(id));
    history.push(`/detailBeer/${id}`);
  };

  async function addToFavorite() {


    await axios.post(`${process.env.REACT_APP_HOST_BACKEND}/addFavorite`, {
      data: { username: `TestUser`, postId: id },
    }, { headers: validationHeadersGenerator() });
    dispatch(getFavoritePosts("TestUser"));
    setIsFavorite(true);
  }

  async function removeFavorite() {
    await axios.delete(`${process.env.REACT_APP_HOST_BACKEND}/removeFavorite`, {
      headers: validationHeadersGenerator(),
      data: { username: `TestUser`, postId: id },
    });
    dispatch(getFavoritePosts("TestUser"));
    setIsFavorite(false);
  }

  function shorten(str, maxLen, separator = ' ') {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  }



  return (
    <div className={Style.containerBack}>
      <div className={Style.container}>
        {isFavorite ? (
          //☢ Bug en agregar/remover de favoritos: al refrescar la pagina se rompe si queres agregar la misma. -Eze
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
        <button
          onClick={fetchDetail}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <img className={Style.image} alt="" src={image}></img>
          <div className={Style.info}>
            {discount !== 0 ? (
              <>
                <p className={Style.originalPrice}>${price}</p>
                <p className={Style.discount}> {discount}% OFF </p>
              </>
            ) : null}
            {discount !== 0 ? (
              <p className={Style.price}>
                $ {(price - price * (discount / 100)).toFixed(2)}
              </p>
            ) : (
              <p className={Style.price}>${price}</p>
            )}
            <h2 className={Style.title}>{title.toUpperCase()}</h2>
            <div className={Style.props}>
              <p className={Style.stars}> {"⭐".repeat(rating)} </p>
              <div className={Style.numbers}>
                <div className={Style.numberColum}>
                  <p> IBU: </p>
                  <p> {ibu} </p>
                </div>
                <div className={Style.numberColum}>
                  <p> ABV: </p>
                  <p> {abv}% </p>
                </div>
                <div className={Style.numberColum}>
                  <p> OG: </p>
                  <p> {ibu} </p>
                </div>
              </div>
              <div className={Style.description}>{shorten(description, 110)}...</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Card;

