import { useForm, SubmitHandler} from "react-hook-form";
import { PostValues} from "../../actions";
import styles from './Post.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { searchTypes } from "../../actions";


import axios from 'axios';

function CreateGenericTypes() {
  const dispatch = useDispatch<Dispatch<any>>();

  const [generic, setGeneric] = useState([]);
  let group=["ALE","LAGER","LAMBIC","OTRA"]


  async function getBeerTypes() {
    let respuesta = await dispatch(searchTypes())
    setGeneric(respuesta[0])
  }
  useEffect(() => {
    getBeerTypes();
  }, [])


  const MySwal = withReactContent(Swal)

  async function createSpecificType(data:any) {
    console.log(data, "DATA DEL FORM");
    let response= await axios.post(`${process.env.REACT_APP_HOST_BACKEND}/specificTypes`, { params: data });
    return response;
  }

  async function despachadora(data) {
    let save = await createSpecificType(data)
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post modificado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
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

  const { register, handleSubmit, reset } = useForm({ });
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data); reset() };
  
  return (
    <div className={styles.mainContainer}>
    <h1 className={styles.componentTitle}>Crear tipo específico:  </h1>
    <div className={styles.listContainer}>
              <div className={styles.specificType}>
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
                                            <button className={styles.postFormSubmitButton} type="submit">Crear</button>
                                            <button className={styles.postFormSubmitButton} onClick={()=>reset()}>Cancelar</button>
                                        </div>
                                </form>
                                  
                    </div>
              </div>       
    </div>
  )
};

export default CreateGenericTypes
