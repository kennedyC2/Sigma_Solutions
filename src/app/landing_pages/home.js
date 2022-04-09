// Import Dependencies
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, Navigate } from "react-router-dom";
import { states } from "./../Misc/helper";
import axios from "axios";

// Component
const Home = () => {
    const location = useLocation() || { loggedIn: false };
    const personal = useSelector((state) => state.personal);

    // Confirm log In status
    const [status] = useState(() => {
        const data = JSON.parse(localStorage.getItem("status")) || { loggedIn: false };
        return data.loggedIn || false;
    });

    const saveCompanyData = async (e) => {
        e.preventDefault();

        // Get Token ID
        const tokenID = JSON.parse(localStorage.getItem("status")).token.key;

        // Define Data
        const data = {};
        data["name"] = e.target[0].value;
        data["type"] = e.target[1].value;
        data["phone"] = e.target[2].value;
        data["email"] = e.target[3].value;
        data["reg_no"] = e.target[4].value;
        data["address"] = e.target[5].value;
        data["state"] = e.target[6].value;
        data["country"] = e.target[7].value;
        data["tokenID"] = tokenID;

        try {
            const response = await axios({
                method: e.target.method,
                url: "http://localhost:5000/company/create",
                data: data,
            });

            console.log(response);

            // const p = document.createElement("p");
            // p.setAttribute("class", "alert-success m-0");
            // p.innerText = response["data"]["Message"];

            // // Save to Local Storage
            // localStorage.setItem("status", JSON.stringify(response["data"]["auth"]));

            // // Store Data
            // const payload = {
            //     auth: response["data"]["auth"],
            //     personal: response["data"]["data"],
            // };

            // Dispatch({ type: "personalDetails", payload: payload });

            // setTimeout(() => {
            //     document.getElementById("box-2").replaceChild(p, document.getElementById("box-2").childNodes[0]);
            //     setTimeout(() => {
            //         setSpin(1);
            //         setTimeout(() => {
            //             navigate("/app", { replace: true, state: response["data"]["auth"] });
            //         }, 5000);
            //     }, 2000);
            // }, 2000);
        } catch (error) {
            const response = error.response;
            console.log(response);
            // const p = document.createElement("p");
            // p.setAttribute("class", "alert-danger m-0");
            // p.innerText = response["data"]["Error"];
            // setTimeout(() => {
            //     document.getElementById("box-2").replaceChild(p, document.getElementById("box-2").childNodes[0]);
            // }, 2000);
        }
        // Dispatch({ type: "company", payload: data });
    };

    const submitCompanyForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[0][8].click();
    };

    return (
        <Fragment>
            {location.state.loggedIn === true && status === true ? (
                <div className="home w-100">
                    <div className="bbs px-5 w-100">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container-fluid px-2">
                                <Link className="navbar-brand" to="#">
                                    WELCOME
                                </Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                    <div className=" d-flex justify-content-end">
                                        <div className="me-4 pt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#5e5e5e" className="bi bi-bell" viewBox="0 0 16 16">
                                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                            </svg>
                                        </div>
                                        <div className="d-flex">
                                            <div style={{ marginRight: "10px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" fill="#5e5e5e" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                                </svg>
                                            </div>
                                            <div className="text-start">
                                                <p className="text-capitalize" style={{ fontSize: "12px", margin: "0" }}>
                                                    {personal.firstname} {personal.lastname} {personal.other}
                                                </p>
                                                <p className="text-capitalize" style={{ fontSize: "12px", margin: "0" }}>
                                                    {personal.account}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="m-auto mt-5" style={{ width: "30%" }}>
                        <div style={{ height: "calc(100vh - 200px)", border: ".1rem solid #e3ebf6", borderRadius: "0.75rem" }}>
                            {personal.company.length > 0 ? (
                                <ol className="list-group">
                                    {personal.company.map((item, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                            <div className="ms-0 me-auto">
                                                <div className="fw-bold">Subheading</div>
                                                {item.name}
                                            </div>
                                            <span className="badge bg-primary rounded-pill">14</span>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100">
                                    <h6 style={{ color: "rgba(149, 170, 201, .8)" }}>Nothing Here Yet</h6>
                                </div>
                            )}
                        </div>
                        {/* <!-- Button trigger modal --> */}
                        <button type="button" className="btn btn-secondary mt-2 w-100" data-bs-toggle="modal" data-bs-target="#homeDrop">
                            +
                        </button>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="homeDrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="homeDropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "800px" }}>
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <form action="#" method="POST" className="pt-3 d-flex justify-content-between" id="formPr" onSubmit={(e) => saveCompanyData(e)}>
                                            <div className="pe-3 ps-2" style={{ width: "50%" }}>
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label">
                                                        Name:
                                                    </label>
                                                    <input type="text" className="form-control form-control-sm" name="name" id="name" placeholder="Phantom Solutions" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="type" className="form-label">
                                                        Type:
                                                    </label>
                                                    <select className="form-select form-select-sm" name="account" defaultValue="laboratory" id="account">
                                                        <option value="Laboratory">Laboratory</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="phone" className="form-label">
                                                        Phone:
                                                    </label>
                                                    <input type="text" className="form-control form-control-sm" name="phone" id="phone" placeholder="+2340000000000" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">
                                                        Email:
                                                    </label>
                                                    <input type="email" className="form-control form-control-sm" name="email" id="email" placeholder="Someone@email.com" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="reg_no" className="form-label">
                                                        Registration Number:
                                                    </label>
                                                    <input type="text" className="form-control form-control-sm" name="reg_no" id="reg_no" placeholder="RS56-7483-929" required />
                                                </div>
                                            </div>
                                            <div className="ps-3 pe-2" style={{ width: "50%" }}>
                                                <div className="mb-3">
                                                    <label htmlFor="address" className="form-label">
                                                        Address:
                                                    </label>
                                                    <textarea className="form-control" name="address" id="address" placeholder="Imo state Teaching Hospital, Orlu." rows="5" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="state" className="form-label">
                                                        State:
                                                    </label>
                                                    <select className="form-select form-select-sm" name="state" id="state" required>
                                                        {states.map((key, index) => (
                                                            <option key={index} value={key}>
                                                                {key.split(" ")[0]}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="country" className="form-label">
                                                        Country:
                                                    </label>
                                                    <select className="form-select form-select-sm" name="country" id="country" defaultValue="Nigeria" required>
                                                        <option value="Nigeria">Nigeria</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3 text-end">
                                                    <button type="submit" className="hide">
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="button" className="btn btn-primary btn-sm" onClick={(e) => submitCompanyForm(e)}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/login" replace={true} />
            )}
        </Fragment>
    );
};

// Export
export default Home;
