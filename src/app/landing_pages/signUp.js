// Import Dependencies
import React, { useState } from "react";
import { sex, RF_days, months, hours, CalenderYear, states } from "../Misc/helper";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Misc/spinner";
import { Notification_A } from "../Misc/notification";
import { domain } from "../Misc/helper";

// Component
const SignUP = () => {
    // State
    const [spin, setSpin] = useState(0);
    const navigate = useNavigate();

    // Submit Form
    const submitForm = async (e) => {
        e.preventDefault();

        // Define Data
        const data = {};
        data["firstname"] = e.target[0].value;
        data["lastname"] = e.target[1].value;
        data["other"] = e.target[2].value;
        data["sex"] = e.target[3].value;
        data["phone"] = e.target[4].value;
        data["email"] = e.target[5].value;
        data["day"] = e.target[6].value;
        data["month"] = e.target[7].value;
        data["year"] = e.target[8].value;
        data["state"] = e.target[9].value;
        data["country"] = e.target[10].value;
        data["password"] = e.target[11].value;

        // time
        const now = new Date(Date.now());
        data["time"] = `${hours[now.getHours()].split(":")[0]}:${now.getMinutes() < 10 ? "0" + now.getMinutes().toString() : now.getMinutes().toString()} ${hours[now.getHours()].split(":")[1]}`;
        data["date"] = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        try {
            const response = await axios({
                method: e.target.method,
                url: domain + "account/signUp",
                data: data,
            });

            setTimeout(() => {
                setSpin(1);
                localStorage.setItem("pending", JSON.stringify({ email: data.email }));

                setTimeout(() => {
                    navigate("/account/verification", { replace: true });
                }, 5000);
            }, 2000);
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
            <form action="account/signUp" method="POST" className="px-4 py-1" id="SignUP" onSubmit={(e) => submitForm(e)}>
                <div className="d-flex justify-content-between">
                    <div className="pe-3 ps-2" style={{ width: "49%" }}>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">
                                Firstname: <span className="text-danger fs-5">*</span>
                            </label>
                            <input type="text" className="form-control form-control-sm" name="firstname" id="firstname" placeholder="Amadi" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">
                                Lastname: <span className="text-danger fs-5">*</span>
                            </label>
                            <input type="text" className="form-control form-control-sm" name="lastname" id="lastname" placeholder="Precious" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="other" className="form-label">
                                Other (names): <span className="text-danger fs-5">*</span>
                            </label>
                            <input type="text" className="form-control form-control-sm" name="other" id="other" placeholder="Chioma" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sex" className="form-label">
                                Sex: <span className="text-danger fs-5">*</span>
                            </label>
                            <select className="form-select form-select-sm" name="sex" aria-label="Default select" required>
                                <option value="" disabled>
                                    select
                                </option>
                                {sex.map((key, index) => (
                                    <option key={index} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone: <span className="text-danger fs-5">*</span>
                            </label>
                            <input type="text" className="form-control form-control-sm" name="phone" id="phone" placeholder="+2340000000000" required />
                        </div>
                    </div>
                    <div className="ps-3 pe-2" style={{ width: "49%" }}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email: <span className="text-danger fs-5">*</span>
                            </label>
                            <input type="email" className="form-control form-control-sm" name="email" id="email" placeholder="someone@email.com" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                                Date of Birth: <span className="text-danger fs-5">*</span>
                            </label>
                            <div className="input-group">
                                <select className="form-select form-select-sm me-1" name="day" defaultValue={"Default"} aria-label="Default select" required>
                                    <option value="Default" disabled>
                                        Day
                                    </option>
                                    {RF_days.map((key, index) => (
                                        <option key={index} value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                                <select className="form-select form-select-sm me-1" name="month" aria-label="Default select" defaultValue={"Default"} style={{ width: "90px" }} required>
                                    <option value="Default" disabled>
                                        Month
                                    </option>
                                    {months.map((key, index) => (
                                        <option key={index} value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                                <select className="form-select form-select-sm" name="year" aria-label="Default select" defaultValue={"Default"} required>
                                    <option value="Default" disabled>
                                        Year
                                    </option>
                                    {CalenderYear().map((key, index) => (
                                        <option key={index} value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">
                                State: <span className="text-danger fs-5">*</span>
                            </label>
                            <select className="form-select form-select-sm" name="state" id="state" required>
                                <option value="" disabled>
                                    select
                                </option>
                                {states.map((key, index) => (
                                    <option key={index} value={key}>
                                        {key.split(" ")[0]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">
                                Country: <span className="text-danger fs-5">*</span>
                            </label>
                            <select className="form-select form-select-sm" name="country" id="country" required>
                                <option value="" disabled>
                                    select
                                </option>
                                <option value="Nigeria">Nigeria</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password: <span className="text-danger fs-5">*</span>
                            </label>
                            <input type="password" className="form-control form-control-sm" name="password" id="password" placeholder="***************" required />
                            <div id="password" className="form-text text-danger ps-1">
                                Must be 8-20 characters long.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 mb-4 text-end d-flex justify-content-end">
                    <div className="d-inline-flex pt-1" style={{ fontSize: "13px" }}>
                        <p className="mb-0 me-2">Already have an account?</p>
                        <Link to="/login" className="d-inline-flex text-decoration-underline me-3">
                            Login
                        </Link>
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm px-3 mb-1">
                        Register
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <Spinner />
    );
};

export default SignUP;
