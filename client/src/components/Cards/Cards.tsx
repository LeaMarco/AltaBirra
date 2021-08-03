import Card from "../Card/Card";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "../../reducers";
import { Post } from "../../actions/index";
import Style from "./Cards.module.css";
import BeerLoading from "../BeerLoading/BeerLoading";

const Posts = () => {
  const searchedPosts: Post[] = useSelector((state: RootState) => state.searchedPosts);
  return (
    <div className={Style.container} style={{ border: "4px solid white" }}>
      {
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
              description={post.description}
            />))
          : <BeerLoading />
      }
    </div>
  );
};

export default Posts;
