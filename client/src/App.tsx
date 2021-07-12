// import React from 'react';
import Nav from './components/Nav/Nav';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import Home from './components/Home/Home';
import DetailBeer from './components/DetailBeer/DetailBeer';
import './App.css';
import{Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Route exact path="/detailBeer/:id" component={DetailBeer}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
