import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Nav.module.css";
import logo from "./AltaBirra.svg";
import { Link, useHistory } from "react-router-dom";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { RootState } from "../../reducers/index";
import { getCart } from "../../actions";


interface Autocomplete {
  title: string;
}

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const carts: any = useSelector((state: RootState) => state.cart);
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

  const hasToken = Object.keys(localStorage).join().includes("token")

  let cartGuestItems;

  if (localStorage.guestsItemsInCart) {
    cartGuestItems = Object.keys(JSON.parse(localStorage.guestsItemsInCart)).length
  }

  const haveGuestCart = () => {
    return localStorage.guestsItemsInCart
  }

  useEffect(() => {
  }, [localStorage.guestsItemsInCart])


  useEffect(() => {
    dispatch(getCart(1)); //hardcore
  }, []);

  const [isAuth, setAuth] = useState<boolean>(false);
  const toogleAuth = () => setAuth(!isAuth);

  const stateWelcome = useSelector((state) => state["welcome"]);

  ////////////////////AUTENTICACION AUTOMATICA//////////////////////////////////////////////////
  useLayoutEffect(() => {
    if (Object.keys(localStorage).join().includes("token")) {
      axios.get(`${process.env.REACT_APP_HOST_BACKEND}/auth/autoLogin`, {
        headers: validationHeadersGenerator()
      }).then(e => {
        dispatch(getUserData(e.data))

        dispatch(login(true));
        toogleAuth()
      }).catch(e => null)
    }

  }
    , [])
  ////////////////////////////////////////////////////

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


  function close() {
    swal({
      title: "Cerrar sesión",
      text: "¿Desea cerrar sesión?",
      icon: "error",
      buttons: ["NO", "SI"]
      // timer: 2000,
    }).then(response => {
      if (response) {
        swal({ title: 'Adiós, vuelve pronto!', text: 'Suerte!', icon: "success", timer: 3000, buttons: [''] })
        setTimeout(() => {
          localStorage.clear();
          window.location.href = process.env.REACT_APP_HOST_FRONTEND || window.location.href;
        }, 2900);
      }
    })
  }
  let menu;
  let menuMask;
  let searchBar = <div className={style.SearchBarContainerHamgurguer}>
    <div className={style.searchBarHamburguer}>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className={style.searchInput}
      >
        <div className={style.inputContainerHamburguer}>
          <input
            placeholder="Buscar"
            className={style.searchInputHamburguer}
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
    <div className={style.buttonsHamburguer}>
      <Link to="/search" className={style.button}>
        Ofertas
      </Link>
      <Link to="/categories" className={style.button}>
        Categorías
      </Link>
      <Link to="/post" className={style.button}>
        Vender
      </Link>
    </div>
  </div>;
  if (showMenu) {
    menu = <div className={style.menuhamburguesa}>
      {
        !isAuth
          ? <div className={style.buttonsRightEnter}>
            <button className={style.buttonEnter} onClick={toogleEnter}>
              Entrar
            </button>
            <button className={style.buttonEnter} onClick={toogleRegister}>
              Registrarme
            </button>
            {searchBar}
          </div>
          : <div className={style.buttonsRightEnter}>
            <Link className={style.textDecoration} to="/panel">
              <button className={style.buttonEnter}>Panel</button>
            </Link>
            {searchBar}
            <button className={style.closeSesion} onClick={close}>
              Cerrar sesión
            </button>
            <span className={style.welcome} >
              Bienvenido {stateWelcome.nombre}
            </span>
          </div>
      }
    </div>;
    menuMask = <div className={style.menuMask} onClick={() => setShowMenu(!showMenu)}></div>
  }

  return (
    <div className={style.NavBar}>
      <div className={style.LogoContainer}>
        <Link to="/">
          <img src={logo} className={style.logo}></img>
        </Link>
      </div>
      {/* FIN PRIMER HIJO */}

      {/* SEGUNDO HIJO */}
      <div className={style.SearchBarContainer}>
        <div className={style.searchBar}>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className={style.searchInput}
          >
            <div className={style.inputContainer}>
              <input type="submit" readOnly value="🔎" className={style.lupa} />
              <input
                placeholder="Buscar birren"
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
          <Link to="/search" className={style.button}>
            Ofertas
          </Link>
          <Link to="/categories" className={style.button}>
            Categorías
          </Link>
          <Link to="/post" className={style.button}>
            Vender
          </Link>
        </div>
      </div>
      {/* FIN SEGUNDO HIJO */}

      {/* TERCER HIJO */}
      <div className={style.topRight} >
        {isAuth ?
          <div className={style.welcome} style={{ textAlign: "right", marginRight: "1em" }}>
            Bienvenido {stateWelcome.nombre}
          </div> : <div className={style.welcomeSpace}></div>}
        <div className={style.ButtonsNavBar}>
          <ModalFavorites isOpen={showFavorites} handleClose={toogleFavorites}>
            <FavoritesTab closeModal={toogleFavorites} />
          </ModalFavorites>
          {
            isAuth
              ? <button onClick={toogleFavorites} className={style.buttonFavorites}>
                <img className={style.buttonImg} src="https://image.flaticon.com/icons/png/512/1077/1077035.png" alt="Favorites" height="1vh" />
              </button>
              : null
          }
          <Link
            to="/cart" ////////FALTA METER EL ID DE USER
            className={style.buttonCart}
          ><div className={style.buttonImg}>
              <svg width="25" height="25" viewBox="0 0 698 710" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path d="M0.0900344 20.37C0.0900344 20.37 0.880043 -0.759993 18.88 0.0200073C36.88 0.800007 77.57 0.800006 77.57 0.800006C77.57 0.800006 104.96 -1.34999 108.09 31.52C109.9 49.5732 110.428 67.7321 109.67 85.86C109.67 86.03 109.67 86.17 109.67 86.33C109.39 89.09 108.67 115.89 109.67 120.54C110.67 125.19 129.23 175.33 129.23 175.33L203.44 392.59C203.944 394.047 204.889 395.31 206.143 396.206C207.397 397.102 208.899 397.586 210.44 397.59L560.67 399.87C562.203 399.869 563.697 399.395 564.95 398.513C566.203 397.63 567.153 396.383 567.67 394.94L658.83 139.53C659.346 138.087 660.295 136.838 661.549 135.955C662.802 135.073 664.297 134.599 665.83 134.6H681.35C681.643 134.58 681.937 134.58 682.23 134.6C685.82 135.06 706.98 139.28 691.9 174.46C675.73 212.19 611.09 405.92 608.99 412.22L608.9 412.52C608.29 414.67 600.07 440.52 558.07 439.77C518.39 439.06 275.29 440.92 229.7 441.27C227.74 441.286 225.865 442.076 224.485 443.467C223.105 444.859 222.33 446.74 222.33 448.7V469.7C222.33 470.149 222.37 470.598 222.45 471.04C223.04 474.04 226.14 485.36 240.33 486.71C255.81 488.19 542.7 485.5 576.05 485.18C578.587 485.176 581.092 485.744 583.38 486.84C585.435 487.773 587.24 489.178 588.65 490.94C599.88 504.44 589.96 524.99 572.39 525.22L219.89 529.75C219.404 529.752 218.918 529.708 218.44 529.62C213.26 528.62 192.57 523.43 185.29 500.54C178.67 479.72 179.54 449.1 180.58 441.61C180.755 440.387 180.625 439.14 180.2 437.98L70.2001 138.2C69.8835 137.332 69.7276 136.414 69.74 135.49L71.31 64.43C71.31 64.29 71.31 64.16 71.31 64.02C71.46 62.02 72.46 43.39 50.16 43.85C30.99 44.24 23.16 43.06 17.92 43.2C17.52 43.2 17.15 43.07 16.76 43.06C13.73 42.98 -1.30997 41.48 0.0900344 20.37Z" fill="black" />
                  <path d="M243.31 574.91C229.997 574.91 216.984 578.858 205.915 586.254C194.845 593.65 186.218 604.162 181.124 616.462C176.029 628.761 174.696 642.295 177.293 655.352C179.89 668.408 186.301 680.402 195.715 689.815C205.128 699.229 217.122 705.64 230.178 708.237C243.235 710.834 256.769 709.501 269.068 704.406C281.368 699.312 291.88 690.685 299.276 679.615C306.672 668.546 310.62 655.533 310.62 642.22C310.62 624.368 303.528 607.248 290.905 594.625C278.282 582.002 261.162 574.91 243.31 574.91V574.91ZM242.79 667.26C237.848 667.25 233.019 665.775 228.914 663.022C224.81 660.269 221.613 656.361 219.729 651.792C217.844 647.223 217.356 642.198 218.326 637.352C219.297 632.506 221.682 628.056 225.18 624.565C228.678 621.073 233.133 618.697 237.981 617.737C242.829 616.776 247.853 617.274 252.419 619.168C256.984 621.061 260.885 624.266 263.63 628.376C266.375 632.486 267.84 637.318 267.84 642.26C267.84 645.544 267.193 648.796 265.936 651.829C264.679 654.863 262.837 657.62 260.514 659.941C258.192 662.263 255.434 664.104 252.4 665.36C249.366 666.616 246.114 667.261 242.83 667.26H242.79Z" fill="black" />
                  <path d="M532.92 574.13C519.606 574.128 506.591 578.074 495.521 585.47C484.45 592.865 475.821 603.377 470.726 615.677C465.63 627.977 464.296 641.511 466.893 654.569C469.49 667.627 475.901 679.621 485.315 689.035C494.729 698.449 506.723 704.86 519.781 707.457C532.839 710.054 546.373 708.72 558.673 703.624C570.973 698.529 581.485 689.9 588.88 678.829C596.276 667.759 600.222 654.744 600.22 641.43C600.217 623.582 593.126 606.465 580.505 593.845C567.885 581.224 550.768 574.133 532.92 574.13V574.13ZM532.4 666.48C527.455 666.48 522.622 665.014 518.511 662.267C514.399 659.52 511.195 655.615 509.303 651.047C507.411 646.479 506.916 641.452 507.88 636.603C508.845 631.753 511.226 627.299 514.722 623.802C518.219 620.306 522.673 617.925 527.523 616.96C532.372 615.996 537.399 616.491 541.967 618.383C546.535 620.275 550.44 623.479 553.187 627.591C555.934 631.702 557.4 636.535 557.4 641.48C557.4 648.11 554.766 654.469 550.078 659.158C545.389 663.846 539.03 666.48 532.4 666.48Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="697.28" height="709.52" fill="white" />
                  </clipPath>
                </defs>
              </svg>                <g clipPath="url(#clip0)">
                <path d="M0.0900038 20.37C0.0900038 20.37 0.880013 -0.759993 18.88 0.0200073C36.88 0.800007 77.57 0.800006 77.57 0.800006C77.57 0.800006 104.96 -1.34999 108.09 31.52C109.9 49.5732 110.428 67.7321 109.67 85.86C109.67 86.03 109.67 86.17 109.67 86.33C109.39 89.09 108.67 115.89 109.67 120.54C110.67 125.19 129.23 175.33 129.23 175.33L203.44 392.59C203.944 394.047 204.889 395.31 206.143 396.206C207.397 397.102 208.899 397.586 210.44 397.59L560.67 399.87C562.202 399.869 563.697 399.395 564.95 398.513C566.203 397.63 567.153 396.383 567.67 394.94L658.83 139.53C659.346 138.087 660.295 136.838 661.549 135.955C662.802 135.073 664.297 134.599 665.83 134.6H681.35C681.643 134.58 681.937 134.58 682.23 134.6C685.82 135.06 706.98 139.28 691.9 174.46C675.73 212.19 611.09 405.92 608.99 412.22L608.9 412.52C608.29 414.67 600.07 440.52 558.07 439.77C518.39 439.06 275.29 440.92 229.7 441.27C227.74 441.286 225.865 442.076 224.485 443.467C223.104 444.859 222.33 446.74 222.33 448.7V469.7C222.33 470.149 222.37 470.598 222.45 471.04C223.04 474.04 226.14 485.36 240.33 486.71C255.81 488.19 542.7 485.5 576.05 485.18C578.587 485.176 581.092 485.744 583.38 486.84C585.435 487.773 587.24 489.178 588.65 490.94C599.88 504.44 589.96 524.99 572.39 525.22L219.89 529.75C219.404 529.752 218.918 529.708 218.44 529.62C213.26 528.62 192.57 523.43 185.29 500.54C178.67 479.72 179.54 449.1 180.58 441.61C180.755 440.387 180.624 439.14 180.2 437.98L70.2 138.2C69.8835 137.332 69.7276 136.414 69.74 135.49L71.31 64.43C71.31 64.29 71.31 64.16 71.31 64.02C71.46 62.02 72.46 43.39 50.16 43.85C30.99 44.24 23.16 43.06 17.92 43.2C17.52 43.2 17.15 43.07 16.76 43.06C13.73 42.98 -1.31 41.48 0.0900038 20.37Z" fill="black" />
                <path d="M243.35 709.52C280.519 709.52 310.65 679.389 310.65 642.22C310.65 605.051 280.519 574.92 243.35 574.92C206.181 574.92 176.05 605.051 176.05 642.22C176.05 679.389 206.181 709.52 243.35 709.52Z" fill="black" />
                <path d="M242.83 667.26C256.659 667.26 267.87 656.049 267.87 642.22C267.87 628.391 256.659 617.18 242.83 617.18C229.001 617.18 217.79 628.391 217.79 642.22C217.79 656.049 229.001 667.26 242.83 667.26Z" fill="#FDFEFE" />
                <path d="M532.92 708.73C570.089 708.73 600.22 678.599 600.22 641.43C600.22 604.261 570.089 574.13 532.92 574.13C495.751 574.13 465.62 604.261 465.62 641.43C465.62 678.599 495.751 708.73 532.92 708.73Z" fill="black" />
                <path d="M532.4 666.47C546.229 666.47 557.44 655.259 557.44 641.43C557.44 627.601 546.229 616.39 532.4 616.39C518.571 616.39 507.36 627.601 507.36 641.43C507.36 655.259 518.571 666.47 532.4 666.47Z" fill="#FDFEFE" />
              </g>
            </div>

            <span className={style.cartAmount}>{haveGuestCart() ? cartGuestItems : carts && carts.length}</span></Link>

          <Modal isOpen={isEnterOpen} handleClose={toogleEnter}>
            <Login closeModal={toogleEnter} toogleAuth={toogleAuth} />
          </Modal>

          <Modal isOpen={isRegisterOpen} handleClose={toogleRegister}>
            <Register toogleAuth={toogleAuth} closeModal={toogleRegister} toogleEnter={toogleEnter} toogleRegister={toogleRegister} />
          </Modal>
          {
            !isAuth
              ? <>
                <button className={style.buttonEnter} onClick={toogleEnter}>
                  Entrar
                </button>
                <button className={style.buttonEnter} onClick={toogleRegister}>
                  Registrarme
                </button>
              </>
              : <>
                <Link to="/panel">
                  <button className={style.buttonEnter}>Panel</button>
                </Link>
                <button className={style.closeSesion} onClick={close}>
                  Cerrar sesión
                </button>
              </>
          }

        </div >
      </div>
      <div className={style.mobileIcons}>
        <div className={style.searchFa}>
          {/* <FaSearch /> */}
        </div>
        <FontAwesomeIcon
          className={style.hamburguesa}
          icon={faBars}
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
      {menu}
      {menuMask}
    </div >


  );
}