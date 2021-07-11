import React from "react";
// import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { CreatePostAction, PostValues } from "../../actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { createPost } from "../../actions";

export default function Post() {
//   const dispatch = useDispatch();
  const dispatch = useDispatch<Dispatch<any>>();

  const { register, handleSubmit } = useForm({
  });
  const onSubmit: SubmitHandler<PostValues> = (data) => dispatch(createPost(data));
  //CreatePostAction diferencia de tipos con register

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {console.log(register,"register Post")}
      <div className="Post--form--beer">
        <input {...register("beer.name")} placeholder="Beer Name" />
        <input {...register("beer.abv")}  type="number"  placeholder="Beer Abv" />
        <input type="number" {...register} onChange={(e) => { register.onChange(parseInt(e.target.value, 10));}}/>
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
