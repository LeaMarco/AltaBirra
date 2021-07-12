import React from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { CreatePostAction, PostValues } from "../../actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { createPost } from "../../actions";
import transformer from "./FormatData";
import styles from './Post.module.css'

export default function Post() {
//   const dispatch = useDispatch();
  const dispatch = useDispatch<Dispatch<any>>();

  const { register, handleSubmit } = useForm<PostValues>();
  const onSubmit: SubmitHandler<PostValues> = (data) => dispatch(createPost(transformer(data)))
  return (
    <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.postFormBeer}>
          <h3 id={styles["beerh2"]}> Beer</h3>
            <div className={styles.row1}>
              <div className={styles.container} id={styles["name"]}>
                <input {...register("beer.name")}  autoComplete="off" className={styles.input} required/>
                <label>Beer Name</label>
                <span className={styles.focusBorder}></span>
              </div>
              <div className={styles.container}>
                <input {...register("beer.abv")}  type="number"  autoComplete="off" className={styles.input} required/>
                <label>Abv</label>
                <span className={styles.focusBorder}></span>
              </div>
            </div>
            <div className={styles.row2}>
              <div className={styles.container}>
                <input {...register("beer.og")} type="number"  autoComplete="off" className={styles.input} required/>
                <label>OG</label>
                <span className={styles.focusBorder}></span>
              </div>
              <div className={styles.container}>
                <input {...register("beer.ibu")} type="number"  autoComplete="off" className={styles.input} required/>
                <label>IBU</label>
                <span className={styles.focusBorder}></span>
              </div>
            </div>
            <div className={styles.row3}>
              <div className={styles.container}>
                <input {...register("beer.calories")} type="number"  autoComplete="off" className={styles.input} required/>
                <label>Calories</label>
                <span className={styles.focusBorder}></span>
              </div>
              <div className={styles.container}>
                <input {...register("beer.volume")} type="number"  autoComplete="off" className={styles.input} required/>
                <label>Volume</label>
                <span className={styles.focusBorder}></span>
              </div>
            </div>
            <div className={styles.row4}>
            <div className={styles.container}>
              <input {...register("beer.genericType")} autoComplete="off" className={styles.input} required/>
              <label>Generic Type</label>
              <span className={styles.focusBorder}></span>
            </div>
            <div className={styles.container}>
              <input {...register("beer.specificType")} autoComplete="off" className={styles.input} required/>
              <label>Specific Type</label>
              <span className={styles.focusBorder}></span>
            </div>
            </div>
            <div className={styles.beerCheckbox}>
                <label>DryHop</label>
                <input {...register("beer.dryHop")} type="checkbox"required/>
            </div>
        </section>
      <section className={styles.postFormInfoPost}>
        <h3>Post Info</h3>
        <div className={styles.container}>
          <input {...register("infoPost.title")}  autoComplete="off" className={styles.input} required/>
            <label>Post Title</label>
            <span className={styles.focusBorder}></span>
        </div>
        <div className={styles.postrow1}>
          <div className={styles.container}>
              <input type="number" {...register("infoPost.stock")} autoComplete="off"  className={styles.input} required/>
              <label>Stock</label>
              <span className={styles.focusBorder}></span>
          </div>
          <div className={styles.InfoPostCheckboxes}>
              <label>Shipping</label>
              <input {...register("infoPost.shipping")} type="checkbox"required/>
              <label>Visibility</label>
              <input {...register("infoPost.visibility")} type="checkbox"required/>
          </div>
        </div>
          <div className={styles.container}>
              <textarea {...register("infoPost.description")}  autoComplete="off" className={styles.input} required/>
              <label>Description</label>
              <span className={styles.focusBorder}></span>
          </div>
      </section>
      <section className={styles.postFormCountable}>
        <h3>Countables</h3>
        <div className={styles.countablerow}>
          <div className={styles.container}>
            <input {...register("countable.price")} type="number"  autoComplete="off" className={styles.input} required/>
              <label>Price</label>
              <span className={styles.focusBorder}></span>
          </div>
          <div className={styles.container}>
            <input {...register("countable.discount")} type="number" autoComplete="off" className={styles.input} required/>
              <label>Discount</label>
              <span className={styles.focusBorder}></span>
          </div>
        </div>
      </section>
      <div className={styles.submitButton}>
        <input className={styles.postFormSubmitButton} type="submit" />
      </div>
          {/* <button type="submit" className={styles.btn} >holii</button> */}
    </form>
  );
}

