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
import { getUserData, login } from '../../actions/index'
import swal from 'sweetalert';
import { ModalFavorites } from "../FavoriteTab/ModalFavorites/Modal.component";
import { useLayoutEffect } from "react";
import { validationHeadersGenerator } from "../../validationHeadersGenerator";

// import OffCanvas from 'react-aria-offcanvas';
import { FaBars, FaSearch } from "react-icons/fa";
interface Autocomplete {
  title: string;
}

export default function Nav() {
  const [navbarOpen, setNavbarOpen] = useState(false)
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

  const stateWelcome = useSelector((state) => state["welcome"]);

  ////////////////////AUTENTICACION AUTOMATICA//////////////////////////////////////////////////
  useLayoutEffect(() => {
    if (Object.keys(localStorage).join().includes("token")) {
      axios.get(`${process.env.REACT_APP_HOST_BACKEND}/auth/autoLogin`, {
        headers: validationHeadersGenerator()
      }).then(e => {
        toogleAuth()
      }).catch(e => { console.log("ERROR EN AA", e) })
    }

  }
    , [])
  ///////////////////AUTENTICACION AUTOMATICA/////////////////////////////////////////
  /* useEffect(() => {

    let tokenLocal = localStorage.tokenLocal
    if (tokenLocal) {
      
      axios.get(`${process.env.REACT_APP_HOST_BACKEND}/auth/localSignIn`, {
        headers: {
          authToken: tokenLocal
        }
      })
        .then((e) => {
          dispatch(getUserData(e.data))
          dispatch(login(true));
          
          toogleAuth()
          console.log('Logueado automatico con token local EXITOSO!')
        })

        .catch((error) => console.log(error, 'No te pudiste loguear de forma local automatica!'))
    }

  },[]) */


  //////////////////autenticacion automatica//////////////////////////////////////////

  //////////////////Fin autenticacion automatica//////////////////////////////////////////




  function handleSubmit(event) {
    event.preventDefault();
    handleSearch(searchInput);
  }

  async function handleChange(event) {
    setSearchInput(event.target.value);
    let temp = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/autocomplete`, {
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
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
  }

  function close() {
    swal({
      title: "Cerrar sesión",
      text: "¿Desea cerrar sesión?",
      icon: "error",
      buttons: ["No", "Si"]
      // timer: 2000,
    }).then(response => {
      if (response) {
        swal({ title: 'Adiós, vuelve pronto!', text: 'Suerte!', icon: "success", timer: 3000, buttons: [''] })
        setTimeout(() => {
          localStorage.clear();
          window.location.href = 'https://localhost:3000';
        }, 2900);

      }
    })
  }

  return (
    <div className={style.NavBar}>
      <div className={style.LogoContainer}>
        <Link to="/">
          <img src={logo} className={style.logo}></img>
        </Link>
      </div>
      <div className={style.SearchBarContainer}>
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
      <div className={style.ButtonsNavBar}>
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
            <ModalFavorites isOpen={showFavorites} handleClose={toogleFavorites}>
              <FavoritesTab closeModal={toogleFavorites} />
            </ModalFavorites>

            <button onClick={toogleFavorites} className={style.buttonFavorites}>
              <img className={style.buttonImg} src="https://image.flaticon.com/icons/png/512/1077/1077035.png" alt="Favorites" height="1vh" />
            </button>

            <Link to="/cart/1" className={style.buttonCart}>
              <img className={style.buttonImg} src="https://image.flaticon.com/icons/png/512/3144/3144456.png" alt="Cart" />
            </Link>

            <Modal isOpen={isEnterOpen} handleClose={toogleEnter}>
              <Login closeModal={toogleEnter} toogleAuth={toogleAuth} />
            </Modal>

            <Modal isOpen={isRegisterOpen} handleClose={toogleRegister}>
              <Register closeModal={toogleRegister} toogleEnter={toogleEnter} toogleRegister={toogleRegister} />
            </Modal>

            <div className={style.buttonsRight}>
              <Link className={style.textDecoration} to="/panel">
                <button className={style.buttonEnter}>Panel</button>
              </Link>

              {
                !isAuth ?

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
          // </div>
        )}
      </div >
      <div className={style.mobileIcons}>
        <div className={style.searchFa}>
          <FaSearch />
        </div>
        <div className={style.hamburger}>
          <FaBars />
        </div>
      </div>
      <div>

        {
          isAuth ?
            (
              <div className={style.fourColumn}>
                <span className={style.welcome} >
                  Bienvenido {stateWelcome.nombre}
                </span>
                <button className={style.closeSesion} onClick={close}>
                  Cerrar sesión
                </button>
              </div>
            )
            : null
        }
      </div>



    </div>
  );
}
