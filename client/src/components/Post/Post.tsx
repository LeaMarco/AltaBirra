import React from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { CreatePostAction, PostValues } from "../../actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { createPost } from "../../actions";

export default function Post() {
//   const dispatch = useDispatch();
  const dispatch = useDispatch<Dispatch<any>>();

  const { register, handleSubmit } = useForm<PostValues>();
  const onSubmit: SubmitHandler<PostValues> = (data) => { let value = transformer(data); dispatch(createPost(value))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {console.log(register,"register Post")}
      <div className="Post--form--beer">
        <input {...register("beer.name")} placeholder="Beer Name" />
        <input {...register("beer.abv")}  type="number"  placeholder="Beer Abv" />
        <input {...register("beer.og")} type="number" placeholder="Beer Og" />
        <input {...register("beer.ibu")} type="number" placeholder="Beer Ibu" />
        <input {...register("beer.calories")} type="number" placeholder="Beer Calories" />
        <input {...register("beer.dryHop")} type="boolean" placeholder="Beer DryHop" />
        <input {...register("beer.volume")} type="number" placeholder="Beer Volume" />
        <input {...register("beer.genericType")} placeholder="Beer Generic Type"/>
        <input {...register("beer.specificType")} placeholder="Beer Specific Type"/>
      </div>
      <div className="Post--form--infoPost">
        <input {...register("infoPost.title")} placeholder="InfoPost Title" />
        <input
          {...register("infoPost.description")}
          placeholder="InfoPost Description"
        />
        <input {...register("infoPost.image")} placeholder="InfoPost Image" />
        <input type="number" {...register("infoPost.stock")} placeholder="InfoPost Stock" />
        <input {...register("infoPost.rating")} type="number" placeholder="InfoPost Rating" />
        <input {...register("infoPost.shipping")} type="number" placeholder="InfoPost Shipping"/>
        <input {...register("infoPost.visibility")} type="boolean" placeholder="InfoPost Visibility"/>
        <input {...register("infoPost.username")} placeholder="InfoPost Username"/>
      </div>
      <div className="Post--form--countable">
        <input {...register("countable.price")} type="number" placeholder="Countable Price" />
        <input {...register("countable.discount")} type="number" placeholder="Countable Discount"/>
      </div>
      <input type="submit" />
    </form>
  );
}


function transformer(data){
  let datacopy=data;
  //beer
  datacopy.beer.abv = parseInt(datacopy.beer.abv,10)
  datacopy.beer.og = parseInt(datacopy.beer.og,10)
  datacopy.beer.ibu = parseInt(datacopy.beer.ibu,10)
  datacopy.beer.calories = parseInt(datacopy.beer.calories,10)
  datacopy.beer.volume = parseInt(datacopy.beer.volume,10)
  datacopy.beer.dryHop = "true" ? true : false;
  //infopost
  datacopy.infoPost.shipping = "true" ? true : false;
  datacopy.infoPost.visibility = "true" ? true : false;
  datacopy.infoPost.rating = parseInt(datacopy.infoPost.rating,10)
  datacopy.infoPost.stock = parseInt(datacopy.infoPost.stock,10)
  //countables
  datacopy.countable.price = parseInt(datacopy.countable.price,10)
  datacopy.countable.discount = parseInt(datacopy.countable.discount,10)
};