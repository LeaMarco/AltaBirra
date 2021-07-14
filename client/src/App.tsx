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
    </div>
  )
}

export default App;

