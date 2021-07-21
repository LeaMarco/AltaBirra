import { useState, useEffect } from "react";
import style from "./Nav.module.css";
import logo from "./AltaBirra.svg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchedPosts, setTitleSearch } from "../../actions";
import { Modal } from "../Login/Modal/Modal.component";
import Login from "../Login/Login";
import Register from "../Register/Register";
import axios from "axios";
import FavoritesTab from "../FavoriteTab/FavoriteTab";
import { token } from "morgan";
import { useEffect } from "react";

interface Autocomplete {
  title: string;
}
let once = true

export default function Nav() {
  
  const stateWelcome = useSelector((state) => state["welcome"]);

<<<<<<< HEAD
  useEffect(() => {
    // NO TOCAR
  }, [stateWelcome]);
  ///////////////////AUTENTICACION AUTOMATICA/////////////////////////////////////////


  //////////////////autenticacion automatica//////////////////////////////////////////
=======
>>>>>>> 27cca6f7108ae13b2e2239a0a4d19990d6061f1a








  const [isEnterOpen, setEnterOpen] = useState<boolean>(false);
  const toogleEnter = () => setEnterOpen(!isEnterOpen);
  const [isRegisterOpen, setRegisterOpen] = useState<boolean>(false);
  const toogleRegister = () => setRegisterOpen(!isRegisterOpen);
  const [autocomplete, setAutocomplete] = useState<Autocomplete[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const toogleFavorites = () => setShowFavorites(!showFavorites);
  const [register, setRegister] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();


  const [isAuth, setAuth] = useState<boolean>(false);
  const toogleAuth = () => setAuth(!isAuth);




  ///////////////////AUTENTICACION AUTOMATICA/////////////////////////////////////////
  useEffect(() => {


    let tokenLocal = localStorage.tokenLocal
    if (tokenLocal && once) {
      once = false

      axios.get('http://localhost:3001/auth/localSignIn', {
        headers: {
          authToken: tokenLocal
        }
      })
        .then((e) => {
          toogleAuth()
          console.log(e.data)
          console.log('Logueado automatico con token local EXITOSO!')
        })

        .catch((error) => console.log(error, 'No te pudiste loguear de forma local automatica!'))
    }

  }, [])
  //////////////////autenticacion automatica//////////////////////////////////////////




  function handleSubmit(event) {
    event.preventDefault();
    handleSearch(searchInput);
  }

  async function handleChange(event) {
    setSearchInput(event.target.value);
    let temp = await axios.get("http://localhost:3001/autocomplete", {
      params: { search: event.target.value },
    });
    setAutocomplete(temp.data);
  }

  function handleAutocomplete(event) {
    setSearchInput(event.target.value);
    setAutocomplete([]);
    handleSearch(event.target.value);
  }

  function handleSearch(searchParam) {
    dispatch(setTitleSearch(searchParam));
    dispatch(searchedPosts({ title: searchParam }));
    history.push(`/search`);
    setSearchInput("");
  }

  return (
    <div className={style.NavBar}>
      <Link to="/">
        <img src={logo} className={style.logo}></img>
      </Link>
      <div>
        <div className={style.searchBar}>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className={style.searchInput}
          >
            <div className={style.inputContainer}>
              <input type="submit" readOnly value="🔎" className={style.lupa} />
              <input
                placeholder="Buscar"
                className={style.searchInput}
                value={searchInput}
                onChange={(event) => handleChange(event)}
                onSubmit={(event) => handleSubmit(event)}
              />
            </div>
            {searchInput && autocomplete.length ? (
              <div className={style.autocomplete}>
                {autocomplete?.map(({ title }) => {
                  return (
                    <input
                      readOnly
                      value={title}
                      onClick={(event) => handleAutocomplete(event)}
                    />
                  );
                })}
              </div>
            ) : null}
          </form>
        </div>
        <div className={style.buttons}>
          <Link to="/" className={style.button}>
            Ofertas
          </Link>
          <Link to="/categories" className={style.button}>
            Categorías
          </Link>
          <Link to="/" className={style.button}>
            Vender
          </Link>
        </div>
      </div>
      <div> {/* TERCER COLUMNA*/}
        {register ? (
          <div className={style.buttonsRight}>
            <Link
              to="/"
              className={style.buttonEnter}
              onClick={() => setRegister(!register)}
            >
              Favoritos
            </Link>
            <Link
              to="/"
              className={style.buttonEnter}
              onClick={() => setRegister(!register)}
            >
              Mis Compras
            </Link>

            <Link
              to="/"
              className={style.buttonEnter}
              onClick={() => setRegister(!register)}
            >
              Salir
            </Link>
          </div>
        ) : (
          <div className={style.buttonsRight}>
            {/* <Link
              to="/login"
              className={style.buttonEnter}
              onClick={() => setRegister(!register)}
            >
              Entrar
            </Link> */}
            <Modal isOpen={showFavorites} handleClose={toogleFavorites}>
              <FavoritesTab />
            </Modal>
            <button onClick={toogleFavorites} className={style.buttonFavorites}>
              <img className={style.buttonImg} src="https://image.flaticon.com/icons/png/512/126/126482.png" alt="Cart" />

            </button>
            <Link
              to="/cart/1" ////////FALTA METER EL ID DE USER
              className={style.buttonCart}
            >
              <img className={style.buttonImg} src="https://image.flaticon.com/icons/png/512/3144/3144456.png" alt="Cart" />
            </Link>



            <Modal isOpen={isEnterOpen} handleClose={toogleEnter}>
              <Login closeModal={toogleEnter} toogleAuth={toogleAuth} />
            </Modal>



            <Modal isOpen={isRegisterOpen} handleClose={toogleRegister}>
              <Register closeModal={toogleRegister} toogleEnter={toogleEnter} toogleRegister={toogleRegister} />
            </Modal>
<<<<<<< HEAD
          
=======



>>>>>>> 27cca6f7108ae13b2e2239a0a4d19990d6061f1a
            <div className={style.buttonsRight}>
              <Link className={style.textDecoration} to="/panel">
                <button className={style.buttonEnter}>Panel</button>
              </Link>

              {
<<<<<<< HEAD
                !isAuth ?
                  
=======
                isAuth ?
                  <div>
                    <button className={style.buttonEnter} style={{ borderRadius: "30px", backgroundColor: "forestgreen" }} >
                      Bienvenido!!
                    </button>

                    <button className={style.buttonEnter} style={{ borderRadius: "30px", backgroundColor: "red" }} onClick={() => { localStorage.clear(); toogleAuth() }} >
                      Cerras cesion
                    </button>

                  </div>
                  :
>>>>>>> 27cca6f7108ae13b2e2239a0a4d19990d6061f1a
                  <div className={style.buttonsRightEnter}>
                    <button className={style.buttonEnter} onClick={toogleEnter}>
                      Entrar
                    </button>
                    <button className={style.buttonEnter} onClick={toogleRegister}>
                      Registrarme
                    </button>
                  </div>
                  : null
              }
            </div>
          </div>
        )}
      </div>
      <div>

        {
          isAuth && localStorage.getItem('token') ?
              (              
              <div className={style.fourColumn}>
                <span className={style.welcome} >
                  Bienvenido {stateWelcome.nombre}
                </span>
                <span className={style.closeSesion}>
                  Cerrar sesión
                </span>
              </div>
              )
              : null
        }
      </div>



    </div>
  );
}
