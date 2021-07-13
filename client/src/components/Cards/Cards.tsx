import Card from "../Card/Card";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "../../reducers";
import { Post } from "../../actions/index";
import Style from "./Cards.module.css";

const Posts = () => {
  const searchedPosts: Post[] = useSelector((state: RootState) => state.searchedPosts);
  return (
    <div className={Style.container}>
      {
        // typeof searchedPosts === "object"
        searchedPosts.length
          ? searchedPosts?.map(post => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.image}
              rating={post.rating}
              price={post.countable.price}
              discount={post.countable.discount}
              ibu={post.beer.ibu}
              abv={post.beer.abv}
            />))
          : <h3 style={{ margin: "auto" }}> No hay resultados para esa busqueda </h3>
        // <img src="https://i.stack.imgur.com/MnyxU.gif" alt="loading" width="3%" height="3%" />
      }
    </div>
  );
};

export default Posts;
