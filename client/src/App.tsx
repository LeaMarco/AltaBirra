import React from 'react';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import './App.css';
import Post from './components/Post/Post';
import EditPost from './components/Post/EditPost';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
      <Route exact path="/" component={Home} />
      <Route path="/:title" component={Search} />
      <Route path="/Post" component={Post} />
    </div>
  );
}

export default App;
