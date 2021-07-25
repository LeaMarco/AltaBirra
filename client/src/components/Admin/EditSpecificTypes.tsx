import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, UseFormRegister, Controller } from "react-hook-form";
import { editPost, EditPostInterface, getDetail, PostValues, searchTypes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import styles from './Post.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from "react-router-dom";
import { RootState } from "../../reducers";
import Beer from "../Beer/Beer";
import axios from 'axios';

export default function EditSpecificTypes() {
  const [generic, setGeneric] = useState([]);
  const [group, setGroup] = useState([]);
  const [specific, setSpecific] = useState([]);
  const [specificDetail, setSpecificDetail]:any = useState();
  const [genericDetail, setGenericDetail]:any = useState();

console.log(specificDetail, "DETALLES EN EL ESTADO")

  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch<Dispatch<any>>();

  async function getGenericDetail(name:string) {
    const details = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/genericTypes/detail`, {params:{type:name}});
    setGenericDetail(details.data)
    return details;
  }

  async function getSpecificDetail(name:string) {
    const details = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/specificTypes/detail`, {params:{type:name}});
    setSpecificDetail(details.data)
    return details;
  }

  async function editSpecificType(data:any) {
    await axios.put(`${process.env.REACT_APP_HOST_BACKEND}/specificTypes/detail`, { params: data });
    const newValues= await getSpecificDetail(data.type)
    setSpecificDetail(newValues.data)
    return newValues;
  }


  async function getBeerTypes() {
    let respuesta = await dispatch(searchTypes())
    setGeneric(respuesta[0])
    setSpecific(respuesta[1])
    setGroup(respuesta[2])
  }

  async function despachadora(image) {
    let save = await dispatch(editPost(image))
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post modificado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch(getDetail(1))
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

  useEffect(() => {
    getBeerTypes();
  }, [dispatch])

  let dataPrevia
  if (specificDetail) {
    dataPrevia = {
      type: specificDetail.type,
      description: specificDetail.description,
      group: specificDetail.group,
      genericType: specificDetail.genericType,
    };
  }

console.log(dataPrevia, "DATA PREVIA")


  const { register, handleSubmit, reset } = useForm({defaultValues : dataPrevia});
  const onSubmit: SubmitHandler<PostValues> = (data) => { console.log(data, "DATA DEL FORM");editSpecificType(data); reset() };
  
  return generic.length>0 && specific.length>0 ?(
    <div className={styles.mainContainer}>
              <div className={styles.specificType}>
                <label>Specific Type:  </label>
                  {specific.map(value => (
                    <div>
                        <h3>{value}   </h3>
                      { specificDetail!==undefined && specificDetail.type === value? 
                                <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
                                        <div className={styles.container} id={styles["name"]}>
                                            <input {...register("type")} autoComplete="off" className={styles.input} required />
                                            <label>Type name *</label>
                                            <span className={styles.focusBorder}></span>
                                        </div>
                                        <div className={styles.container} id={styles["name"]}>
                                            <input {...register("description")} autoComplete="off" className={styles.input} required />
                                            <label>Type description *</label>
                                            <span className={styles.focusBorder}></span>
                                        </div>
                                        <div className={styles.genericType}>
                                            <label>Beer group:  </label>
                                            <select {...register("group")} >
                                                {group && group.map(value => (
                                                    <option key={value} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
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
                                        <div className={styles.submitButton}>
                                            <input className={styles.postFormSubmitButton} type="submit" />
                                        </div>
                                   <button className={styles.postFormSubmitButton} onClick={()=>setSpecificDetail({})}>Cancelar</button>
                                </form>
                                  : <button className={styles.postFormSubmitButton} onClick={()=>getSpecificDetail(value)}>editar</button>
                                }
                    </div>
                  ))}
              </div>       
    </div>
  ): (<h1>Cargando...</h1>);
};


