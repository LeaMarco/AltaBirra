import React from 'react';
import Nav from './components/Nav/Nav';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css';
import Post from './components/Post/Post';
import EditPost from './components/Post/EditPost';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Home />
        <Post/>
      </div>
    </BrowserRouter>
  );
}

export default App;
