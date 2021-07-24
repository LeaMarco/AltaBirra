import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; //Sirve para proveer el estado global de redux a los componentes de React
import store from "./store"; //importa la store creada en otro lado

console.log(process.env)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*Le paso store a todo para que tenga acceso a las variables globales */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
