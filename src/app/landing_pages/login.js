// Import Dependencies
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Misc/spinner";
import { get_data_1, get_data_2 } from "../Misc/cacheStorage";
import { useDispatch } from "react-redux";
import { Auth } from "../Misc/initialState";
import { Notification_A } from "../Misc/notification";

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
        data["account"] = e.target[2].checked === true ? "admin" : "user";

        try {
            const response = await axios({
                method: e.target.method,
                url: "http://localhost:5000/account/login",
                data: data,
            });

            // Save to Local Storage
            localStorage.setItem("status", JSON.stringify(response.data.auth));

            setTimeout(async () => {
                // Spinner
                setSpin(1);

                // GEt Cache
                Auth(Dispatch);

                setTimeout(async () => {
                    if (response.data.auth.ff === "admin") {
                        // Cache Details
                        await get_data_1(response.data.auth.key);
                        navigate("/app", { replace: true });
                    } else {
                        // Cache Details
                        await get_data_2(response.data.auth.path.type, response.data.auth.path.companyID, response.data.auth.key, response.data.auth.ff);
                        navigate("/app/laboratory", { replace: true });
                    }
                }, 3000);
            }, 3000);
        } catch (error) {
            // Notify
            Notification_A(error.response.data.error, false);
        }
    };

    return spin === 0 ? (
        <div className="w-100" style={{ backgroundColor: "#ffffff", border: "0.1rem solid #e3ebf6" }}>
            <div className="text-center mt-4 mb-1">
                <Link to="/" className="d-inline-flex text-decoration-none text-reset mt-3">
                    <h4>SIGMA</h4>
                </Link>
            </div>
            <div className="notify text-center mb-2"></div>
            <form className="px-4 py-1 mb-4" method="POST" action="account/login" id="login" onSubmit={(e) => submitForm(e)}>
                <div className="mb-3">
                    <label htmlFor="emailLogin" className="form-label ps-1">
                        Email address:
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
                <div className="form-check mb-3 pt-2">
                    <input className="form-check-input" type="checkbox" value="admin" id="adminCheck" />
                    <label className="form-check-label ps-1" htmlFor="adminCheck" style={{ fontSize: "13px" }}>
                        Administrator
                    </label>
                </div>
                <div className="text-end pt-3 d-flex justify-content-end">
                    <div className="d-inline-flex pt-1" style={{ fontSize: "13px" }}>
                        <p className="mb-0 me-2" style={{ fontSize: "11px", marginTop: "2px" }}>
                            Don't have an account?
                        </p>
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
    );
};

export default Login;
