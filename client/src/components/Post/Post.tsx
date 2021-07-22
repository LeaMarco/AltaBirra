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
  const { id }: any = useParams();
  const [generic, setGeneric] = useState([]);
  const [specific, setSpecific] = useState([]);
  const [estado, setEstado] = useState({ "checked": true });
  const [image, setImage] = useState("");

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
    dispatch(getDetail(id));
    getBeerTypes();
  }, [dispatch])





  //hacer destructuring de generic y specific
  async function despachadora(data) {
    let save = await dispatch(createPost(transformer(data)))
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
  //image
  const [file, setFile] = useState();
  console.log(file, "fileeeeeeee rocky")

  const handleFileChange = (event) => {
    setFile(event.target.files);
    console.log(file)
  }
  async function imageHandler(event) {
    const file = event.target.files[0];
    event.preventDefault();
    const formData = new FormData()
    formData.append('image', file)
    let response = await axios.post("http://localhost:3001/upload", formData)
    setImage(response.data.filename);
    // dataPrevia.infoPost.image = response.data.filename;
  }

  let dataPrevia = {
    beer: {
      abv: "99",
      dryHop: false,
      genericType: "TIPO GENÉRICO?",
      ibu: "88",
      volume: "777",
      og: "66",
      specificType: "TIPO ESPECIFICO?",
      calories: "555",
    },
    infoPost: {
      title: "NOMBRE DE TU CERVEZA",
      description: "Completá acá con tu descripción",
      image: "https://i.imgur.com/FsGTu6Q.png",
      stock: 1,
      shipping: false,
      visibility: true,
      username: "testUser",
    },
    countable: {
      price: "999",
      discount: "5",
      expireDate: Date.now(),
    }
  }
  if (image.length > 5) {
    dataPrevia.infoPost.image = `"http://localhost:3001/upload/${image}"`;
  }

  console.log(dataPrevia.infoPost.image, "dataprevia")

  const { register, handleSubmit, reset, watch } = useForm({ defaultValues: dataPrevia });
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data); reset() };


  return (
    <div className={styles.mainContainer}>
      {image.length > 5 ? (<img src={`"http://localhost:3001/upload/${image}"`} alt="dale anda" />) : null}
      <div>
        <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.postFormBeer}>
            <h3 id={styles["beerh2"]}> Beer</h3>
            <div className={styles.row1}>
              <div className={styles.container} id={styles["name"]}>
                <input {...register("infoPost.title")} autoComplete="off" className={styles.input} />
                <label>Beer Name *</label>
                <span className={styles.focusBorder}></span>
              </div>
              <div className={styles.container}>
                <input {...register("beer.abv")} type="number" min="1" autoComplete="off" className={styles.input} />
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
                <input {...register("beer.ibu")} type="number" min="1" autoComplete="off" className={styles.input} />
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
                <input {...register("beer.volume")} type="number" min="1" autoComplete="off" className={styles.input} />
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
                <input {...register("infoPost.stock")} type="number" min="1" autoComplete="off" className={styles.input} />
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
              <textarea {...register("infoPost.description")} autoComplete="off" className={styles.input} />
              <label>Description *</label>
              <span className={styles.focusBorder}></span>
            </div>
          </section>
          <section className={styles.postFormCountable}>
            <h3>Countables</h3>
            <div className={styles.countablerow}>
              <div className={styles.container}>
                <input {...register("countable.price")} type="number" min="1" autoComplete="off" step=".01" className={styles.input} />
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
          <div className={styles.submitButton}>
            <input className={styles.postFormSubmitButton} type="submit" />
          </div>
          <div className="form-group" >
            <label htmlFor="file">Upload File:</label>
            <input
              className="form-control-file mb-3"
              type="file" id="file"
              accept=".jpg"
              multiple
              onChange={imageHandler}
            />
            <button
              className="btn btn-primary mt-3"
            >Upload</button>
          </div>
        </form>

      </div>
      <div><Preview image={image} info={watch()} /></div>
    </div>
  )
}


