// ========================================================================
//                             Services
// ========================================================================

// Import libraries
import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddForm from "./components/form";
import SelectedTests from "./components/selectedTest";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { set } from "idb-keyval";
import { store } from "../../../Misc/cacheStorage";

// App
const Services = () => {
    // fetch Data From Storage
    const testData = useSelector((state) => state.database);
    const services = useSelector((state) => state.services);
    const Dispatch = useDispatch();

    // Confirm log In status
    const [status] = useState(
        () =>
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                key: false,
                path: {
                    type: false,
                    companyID: false,
                },
            }
    );

    // Save Selected Services
    const saveServices = async (e) => {
        e.preventDefault();
        const data = {};
        data["title"] = e.target[0].value.replaceAll(" ", "_");
        data["category"] = e.target[1].value.replaceAll(" ", "_");
        data["cost"] = e.target[2].value;
        data["description"] = e.target[3].value;
        data["name"] = testData[e.target[1].value]["name"];

        //  Send
        try {
            const response = await axios({
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                url: "http://localhost:5000/laboratory/update/services",
                data: { ...data, type: status.path.type, tokenID: status.key, companyID: status.path.companyID },
            });

            const result = response.data;
            console.log(result);

            // Update Services
            await set("services", result.services, store);

            // Update stats
            await set("stats", result.stats, store);

            // Update top_5
            await set("top_5", result.top_5, store);

            // Update State
            Dispatch({ type: "addServices", payload: data });
            document.getElementById(e.target.id).reset();
        } catch (error) {
            const response = error.response;
            console.log(response);
        }
    };

    // Click the submit button
    const submitForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[0][4].click();
    };

    return status.loggedIn === true ? (
        <Fragment>
            <div className="services">
                {/* <nav> */}
                <div className="text-end rg_f py-2">
                    <div className="text-end">
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Add Services
                        </button>
                    </div>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <SelectedTests data={services} />

                    {/* Modal */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ width: "430px" }}>
                            <div className="modal-content">
                                <div className="modal-body">
                                    <AddForm testData={testData} saveServices={saveServices} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={(e) => submitForm(e)}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default Services;
