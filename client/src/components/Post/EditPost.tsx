import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, UseFormRegister, Controller } from "react-hook-form";
import { editPost, EditPostInterface, PostValues } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createPost, searchTypes, getDetail } from "../../actions";
import { transformEdit } from "./FormatData";
import styles from './Post.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from "react-router-dom";
import Preview from "./Preview"
import { RootState } from "../../reducers";
import Beer from "../Beer/Beer";
import axios from 'axios';

//TIENE QUE TOMAR COMO PARAMETRO EL ID DEL POST QUE SE SELECCIONA Y RENDERIZAR EL COMPONENTE DETALLE PASANDOLE ESE ID.
export default function EditPost() {
  const { id }: any = useParams();
  const [generic, setGeneric] = useState([]);
  const [specific, setSpecific] = useState([]);
  const [image, setImage] = useState("");
  console.log(image, "IMAGE STATE")
  const info: any = useSelector((state: RootState) => state.detailPosts);
  const [estado, setEstado] = useState({ "checked": true });

  let checkboxClick = (e) => {
    let { name, checked } = e.target;
    setEstado({
      ...estado,
      [name]: checked,
    });
  };


  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch<Dispatch<any>>();

  async function getBeerTypes() {
    let respuesta = await dispatch(searchTypes())
    setGeneric(respuesta[0])
    setSpecific(respuesta[1])
  }


  useEffect(() => {
    dispatch(getDetail(id));
    getBeerTypes();
  }, [dispatch, image])

  async function imageHandler(event) {
    const file = event.target.files[0];
    event.preventDefault();
    const formData = new FormData()
    formData.append('image', file)
    let response = await axios.post(`${process.env.REACT_APP_HOST_BACKEND}/upload`, formData)
    setImage(`${process.env.REACT_APP_HOST_BACKEND}/upload/` + response.data.filename);
  }


  let dataPrevia
  if (info.beer) {
    dataPrevia = {
      beer: {
        abv: info.beer.abv,
        dryHop: info.beer.dryHop,
        genericType: info.beer.genericType.type,
        ibu: info.beer.ibu,
        volume: info.beer.volume,
        og: info.beer.og,
        specificType: info.beer.specificType.type,
        calories: info.beer.calories,
      },
      infoPost: {
        title: info.title,
        description: info.description,
        image: info.image,
        stock: info.stock,
        shipping: info.shipping,
        visibility: info.visibility,
        username: info.username,
      },
      countable: {
        price: info.countable.price,
        discount: info.countable.discount,
        expireDate: info.countable.expireDate,
      }
    };
  }



  useEffect(() => {
    reset(dataPrevia);
  }, [info])

  //hacer destructuring de generic y specific
  async function despachadora(data, postId, image) {
    let save = await dispatch(editPost(transformEdit(data, postId, image)))
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post modificado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch(getDetail(id))
    } else {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se ha podido modificar el Post :( Intenta nuevamente!',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  const { register, handleSubmit, reset, watch } = useForm({ defaultValues: dataPrevia });
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data, id, image); reset() };


  return dataPrevia?.beer ? (
    <div className={styles.mainContainer}>
      <div>
        <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.postFormBeer}>
            <h3 id={styles["beerh2"]}> Beer</h3>
            <div className={styles.row1}>
              <div className={styles.container} id={styles["name"]}>
                <input {...register("infoPost.title")} autoComplete="off" className={styles.input} required />
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
                <input {...register("beer.og")} type="number" min="1" autoComplete="off" className={styles.input} required />
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
                <input {...register("beer.calories")} type="number" min="1" autoComplete="off" className={styles.input} required />
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
                <label>Generic Type:  </label>
                <select {...register("beer.genericType")} >
                  {generic && generic.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.specificType}>
                <label>Specific Type:  </label>
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
              <input {...register("beer.dryHop")} type="checkbox" className={styles.checkbox} />
            </div>
          </section>
          <section className={styles.postFormInfoPost}>
            <h3>Post Info</h3>
            <div className={styles.postrow1}>
              <div className={styles.container}>
                <input {...register("infoPost.stock")} type="number" min="0" autoComplete="off" className={styles.input} />
                <label>Stock *</label>
                <span className={styles.focusBorder}></span>
              </div>
              <div className={styles.InfoPostCheckboxes}>
                <label>Shipping</label>
                <input {...register("infoPost.shipping")} type="checkbox" className={styles.checkbox} />
                <label>Visibility</label>
                <input {...register("infoPost.visibility")} type="checkbox" className={styles.checkbox} />
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
                <input {...register("countable.price")} type="number" min="1" autoComplete="off" step=".01" className={styles.input} required />
                <label>Price *</label>
                <span className={styles.focusBorder}></span>
              </div>
            </div>
          </section>
          Decuento?
          <input name="checked" type="checkbox" checked={estado.checked} onChange={checkboxClick} className={styles.checkboxDiscount} />
          <div>
            {estado.checked ?
              <div>
                <div className={styles.container}>
                  <input {...register("countable.discount")} type="number" min="0" autoComplete="off" className={styles.input} />
                  <label>Discount *</label>
                  <span className={styles.focusBorder}></span>
                </div>
                <p>Fecha Expiracion del Descuento</p>
                <input {...register("countable.expireDate")} type="date" />
              </div> : <p>Sin oferta? ratón</p>}
          </div>
          <div >
            <label htmlFor="file">Upload File:</label>
            <input
              className={styles.imageInput}
              type="file" id="file"
              accept=".jpg"
              multiple
              onChange={imageHandler}
            />
          </div>
          <div className={styles.submitButton}>
            <input className={styles.postFormSubmitButton} type="submit" />
          </div>
        </form>
      </div>
      <div><Preview image={image} info={watch()} /></div>
    </div>
  ) : (
    <div>
      CARGANDO
    </div>
  );
}


