import PostComponent from "../Post/Post";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "../../reducers";
import { Post } from "../../actions/index";
import Style from "./Posts.module.css";

const Posts = () => {
  const searchedPosts: Post[] = useSelector((state: RootState) => state.searchedPosts);
  return (
    <div className={Style.container}>
      {
        typeof searchedPosts === "object"
          ? searchedPosts?.map(post => (
            <PostComponent
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.image}
              rating={post.rating}
              price={post.price}
              discount={post.discount}
              ibu={post.ibu}
              abv={post.abv}
            />))
          : <img src="https://i.stack.imgur.com/MnyxU.gif" alt="loading" width="3%" height="3%" />
      }
    </div>
  );
};

export default Posts;
