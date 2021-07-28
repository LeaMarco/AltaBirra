import { useEffect, useState } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import { PostValues, searchTypes } from "../../actions";
import { useDispatch} from "react-redux";
import { Dispatch } from "redux";
import styles from './Post.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

function EditGenericTypes() {
  const [generic, setGeneric] = useState([]);
  const [specific, setSpecific] = useState([]);
  const [genericDetail, setGenericDetail]:any = useState();

  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch<Dispatch<any>>();

  async function getGenericDetail(name:string) {
    const details = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/genericTypes/detail`, {params:{type:name}});
    setGenericDetail(details.data)
    return details;
  }

  async function editGenericType(data:any) {
    await axios.put(`${process.env.REACT_APP_HOST_BACKEND}/genericTypes`, { params: data });
    const newValues= await getGenericDetail(data.type)
    getGenericDetail(newValues.data)
    return newValues;
  }


  async function getBeerTypes() {
    let respuesta = await dispatch(searchTypes())
    setGeneric(respuesta[0])
    setSpecific(respuesta[1])
  }

  async function despachadora(data) {
    let save = await editGenericType(data)
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo modificado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
      setGenericDetail({})
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
  if (genericDetail) {
    dataPrevia = {
      typeToChange: genericDetail.type,
      type: genericDetail.type,
      description: genericDetail.description,
    };
  }

  useEffect(() => {
    reset(dataPrevia);
  }, [genericDetail])

  const { register, handleSubmit, reset } = useForm({ defaultValues : dataPrevia });
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data); reset() };
  
  return generic.length>0 && specific.length>0 ?(
    <div className={styles.mainContainer}>
    <h1 className={styles.componentTitle}>Editar tipos genéricos:  </h1>
    <div className={styles.listContainer}>
              <div className={styles.specificType}>
                  {generic.map(value => (
                    <div className={styles.GenericTypeCard}>
                        <h3>{value}   </h3>
                      {dataPrevia!==undefined && genericDetail!==undefined && genericDetail.type === value? 
                                <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
                                        <div className={styles.container} id={styles["beer"]}>
                                            <input {...register("type")} autoComplete="off" className={styles.input} required />
                                            <label>Type name *</label>
                                            <span className={styles.focusBorder}></span>
                                        </div>
                                        <div className={styles.container} id={styles["beer"]}>
                                            <textarea {...register("description")} autoComplete="off" className={styles.input} required />
                                            <label>Type description *</label>
                                            <span className={styles.focusBorder}></span>
                                        </div>
                                        <div className={styles.submitButtonsContainer}>
                                            <button className={styles.postFormSubmitButton} type="submit">Editar</button>
                                            <button className={styles.postFormSubmitButton} onClick={()=>setGenericDetail({})}>Cancelar</button>
                                        </div>
                                </form>
                                  :
                                  <button className={styles.postEditButton} onClick={()=>getGenericDetail(value)}>Editar</button>
                                }
                    </div>
                  ))}
              </div>       
    </div>
    </div>
  ): (<h1>Cargando...</h1>);
};

export default EditGenericTypes
