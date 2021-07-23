import { useState } from "react";
import style from "./Nav.module.css";
import logo from "./AltaBirra.svg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchedPosts, setTitleSearch } from "../../actions";
import { Modal } from "../Login/Modal/Modal.component";
import Login from "../Login/Login";
import Register from "../Register/Register";
import axios from "axios";
import FavoritesTab from "../FavoriteTab/FavoriteTab";

interface Autocomplete {
  title: string;
}

export default function Nav() {
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
      <div>
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

            <div className={style.buttonsRight}>
              <Link to="/panel">
                <button className={style.buttonEnter}>Panel</button>
              </Link>

              {
                isAuth ?
                  <button className={style.buttonEnter} style={{ borderRadius: "30px", backgroundColor: "forestgreen" }} >
                    Bienvenido!!
                  </button>
                  :
                  <div className={style.buttonsRightEnter}>
                    <button className={style.buttonEnter} onClick={toogleEnter}>
                      Entrar
                    </button>
                    <button className={style.buttonEnter} onClick={toogleRegister}>
                      Registrarme
                    </button>
                  </div>

              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
