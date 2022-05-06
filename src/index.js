//  Import libraries
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Index from "./app/landing_pages/index";
import Login from "./app/landing_pages/login";
import SignUP from "./app/landing_pages/signUp";
import Home from "./app/landing_pages/home";
import App from "./app/main";
import ProtectedRoute from "./app/Misc/private";
import "./index.css";

// Base
const Base = () => {
    return (
        <div className="ext d-lg-flex align-items-center w-100 h-100">
            <Routes>
                <Route path="/" exact element={<Index />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/register" exact element={<SignUP />} />
                <Route path="/app" element={<ProtectedRoute />}>
                    <Route path="/app" exact element={<Home />} />
                    <Route path="/app/laboratory/*" exact element={<App />} />
                </Route>
            </Routes>
        </div>
    );
};

ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <Base />
        </Provider>
    </BrowserRouter>,
    document.querySelector("#root")
);
