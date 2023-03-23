import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";
import AlertTemplate from "react-alert-template-basic-with-icons";
import { positions, transitions, Provider as AlertProvider } from "react-alert";



const options = {
  setTimeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);