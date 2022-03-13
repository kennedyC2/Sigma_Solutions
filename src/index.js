//  Import libraries
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import Left from "./app/left/left";
import Right from "./app/right/right";

// App
const App = () => {
    return (
        <div className="ext d-lg-flex vw-100 vh-100">
            <Left />
            <Right />
        </div>
    );
};

ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.querySelector("#root")
);
