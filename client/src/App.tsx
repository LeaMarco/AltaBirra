import React from 'react';
import logo from './logo.svg';
import Nav from './components/Nav/Nav';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';

  
    function App() {
      return (
        <BrowserRouter>
      <div className="App">
        <Nav/>
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
