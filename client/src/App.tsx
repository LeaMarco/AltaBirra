import React from "react";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import "./App.css";
import Post from "./components/Post/Post";
import EditPost from "./components/Post/EditPost";
import { Route } from "react-router-dom";
import DetailBeer from './components/DetailBeer/DetailBeer';
import Categories from "./components/Categories/Categories";
import Cart from './components/Cart/Cart';
import Compra from './components/Compra/Compra';
import Rate from "./components/Rate/Rate";
import Historial from "./components/History/History";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/post" component={Post} />
      <Route exact path="/editpost/:id" component={EditPost} />
      <Route exact path="/detailBeer/:id" component={DetailBeer} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/cart/:id" component={Cart} />
      <Route exact path="/compra/:id" component={Compra} />
      <Route exact path="/calificar/:id" component={Rate} />
      <Route exact path="/historial" component={Historial} />
    </div>
  )
}

export default App;

