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

interface Autocomplete {
  title: string;
}

export default function Nav() {
  const [isEnterOpen, setEnterOpen] = useState(false);
  const toogleEnter = () => setEnterOpen(!isEnterOpen);

  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const toogleRegister = () => setRegisterOpen(!isRegisterOpen);

  const [autocomplete, setAutocomplete] = useState<Autocomplete[]>([]);

  const [register, setRegister] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    handleSearch(searchInput);
  }

  async function handleChange(event) {
    setSearchInput(event.target.value);
    let temp = await axios.get("http://localhost:3001/autocomplete", { params: { search: event.target.value } });
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
                onChange={event => handleChange(event)}
                onSubmit={(event) => handleSubmit(event)}
              />
            </div>
            {
              searchInput && autocomplete.length
                ?
                <div className={style.autocomplete}>
                  {
                    autocomplete?.map(({ title }) => {
                      return <input readOnly value={title} onClick={event => handleAutocomplete(event)} />
                    })
                  }
                </div>
                : null
            }
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
