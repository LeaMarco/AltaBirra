import  { useState } from "react";
import style from "./Nav.module.css";
import logo from "./AltaBirra.svg";
import lupa from "./Vector.svg";
import { Link } from "react-router-dom";

export default function Nav() {
  const [register, setRegister] = useState(false);
  console.log(register);

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

          <input placeholder="buscar" className={style.searchInput}></input>
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
          <Link
            to="/"
            className={style.buttonEnter}
            onClick={() => setRegister(!register)}
          >
            Entrar
          </Link>
          </div>
        )}
      </div>
    </div>
  );
}
