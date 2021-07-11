import React from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { CreatePostAction, PostValues } from "../../actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { createPost } from "../../actions";
import transformer from "./FormatData";

export default function Post() {
//   const dispatch = useDispatch();
  const dispatch = useDispatch<Dispatch<any>>();

  let cervezadeprueba={
    "beer": {
    "name": "asd",
    "abv": 1,
    "og": 1,
    "ibu": 1,
    "calories": 1,
    "dryHop": false,
    "volume": 1,
    "genericType": "Rubia",
    "specificType": "Duvel"
    },
    "infoPost": {
    "title": "asd",
    "description": "asd",
    "image": "asd",
    "rating": 1,
    "stock": 1,
    "shipping": false,
    "visibility": true,
    "username": "TestUser"
    },
    "countable": {
    "price": 1, 
    "discount": 1
    }
}
  const { register, handleSubmit } = useForm<PostValues>();
  
  const onSubmit: SubmitHandler<PostValues> = (data) => {console.log(transformer(data),"DATAAAA");dispatch(createPost(transformer(data)))}

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
        {/* <input {...register("infoPost.username")} placeholder="InfoPost Username"/> */}
      </div>
      <div className="Post--form--countable">
        <input {...register("countable.price")} type="number" placeholder="Countable Price" />
        <input {...register("countable.discount")} type="number" placeholder="Countable Discount"/>
      </div>
      <input type="submit" />
    </form>
  );
}

