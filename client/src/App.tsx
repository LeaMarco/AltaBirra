import React from 'react';
import logo from './logo.svg';
import Nav from './components/Nav/Nav';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import {useEffect} from 'react';
import './App.css';
import {User, fetchUsers} from './actions';
import {useSelector, useDispatch} from 'react-redux';
import {StoreState} from './reducers';

    
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
