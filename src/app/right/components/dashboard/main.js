// ========================================================================
//                             Dashboard
// ========================================================================

// Import libraries
import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import Stats from "./component/stats";
import Recent from "./component/recent";
import Triple from "./component/triple";
import Base from "./component/base";
import { date, day, month, year } from "../../../Misc/helper";
import { useSelector } from "react-redux";

// App
const Dashboard = () => {
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

    const personalData = useSelector((state) => state.personal);

    return (
        <Fragment>
            {status.loggedIn === true ? (
                <div className="dashboard" style={{ paddingBottom: "1.23rem" }}>
                    <header className="d-flex justify-content-between mx-1">
                        <div className="searchBar" style={{ width: "60%" }}>
                            <form action="" method="post">
                                <div className="dir input-group flex-nowrap">
                                    <button type="submit" style={{ paddingBottom: "3px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5e5e5e" className="bi bi-search-heart" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0-7.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
                                        </svg>
                                    </button>
                                    <input type="search" name="search" id="search" placeholder="Search ....." style={{ width: "100%", padding: "5px 10px" }} />
                                </div>
                            </form>
                        </div>
                        <div className="container desktop_hdr d-flex justify-content-end">
                            <div style={{ margin: "4px 30px 0 0" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#5e5e5e" className="bi bi-bell" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                </svg>
                            </div>
                            <div className="d-flex">
                                <div style={{ margin: "1px 10px 0 0" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#5e5e5e" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: "left" }}>
                                    <p className="text-capitalize" style={{ fontSize: "12px", margin: "0" }}>
                                        {personalData["firstname"]} {personalData["lastname"]} {personalData["other"]}
                                    </p>
                                    <p className="text-capitalize" style={{ fontSize: "12px", margin: "0" }}>
                                        {personalData["account"]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="container d-flex justify-content-between date_time">
                        <div className="mx-1">
                            <p style={{ textTransform: "capitalize", color: "#95aac9" }}>Overview</p>
                            <h5 style={{ textTransform: "uppercase", fontWeight: "bold", fontFamily: "Nunito" }}>Dashboard</h5>
                        </div>
                        <div className="mx-1">
                            <p style={{ textTransform: "capitalize" }}>
                                {date}, {day}
                            </p>
                            <h5 style={{ textTransform: "capitalize", color: "#2c7be5", fontFamily: "Nunito" }}>
                                {month}, {year}
                            </h5>
                        </div>
                    </div>

                    <Stats />

                    <Recent />

                    <Triple />

                    <Base />
                </div>
            ) : (
                <Navigate to="/login" replace={true} />
            )}
        </Fragment>
    );
};

export default Dashboard;
