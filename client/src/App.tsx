import React from "react";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import "./App.css";
import Post from "./components/Post/Post";
import EditPost from "./components/Post/EditPost";
import { Route } from "react-router-dom";
import DetailBeer from './components/DetailBeer/DetailBeer';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/" component={Home} />
      <Route exact path="/search/:title" component={Search} />
      <Route exact path="/post" component={Post} />
      <Route exact path="/Editpost" component={EditPost} />
      <Route exact path="/detailBeer/:id" component={DetailBeer} />
    </div>
  )
}

export default App;
