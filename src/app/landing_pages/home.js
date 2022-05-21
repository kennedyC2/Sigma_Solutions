// Import Dependencies
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { states, hours, domain } from "./../Misc/helper";
import { get_data_2 } from "../Misc/cacheStorage";
import { Auth } from "../Misc/initialState";
import Spinner from "../Misc/spinner";
import axios from "axios";
import { set } from "idb-keyval";
import { store } from "../Misc/cacheStorage";
import { Notification_A, Notification_B } from "../Misc/notification";

// Component
const Home = () => {
    const Dispatch = useDispatch();
    const navigate = useNavigate();
    const personal = useSelector((state) => state.personal || Auth(Dispatch));
    const image = domain + "image/" + personal.display;

    // Confirm log In status
    const [status] = useState(
        () =>
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                token: false,
                path: {
                    type: false,
                    companyID: false,
                },
            }
    );

    useEffect(() => {
        const company = document.querySelectorAll(".point li");

        // Add EventListener
        company.forEach((each) => {
            each.addEventListener("click", async () => {
                // New status
                const data = status;
                // Get Variables
                const path = {
                    tokenID: status.key,
                    type: each.dataset.typ,
                    companyID: each.dataset.cid,
                };

                data["path"] = path;

                // Update Storage
                localStorage.setItem("status", JSON.stringify(data));

                // Update Cache On EVERY RENDER && RE-RENDER
                try {
                    await get_data_2(status.path.type, status.path.companyID, status.key, status.ff);
                    navigate("/app/laboratory", { replace: true });
                } catch (error) {
                    // Notify
                    Notification_B("Something Went Wrong, Please Try Again Later", false);
                }
            });
        });
    });

    const saveCompanyData = async (e) => {
        e.preventDefault();

        // Get Token ID
        const tokenID = JSON.parse(localStorage.getItem("status")).key;

        // Define Data
        const data = {};
        data["name"] = e.target[0].value;
        data["account"] = e.target[1].value;
        data["type"] = e.target[1].value;
        data["phone"] = e.target[2].value;
        data["email"] = e.target[3].value;
        data["reg_no"] = e.target[4].value;
        data["address"] = e.target[5].value;
        data["state"] = e.target[6].value;
        data["country"] = e.target[7].value;
        data["tokenID"] = tokenID;

        // time
        const now = new Date(Date.now());
        data["time"] = `${hours[now.getHours()].split(":")[0]}:${now.getMinutes() < 10 ? "0" + now.getMinutes().toString() : now.getMinutes().toString()} ${hours[now.getHours()].split(":")[1]}`;
        data["date"] = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        try {
            const response = await axios({
                method: e.target.method,
                url: domain + data.type.toLowerCase() + "/create",
                data: data,
            });

            // Update
            set("personal", response.data.details, store);

            setTimeout(() => {
                e.target.parentNode.parentNode.childNodes[1].childNodes[0].click();
                Dispatch({ type: "profile", payload: response.data.details });
                document.getElementById(e.target.id).reset();
            }, 2000);
        } catch (error) {
            // // Notify
            Notification_A(error.response.data.error, false);
        }
    };

    const submitCompanyForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[1][8].click();
    };

    return status.loggedIn === true ? (
        <Fragment>
            {personal.company !== undefined ? (
                <div className="home w-100 h-100" style={{ backgroundColor: "#ffffff" }}>
                    <div className="bbs px-5 w-100">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container-fluid px-2">
                                <Link className="navbar-brand" to="#">
                                    SIGMA
                                </Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                    <div>
                                        <img src={image} alt="Profile_Picture" className="rounded-circle" width="40" height="40" />
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="m-auto mt-5 d-flex align-items-center justify-content-center rounded" style={{ width: "33%", height: "78%" }}>
                        <div className="w-100">
                            <div style={{ height: "calc(100vh - 190px)" }}>
                                {personal.company.length > 0 ? (
                                    <ol className="list-group point">
                                        {personal.company.map((item, index) => (
                                            <li key={index} className="list-group-item rounded mb-1" data-cid={item.companyID} data-typ={item.type}>
                                                <div className="ms-0 me-auto">
                                                    <div className="fw-bold text-capitalize mb-1">{item.name}</div>
                                                    <div className="d-flex justify-content-between" style={{ fontSize: "13px" }}>
                                                        <p className="mb-0" data-cid={item.companyID}>
                                                            Created: {item.date}
                                                        </p>
                                                        <p className="mb-0">{item.time}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center h-100 w-100"
                                        style={{
                                            border: "0.1rem solid #e3ebf6",
                                        }}
                                    >
                                        <h6 style={{ color: "rgba(149, 170, 201, .8)" }}>Nothing Here Yet</h6>
                                    </div>
                                )}
                            </div>
                            {/* <!-- Button trigger modal --> */}
                            <button type="button" className="btn btn-secondary mt-2 w-100" data-bs-toggle="modal" data-bs-target="#homeDrop">
                                Add
                            </button>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="homeDrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="homeDropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "800px" }}>
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="notify text-center mt-2"></div>
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
                </div>
            ) : (
                <Spinner />
            )}
        </Fragment>
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

// Export
export default Home;
