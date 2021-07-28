import  { useEffect, useState } from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import {  PostValues, setQuerySearch } from "../../actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import styles from './Users.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

function ModeratePost() {
  const [posts, setPosts]:any = useState([]);
  const [postDetail, setPostDetail]:any = useState([]);
  const [currentPage, setCurrentPage]=useState(0)
  const [search, setSearch]=useState("")
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch<Dispatch<any>>();

    const postInPage=()=>{
        if(search.length===0) return posts.slice(currentPage,currentPage+20)
        const filtered = posts.filter(post => post.title.includes(search)||post.user.username.includes(search))
        return filtered
    }
    const nextPosts=()=>{
        if(currentPage<posts.length-20)
        setCurrentPage(currentPage+20)
    }
    const previousPosts=()=>{
        if(currentPage>0)
        setCurrentPage(currentPage-20)
    }
    const onSearchChange=({target})=>{
        setCurrentPage(0)
        setSearch(target.value)
    }

  async function getPosts() {
    let users = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/moderatePost`)
    setPosts(users.data)
  }

  async function editPost(data){
    let response= await axios.patch(`${process.env.REACT_APP_HOST_BACKEND}/moderatePost`, {data});
    setPostDetail({})
    return response
  }

  async function despachadora(data) {
    data.postId=postDetail.id
    let save = await editPost(data)
    if (save["status"] === 200) {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post inhabilitado con Exito!',
        showConfirmButton: false,
        timer: 1500,
      })
      getPosts()
    } else {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se ha podido inhabilitado el Post :( Intenta nuevamente!',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  useEffect(() => {
    getPosts();
  }, [dispatch])

  const { register, handleSubmit, reset } = useForm({ });
  const onSubmit: SubmitHandler<PostValues> = (data) => { despachadora(data); reset() };
  
  return posts.length>0?(
    <div className={styles.mainContainer}>
    <h1 className={styles.componentTitle}>Inhabilitar Posts:  </h1>

    <div className={styles.listContainer}>
              <div className={styles.TopCard}>
                    <h3 className={styles.prop} id={styles["id"]}>Post Id </h3>
                    <h3 className={styles.prop} id={styles["username"]}>Título del post </h3>
                    <h3 className={styles.prop} id={styles["name"]}>Creador </h3>
                    <h3 className={styles.prop} id={styles["email"]}>Estatus </h3>
              </div>
              <div className={styles.topFilters}>
                <input type="text" placeholder="      Buscar post por título o username del creador" onChange={onSearchChange} className={styles.searchInput}/>
              <button onClick={previousPosts} className={styles.postEditButton}>Anteriores</button>
              <button onClick={nextPosts} className={styles.postEditButton}>Siguientes</button>
              </div>
              <div className={styles.specificType}>
                  {postInPage().map(post => (
                    <div>
                    <div className={styles.UserCard}>
                    <h3 className={styles.prop} id={styles["id"]}>{post.id} </h3>
                    <h3 className={styles.prop} id={styles["username"]}>{post.title} </h3>
                    <h3 className={styles.prop} id={styles["name"]}>{post.user.username} </h3>
                    <h3 className={styles.prop} id={styles["email"]}>{post.visibility?"active":"inactive"} </h3>
                    {post.id !== postDetail.id?<button className={styles.postEditButton} onClick={()=>setPostDetail({id: post.id})}>Editar</button>:null}
                    </div>
                                 
                    
                    {post.id === postDetail.id? 
                                <form className={styles.userForm} onSubmit={handleSubmit(onSubmit)}>
                                        <div >
                                            <select {...register("visibility")} id={styles["Select"]}>
                                            <option key="visibility" value="true">
                                                        Activo
                                            </option>
                                            <option key="visibility" value="false">
                                                        Inactivo
                                            </option>
                                            </select>
                                        </div>
                                        <div className={styles.submitButtonsContainer}>
                                            <button className={styles.postFormSubmitButton} type="submit">Editar</button>
                                            <button className={styles.postFormSubmitButton} onClick={()=>setPostDetail({})}>Cancelar</button>
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

export default ModeratePost
