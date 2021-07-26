import  { useEffect, useState } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import {  PostValues } from "../../actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import styles from './Post.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

function EditUsers() {
  const [users, setUsers]:any = useState([]);
  const [userDetail, setUserDetail]:any = useState([]);
  

console.log(userDetail, "USUARIOSSS")

  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch<Dispatch<any>>();

  async function getUsers() {
    let users = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/editUsers`)
    console.log("pasó por get users", users)
    setUsers(users.data)
  }

  async function editUser(data){

  }

  
  async function getUserDetail(name:string) {
    const details = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/editUsers/detail`, {params:{username:name}});
    setUserDetail(details.data)
    return details;
  }

  async function despachadora(data) {
    let save = await editUser(data)
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post modificado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
      getUsers()
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
    getUsers();
  }, [dispatch])

  const { register, handleSubmit, reset } = useForm({ });
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data); reset() };
  
  return users.length>0?(
    <div className={styles.mainContainer}>
    <h1 className={styles.componentTitle}>Editar tipos especificos:  </h1>
    <div className={styles.listContainer}>
              <div className={styles.specificType}>
                  {users.map(user => (
                    <div className={styles.GenericTypeCard}>
                    <h3>{user}   </h3>
                      {user === userDetail.username? 
                                <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
                                        {/* <div className={styles.container} id={styles["beer"]}>
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
                                        </div> */}
                                        <div className={styles.submitButtonsContainer}>
                                            <button className={styles.postFormSubmitButton} type="submit">Editar</button>
                                            <button className={styles.postFormSubmitButton} onClick={()=>setUserDetail({})}>Cancelar</button>
                                        </div>
                                </form>
                                  :
                                  <button className={styles.postEditButton} onClick={()=>getUserDetail(user)}>Editar</button>
                                }
                    </div>
                  ))}
              </div>       
    </div>
    </div>
  ): (<h1>Cargando...</h1>);
};

export default EditUsers
