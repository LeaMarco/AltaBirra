import React from "react";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import "./App.css";
import Post from "./components/Post/Post";
import EditPost from "./components/Post/EditPost";
import { Route } from "react-router-dom";
import DetailBeer from "./components/DetailBeer/DetailBeer";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Compra from "./components/Compra/Compra";
import Rate from "./components/Rate/Rate";
// import { developerTools } from "./developerTools";
// import { BeeryButton } from "./components/styled_components";
// developerTools({ consoleInfo: true });
import UserPanel from "./components/UserPanel/UserPanel";
import BuyHistory from "./components/BuyHistory/BuyHistory";
import SellHistory from "./components/SellHistory/SellHistory";
import E_Unauthorized from "./components/E_Unauthorized/E_Unauthorized";
import Admin from "./components/Admin/Admin";
import ViewsHistory from "./components/ViewHistory/ViewHistory";
import VerifyAccount from "./components/VerifyAccount/VerifyAccount";
import Selling from "./components/Selling/Selling";
import Footer from "./components/Footer/Footer";
import NoAuthorized from "./components/NoAuthorized/NoAuthorized";

function App() {

  function autorizeComponent(Component) {
    return Object.keys(localStorage).join().includes('token') ? Component : NoAuthorized
  }

  return (
    <div className="App">

      <Route path="/" component={Nav} />
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />

      <Route exact path="/post" component={autorizeComponent(Post)} />
      <Route exact path="/editpost/:id" component={autorizeComponent(EditPost)} />
      <Route exact path="/detailBeer/:id" component={DetailBeer} />
      <Route exact path="/categories" component={autorizeComponent(Categories)} />
      <Route exact path="/cart/:id" component={Cart} />

      <Route exact path="/compra/:id" component={autorizeComponent(Compra)} />

      <Route exact path="/panel" component={autorizeComponent(UserPanel)} />

      <Route exact path="/historialCompras" component={autorizeComponent(BuyHistory)} />
      <Route exact path="/historialVistos" component={autorizeComponent(ViewsHistory)} />
      <Route exact path="/historialVentas" component={autorizeComponent(SellHistory)} />
      <Route exact path="/calificar/:id" component={autorizeComponent(Rate)} />
      <Route exact path="/vendiendo" component={autorizeComponent(Selling)} />
      <Route exact path="/verificarUsuario/:user" component={autorizeComponent(VerifyAccount)} />

      <Route exact path="/noAutorizado" component={NoAuthorized} />

      <Route path="/admin" component={autorizeComponent(Admin)} />

      <Route exact path="/" component={Footer} />
    </div>
  );
}

export default App;



