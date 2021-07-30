import { useForm, SubmitHandler} from "react-hook-form";
import { PostValues} from "../../actions";
import styles from './Post.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import axios from 'axios';

function CreateGenericTypes() {

  const MySwal = withReactContent(Swal)

  async function createGenericType(data:any) {
    let response= await axios.post(`${process.env.REACT_APP_HOST_BACKEND}/genericTypes`, { params: data });
    return response;
  }

  async function despachadora(data) {
    let save = await createGenericType(data)
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo creado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se ha podido crear el tipo :( Intenta nuevamente!',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  const { register, handleSubmit, reset } = useForm({ });
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data); reset() };
  
  return (
    <div className={styles.mainContainer}>
    <h1 className={styles.componentTitle}>Crear tipo genérico:  </h1>
    <div className={styles.listContainer}>
              <div className={styles.specificType}>
                                <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
                                        <div className={styles.container} id={styles["beer"]}>
                                            <input {...register("type")} autoComplete="off" className={styles.input} required placeholder="Nombre del tipo" />
                                            <label>Type name *</label>
                                            <span className={styles.focusBorder}></span>
                                        </div>
                                        <div className={styles.container} id={styles["description"]}>
                                            <textarea {...register("description")} autoComplete="off" className={styles.input} required placeholder="Descripción del tipo"/>
                                            <label>Type description *</label>
                                            <span className={styles.focusBorder}></span>
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
