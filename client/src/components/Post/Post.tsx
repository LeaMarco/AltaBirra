import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, UseFormRegister, Controller } from "react-hook-form";
import { editPost, EditPostInterface, PostValues } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createPost, searchTypes, getDetail } from "../../actions";
import transformer, { transformEdit } from "./FormatData";
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

  var token = Object.keys(localStorage).join().includes('token');

  const [generic, setGeneric] = useState([]);
  const [specific, setSpecific] = useState([]);
  const [estado, setEstado] = useState({ "pickup": false, "discount": false });
  console.log(estado,"estado")
  const [image, setImage] = useState("");

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
    getBeerTypes();
  }, [dispatch, image])



  //hacer destructuring de generic y specific
  async function despachadora(data, image) {
    let save = await dispatch(createPost(transformer(data, image)))

    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Post creado con Éxito!',
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
  //image
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files);
  }
  async function imageHandler(event) {
    const file = event.target.files[0];
    event.preventDefault();
    const formData = new FormData()
    formData.append('image', file)
    let response = await axios.post(`${process.env.REACT_APP_HOST_BACKEND}/upload`, formData)
    setImage(`${process.env.REACT_APP_HOST_BACKEND}/upload/` + response.data.filename);
  }


  const { register, handleSubmit, reset, watch } = useForm({});
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data, image); reset() };


  return (
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
                <label>Generic Type:  </label>
                <select {...register("beer.genericType")} required >
                <option hidden></option>
                  {generic && generic.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.specificType}>
                <label>Specific Type:  </label>
                <select {...register("beer.specificType")} required >
                <option hidden></option>
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
                <input {...register("infoPost.stock")} type="number" min="1" autoComplete="off" className={styles.input} required />
                <label>Stock *</label>
                <span className={styles.focusBorder}></span>
              </div>
              <div className={styles.InfoPostCheckboxes}>
                <label>Shipping</label>
                <input {...register("infoPost.shipping")} type="checkbox" className={styles.checkbox} />
                <label>Take Away</label>
                <input name="pickup" checked={estado.pickup} onChange={checkboxClick} type="checkbox" className={styles.checkbox} />
                <div>
                    {estado.pickup ?
                      <div>
                        <div className={styles.container}>
                          <input {...register("infoPost.pickupdir")} type="text" autoComplete="off" className={styles.input} />
                          <label>Direccion y Horarios</label>
                          <span className={styles.focusBorder}></span>
                        </div>
                      </div> : null}
                </div>
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
           <p>Descuento?</p>
          <input name="discount" type="checkbox" checked={estado.discount} onChange={checkboxClick} className={styles.checkboxDiscount} />
          <div>
            {estado.discount ?
              <div>
                <div className={styles.container}>
                  <input {...register("countable.discount")} type="number" min="0" autoComplete="off" className={styles.input} />
                  <label>Discount</label>
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

      </div >
      <div><Preview image={image} info={watch()} /></div>
    </div >
  )
}


