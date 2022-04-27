import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
<Provider store={store}>
    <SnackbarProvider maxSnack={3}>
    <App></App>
    </SnackbarProvider>
    </Provider>, document.getElementById("root"));

serviceWorkerRegistration.register();
