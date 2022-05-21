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
import { Notification_A } from "../../../Misc/notification";
import { domain } from "../../../Misc/helper";

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
                url: domain + "laboratory/update/services",
                data: { ...data, type: status.path.type, tokenID: status.key, companyID: status.path.companyID },
            });

            // Update Services
            await set("services", response.data.services, store);

            // Update stats
            await set("stats", response.data.stats, store);

            // Update top_5
            await set("top_5", response.data.top_5, store);

            // Close
            e.target.parentNode.parentNode.childNodes[1].childNodes[0].click();

            // Update State
            Dispatch({ type: "addServices", payload: response.data });

            // Reset Form
            document.getElementById(e.target.id).reset();
        } catch (error) {
            // Notify
            Notification_A(error.response.data.error, false);
        }
    };

    // Click the submit button
    const submitForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[1][3].click();
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
                                    <div className="notify text-center mt-2"></div>
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
