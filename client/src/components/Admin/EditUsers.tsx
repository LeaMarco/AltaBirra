import  { useEffect, useState } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import {  PostValues } from "../../actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import styles from './Users.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

function EditUsers() {
  const [users, setUsers]:any = useState([]);
  const [userDetail, setUserDetail]:any = useState([]);
  const [currentPage, setCurrentPage]=useState(0)
  const [search, setSearch]=useState("")
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch<Dispatch<any>>();


  const usersInPage=()=>{
    if(search.length===0) return users.slice(currentPage,currentPage+20)
    const filtered = users.filter(user => user.username.includes(search) || user.email.includes(search))
    return filtered
}
const nextUsers=()=>{
    if(currentPage<users.length-20)
    setCurrentPage(currentPage+20)
}
const previousUsers=()=>{
    if(currentPage>0)
    setCurrentPage(currentPage-20)
}
const onSearchChange=({target})=>{
    setCurrentPage(0)
    setSearch(target.value)
}

  async function getUsers() {
    let users = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/editUsers`)
    setUsers(users.data)
  }

  async function editUser(data){
    let response= await axios.put(`${process.env.REACT_APP_HOST_BACKEND}/editUsers`, {data});
    setUserDetail({})
    return response
  }

  async function despachadora(data) {
    data.username=userDetail.username
    let save = await editUser(data)
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario modificado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
      getUsers()
    } else {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se ha podido modificar el Usuario :( Intenta nuevamente!',
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
    <h1 className={styles.componentTitle}>Editar Usuarios:  </h1>

    <div className={styles.listContainer}>
              <div className={styles.TopCard}>
                    <h3 className={styles.prop} id={styles["id"]}>User Id </h3>
                    <h3 className={styles.prop} id={styles["username"]}>Username </h3>
                    <h3 className={styles.prop} id={styles["name"]}>Name </h3>
                    <h3 className={styles.prop} id={styles["email"]}>e-mail </h3>
                    <h3 className={styles.prop} id={styles["active"]}>Active</h3>
                    <h3 className={styles.prop} id={styles["role"]}>Role </h3>
              </div>
              <div className={styles.topFilters}>
                <input type="text" placeholder="      Buscar Usuario por username o e-mail" onChange={onSearchChange} className={styles.searchInput}/>
              <button onClick={previousUsers} className={styles.postEditButton}>Anteriores</button>
              <button onClick={nextUsers} className={styles.postEditButton}>Siguientes</button>
              </div>
              <div className={styles.specificType}>
                  {usersInPage().map(user => (
                    <div>
                    <div className={styles.UserCard}>
                    <h3 className={styles.prop} id={styles["id"]}>{user.id} </h3>
                    <h3 className={styles.prop} id={styles["username"]}>{user.username} </h3>
                    <h3 className={styles.prop} id={styles["name"]}>{user.name} </h3>
                    <h3 className={styles.prop} id={styles["email"]}>{user.email} </h3>
                    <h3 className={styles.prop} id={styles["active"]}>{user.activeCount?"active":"inactive"}</h3>
                    <h3 className={styles.prop} id={styles["role"]}>{user.role.name}</h3>
                    {user.username !== userDetail.username?<button className={styles.postEditButton} onClick={()=>setUserDetail({username: user.username})}>Editar</button>:null}
                    </div>
                                 
                    
                    {user.username === userDetail.username? 
                                <form className={styles.userForm} onSubmit={handleSubmit(onSubmit)}>
                                        <div >
                                            <select {...register("activeCount")} id={styles["Select"]} required>
                                            <option hidden></option>
                                            <option key="activeCount" value="true">
                                                        Activo
                                            </option>
                                            <option key="activeCount" value="false">
                                                        Inactivo
                                            </option>
                                            </select>
                                        </div>
                                        <div>
                                            <select {...register("role")} id={styles["Select"]}required>
                                            <option hidden></option>
                                            <option key="role" value="ADMIN">
                                                        Admin
                                            </option>
                                            <option key="role" value="USER">
                                                        User
                                            </option>
                                            </select>
                                        </div>
                                        <div className={styles.submitButtonsContainer}>
                                            <button className={styles.postFormSubmitButton} type="submit">Editar</button>
                                            <button className={styles.postFormSubmitButton} onClick={()=>setUserDetail({})}>Cancelar</button>
                                        </div>
                                </form>
                                  : null
                                }
                    </div>
                  ))}
              </div>       
    </div>
    </div>
  ): (<h1>Cargando...</h1>);
};

export default EditUsers
