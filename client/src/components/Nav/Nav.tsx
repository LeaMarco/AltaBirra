import  { useState } from "react";
import style from "./Nav.module.css";
import logo from "./AltaBirra.svg";
import lupa from "./Vector.svg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchedPosts } from "../../actions";
import { Modal } from "../Login/Modal/Modal.component";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function Nav() {
  const [isEnterOpen, setEnterOpen] = useState(false);
  const toogleEnter = () => setEnterOpen(!isEnterOpen);

  const [isRegisterOpen, setRegisterOpen] =useState(false);
  const toogleRegister = () => setRegisterOpen(!isRegisterOpen);

  const [register, setRegister] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    await dispatch(searchedPosts({ title: searchInput }));
    history.push(`/algo/${searchInput}`);
    setSearchInput("");
  }

  return (
    <div className={style.NavBar}>
      <Link to="/">
        <img src={logo} className={style.logo}></img>
      </Link>
      <div>
        <div className={style.searchBar}>
          <Link to="/">
            <img src={lupa} className={style.lupa} />
          </Link>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className={style.searchInput}
          >
            <input
              placeholder="Buscar"
              className={style.searchInput}
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </form>
        </div>
        <div className={style.buttons}>
          <Link to="/" className={style.button}>
            Ofertas
          </Link>
          <Link to="/" className={style.button}>
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

            <button className={style.buttonEnter} onClick={toogleEnter}>
              Entrar
            </button>
            <Modal isOpen={isEnterOpen} handleClose={toogleEnter}>
              <Login />
            </Modal>

            <button className={style.buttonEnter} onClick={toogleRegister}>
              Registrarme
            </button>
            <Modal isOpen={isRegisterOpen} handleClose={toogleRegister}>
              <Register />
            </Modal>

            <Link to="/post">
              <button className={style.buttonEnter}>Crear post</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
