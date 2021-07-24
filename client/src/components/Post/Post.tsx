import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, UseFormRegister, Controller } from "react-hook-form";
import { CreatePostAction, PostValues } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createPost, searchTypes } from "../../actions";
import transformer from "./FormatData";
import styles from './Post.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Post() {
  const [estado, setEstado] = useState({ "checked": false });
  const [generic, setGeneric] = useState([]);
  const [specific, setSpecific] = useState([]);


  let checkboxClick = (e) => {
    let { name, checked } = e.target;
    setEstado({
      ...estado,
      [name]: checked,
    });
  };


  // const usersPremium = useSelector((state) => state["usersPremium"]);
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch<Dispatch<any>>();

  async function getBeerTypes() {
    let respuesta = await dispatch(searchTypes())
    setGeneric(respuesta[0])
    setSpecific(respuesta[1])
  }
  useEffect(() => {
    getBeerTypes();
  }, [dispatch])

  async function despachadora(data) {
    console.log(data)
    let save = await dispatch(createPost(transformer(data)))
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post creado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se ha podido crear el Post :( Intenta nuevamente!',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  const { register, handleSubmit, reset } = useForm<PostValues>();
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data); reset() }

  return (
    <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
      <section className={styles.postFormBeer}>
        <h3 id={styles["beerh2"]}> Beer</h3>
        <div className={styles.row1}>
          <div className={styles.container} id={styles["name"]}>
            <input {...register("beer.name")} autoComplete="off" className={styles.input} required />
            <label>Beer Name *</label>
            <span className={styles.focusBorder}></span>
          </div>
          <div className={styles.container}>
            <input {...register("beer.abv")} type="number" min="1" autoComplete="off" className={styles.input} required />
            <label>Abv *</label>
            <span className={styles.focusBorder}></span>
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.container}>
            <input {...register("beer.og")} type="number" min="1" autoComplete="off" className={styles.input} />
            <label>OG </label>
            <span className={styles.focusBorder}></span>
          </div>
          <div className={styles.container}>
            <input {...register("beer.ibu")} type="number" min="1" autoComplete="off" className={styles.input} required />
            <label>IBU *</label>
            <span className={styles.focusBorder}></span>
          </div>
        </div>
        <div className={styles.row3}>
          <div className={styles.container}>
            <input {...register("beer.calories")} type="number" min="1" autoComplete="off" className={styles.input} />
            <label>Calories</label>
            <span className={styles.focusBorder}></span>
          </div>
          <div className={styles.container}>
            <input {...register("beer.volume")} type="number" min="1" autoComplete="off" className={styles.input} required />
            <label>Volume *</label>
            <span className={styles.focusBorder}></span>
          </div>
        </div>
        <div className={styles.row4}>
          <div className={styles.genericType}>
            <label>Generic Type</label>
            <select {...register("beer.genericType")}>
              {generic && generic.map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.specificType}>
            <label>Specific Type</label>
            <select {...register("beer.specificType")}>
              {specific && specific.map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.beerCheckbox}>
          <label>DryHop</label>
          <input {...register("beer.dryHop")} type="checkbox" />
        </div>
      </section>
      <section className={styles.postFormInfoPost}>
        <h3>Post Info</h3>
        <div className={styles.container}>
          <input {...register("infoPost.title")} autoComplete="off" className={styles.input} required />
          <label>Post Title *</label>
          <span className={styles.focusBorder}></span>
        </div>
        <div className={styles.postrow1}>
          <div className={styles.container}>
            <input {...register("infoPost.stock")} type="number" min="1" autoComplete="off" className={styles.input} required />
            <label>Stock *</label>
            <span className={styles.focusBorder}></span>
          </div>
          <div className={styles.InfoPostCheckboxes}>
            <label>Shipping</label>
            <input {...register("infoPost.shipping")} type="checkbox" />
            <label>Visibility</label>
            <input {...register("infoPost.visibility")} type="checkbox" />
          </div>
        </div>
        <div className={styles.container}>
          <textarea {...register("infoPost.description")} autoComplete="off" className={styles.input} required />
          <label>Description *</label>
          <span className={styles.focusBorder}></span>
        </div>
      </section>
      <section className={styles.postFormCountable}>
        <h3>Countables</h3>
        <div className={styles.countablerow}>
          <div className={styles.container}>
            <input {...register("countable.price")} type="number" min="1" autoComplete="off" className={styles.input} required />
            <label>Price *</label>
            <span className={styles.focusBorder}></span>
          </div>
        </div>
      </section>
      Decuento?
      <input name="checked" type="checkbox" checked={estado.checked} onChange={checkboxClick} />
      <div>
        {estado.checked ?
          <div>
            <div className={styles.container}>
              <input {...register("countable.discount")} type="number" min="1" autoComplete="off" className={styles.input} required />
              <label>Discount *</label>
              <span className={styles.focusBorder}></span>
            </div>
            <p>Fecha Expiracion del Descuento</p>
            <input {...register("date")} type="date" required />
          </div> : <p>Sin oferta? ratón</p>}
      </div>
      <div className={styles.submitButton}>
        <input className={styles.postFormSubmitButton} type="submit" />
      </div>
    </form>
  );
}

