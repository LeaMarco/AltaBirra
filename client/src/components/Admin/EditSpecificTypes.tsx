import { useEffect, useState } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import {PostValues, searchTypes } from "../../actions";
import { useDispatch} from "react-redux";
import { Dispatch } from "redux";
import styles from './Post.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import axios from 'axios';

function EditSpecificTypes() {
  const [generic, setGeneric] = useState([]);
  const [specific, setSpecific] = useState([]);
  const [specificDetail, setSpecificDetail]:any = useState();


  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch<Dispatch<any>>();


  async function getSpecificDetail(name:string) {
    const details = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/specificTypes/detail`, {params:{type:name}});
    setSpecificDetail(details.data)
    return details;
  }

  async function editSpecificType(data:any) {
    data.typeToChange = specificDetail.type
    await axios.put(`${process.env.REACT_APP_HOST_BACKEND}/specificTypes`, { params: data });
    const newValues= await getSpecificDetail(data.type)
    setSpecificDetail(newValues.data)
    return newValues;
  }


  async function getBeerTypes() {
    let respuesta = await dispatch(searchTypes())
    setGeneric(respuesta[0])
    setSpecific(respuesta[1])
  }

  let group=["ALE","LAGER","LAMBIC","OTRA"]

  async function despachadora(data) {
    let save = await editSpecificType(data)
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo modificado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
      setSpecificDetail({})
      getBeerTypes()

    } else {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se ha podido modificar el tipo :( Intenta nuevamente!',
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
      genericType: specificDetail.genericType?.type,
    };
  }

  useEffect(() => {
    reset(dataPrevia);
  }, [specificDetail])



  const { register, handleSubmit, reset } = useForm({ defaultValues : dataPrevia });
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data); reset() };
  
  return generic.length>0 && specific.length>0 ?(
    <div className={styles.mainContainer}>
    <h1 className={styles.componentTitle}>Editar tipos especificos:  </h1>
    <div className={styles.listContainer}>
              <div className={styles.specificType}>
                  {specific.map(value => (
                    <div className={styles.GenericTypeCard}>
                    <h3>{value}   </h3>
                      {dataPrevia!==undefined && dataPrevia.genericType!==undefined && specificDetail!==undefined && specificDetail.type === value? 
                                <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
                                        <div className={styles.container} id={styles["beer"]}>
                                            <input {...register("type")} autoComplete="off" className={styles.input} required />
                                            <label>Type name *</label>
                                            <span className={styles.focusBorder}></span>
                                        </div>
                                        <div className={styles.container} id={styles["description"]}>
                                            <textarea {...register("description")} autoComplete="off" className={styles.input} required />
                                            <label>Type description *</label>
                                            <span className={styles.focusBorder}></span>
                                        </div>
                                        <div className={styles.genericType}>
                                            <label>Beer group:  </label>
                                            <select {...register("group")} >
                                                { group.map(value => (
                                                    <option key={value} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.genericType}>
                                            <label>Generic Type:  </label>
                                            <select {...register("genericType")} >
                                                {generic && generic.map(value => (
                                                    <option key={value} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.submitButtonsContainer}>
                                            <button className={styles.postFormSubmitButton} type="submit">Editar</button>
                                            <button className={styles.postFormSubmitButton} onClick={()=>setSpecificDetail({})}>Cancelar</button>
                                        </div>
                                </form>
                                  :
                                  <button className={styles.postEditButton} onClick={()=>getSpecificDetail(value)}>Editar</button>
                                }
                    </div>
                  ))}
              </div>       
    </div>
    </div>
  ): (<h1>Cargando...</h1>);
};

export default EditSpecificTypes
