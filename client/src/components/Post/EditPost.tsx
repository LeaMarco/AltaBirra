import React from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { CreatePostAction, PostValues } from "../../actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { editPost } from "../../actions";
import {transformEdit} from "./FormatData";

export default function EditPost() {
//   const dispatch = useDispatch();
  const dispatch = useDispatch<Dispatch<any>>();

  const { register, handleSubmit } = useForm<PostValues>();
  
  const onSubmit: SubmitHandler<PostValues> = (data) => dispatch(editPost(transformEdit(data)))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {console.log(register,"register Post")}
      <h1>EDIT POST</h1>
      <div className="Post--form--beer">
        Name:
        <input {...register("beer.name")} placeholder="Beer Name" />
        Abv:
        <input {...register("beer.abv")}  type="number"  placeholder="Beer Abv" />
        Og:
        <input {...register("beer.og")} type="number" placeholder="Beer Og" />
        Ibu:
        <input {...register("beer.ibu")} type="number" placeholder="Beer Ibu" />
        Calories:
        <input {...register("beer.calories")} type="number" placeholder="Beer Calories" />
        DryHop:
        <input {...register("beer.dryHop")} type="boolean" placeholder="Beer DryHop" />
        Volume:
        <input {...register("beer.volume")} type="number" placeholder="Beer Volume" />
        Colour:
        <input {...register("beer.genericType")} placeholder="Beer Generic Type"/>
        Type:
        <input {...register("beer.specificType")} placeholder="Beer Specific Type"/>
      </div>
      <br/>
      <br/>
      <div className="Post--form--infoPost">
        Post title:
        <input {...register("infoPost.title")} placeholder="InfoPost Title" />
        Decription:
        <input
          {...register("infoPost.description")}
          placeholder="InfoPost Description"
        />
        
        Stock:
        <input type="number" {...register("infoPost.stock")} placeholder="InfoPost Stock" />
        Shipping?:
        <input {...register("infoPost.shipping")} type="number" placeholder="InfoPost Shipping"/>
        Visibility?:
        <input {...register("infoPost.visibility")} type="boolean" placeholder="InfoPost Visibility"/>
        {/* <input {...register("infoPost.username")} placeholder="InfoPost Username"/> */}
      </div>
      <br/>
      <br/>
      <div className="Post--form--countable">
        Price:
        <input {...register("countable.price")} type="number" placeholder="Countable Price" />
        Discount:
        <input {...register("countable.discount")} type="number" placeholder="Countable Discount"/>
      </div>
      <input type="submit" />
    </form>
  );
}

