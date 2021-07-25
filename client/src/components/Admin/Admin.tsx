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
import EditSpecificTypes from "./EditSpecificTypes";


 function EditTypes() {
  const [generic, setGeneric] = useState([]);
  const [specific, setSpecific] = useState([]);
  const [specificDetail, setSpecificDetail]:any = useState();
  const [genericDetail, setGenericDetail]:any = useState();
    console.log(specificDetail, "DETALLE GENERICA")

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


  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch<Dispatch<any>>();

  async function getBeerTypes() {
    let respuesta = await dispatch(searchTypes())
    setGeneric(respuesta[0])
    setSpecific(respuesta[1])
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


  
  return generic.length>0 && specific.length>0 ?(
    <div className={styles.mainContainer}>
              <div className={styles.genericType}>
                        <label>Generic Type:  </label>
                            {generic.map(value => (
                                <div>
                                <h3> {value} </h3>
                                { genericDetail!==undefined && genericDetail.type === value? 
                                <div>
                                    <h2>{genericDetail.type}</h2> 
                                    <h5>{genericDetail.description}</h5> 
                                </div>
                                  : <button onClick={()=>getGenericDetail(value)}>editar</button>
                                }
                                </div>
                            ))}
              </div>
              <EditSpecificTypes />
    </div>
  ): (<h1>Cargando...</h1>);
};

export default EditTypes
