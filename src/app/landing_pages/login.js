// Import Dependencies
import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Misc/spinner";
import { useDispatch } from "react-redux";

// Component
const Login = () => {
    // State
    const [spin, setSpin] = useState(0);
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    // Submit Form
    const submitForm = async (e) => {
        e.preventDefault();

        // Define Data
        const data = {};
        data["email"] = e.target[0].value;
        data["password"] = e.target[1].value;

        try {
            const response = await axios({
                method: e.target.method,
                url: "http://localhost:5000/account/login",
                data: data,
            });

            const p = document.createElement("p");
            p.setAttribute("class", "alert-success m-0");
            p.innerText = response["data"]["Message"];

            // Save to Local Storage
            localStorage.setItem("status", JSON.stringify(response["data"]["auth"]));

            // Store Data
            const payload = {
                auth: response["data"]["auth"],
                personal: response["data"]["data"],
            };

            Dispatch({ type: "personalDetails", payload: payload });

            setTimeout(() => {
                document.getElementById("box-2").replaceChild(p, document.getElementById("box-2").childNodes[0]);
                setTimeout(() => {
                    setSpin(1);
                    setTimeout(() => {
                        navigate("/app", { replace: true, state: response["data"]["auth"] });
                    }, 5000);
                }, 2000);
            }, 2000);
        } catch (error) {
            const response = error.response;
            const p = document.createElement("p");
            p.setAttribute("class", "alert-danger m-0");
            p.innerText = response["data"]["Error"];
            setTimeout(() => {
                document.getElementById("box-2").replaceChild(p, document.getElementById("box-2").childNodes[0]);
            }, 2000);
        }
    };

    return (
        <Fragment>
            {spin === 0 ? (
                <div className="w-100">
                    <div className="bbs" style={{ width: "100%" }}>
                        <div className="m-auto py-1" style={{ width: "85%" }}>
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <div className="container-fluid px-2">
                                    <Link className="navbar-brand" to="/">
                                        WELCOME
                                    </Link>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                        <div className=" d-flex justify-content-end"></div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <form className="px-4 py-3" method="POST" action="account/login" id="login" onSubmit={(e) => submitForm(e)}>
                        <div className="text-center pb-3">
                            <div id="box-2" className="p-1 text-center, m-auto" style={{ minHeight: "30px", transition: ".5s", width: "60%" }}>
                                <p className="alert-success m-0"></p>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailLogin" className="form-label ps-1">
                                Email address: <span className="text-danger fs-5">*</span>
                            </label>
                            <input type="email" className="form-control form-control-sm" placeholder="someone@email.com" id="emailLogin" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="loginPass" className="form-label ps-1">
                                Password:
                            </label>
                            <input type="password" className="form-control form-control-sm" placeholder="**************" id="loginPass" required />
                            <div id="loginPass" className="form-text text-danger ps-1">
                                Must be 8-20 characters long.
                            </div>
                        </div>
                        <div className="text-end pb-4 d-flex justify-content-end">
                            <div className="d-inline-flex pt-1" style={{ fontSize: "13px" }}>
                                <p className="mb-0 me-2">Don't have an account?</p>
                                <Link to="/register" className="d-inline-flex text-decoration-underline me-3">
                                    Register
                                </Link>
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm px-4">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};

export default Login;
