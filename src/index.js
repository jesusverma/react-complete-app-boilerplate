import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "Store/store";
import * as FIREBASE_INIT from "./firebase/firebase-init";

FIREBASE_INIT.intializeFirebase();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
