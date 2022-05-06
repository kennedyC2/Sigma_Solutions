// ========================================================================
//                             TestKits
// ========================================================================

// Import libraries
import axios from "axios";
import { set } from "idb-keyval";
import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { store } from "../../../Misc/cacheStorage";
import AddKit from "./components/addkit";
import ListKits from "./components/listkits";

// App
const TestKits = () => {
    // fetch Data From Storage
    const testKits = useSelector((state) => state.testKits);
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
    const saveKit = async (e) => {
        e.preventDefault();
        const data = {};
        data["title"] = e.target[0].value.trim().replaceAll(" ", "_").toLowerCase();
        data["quantity"] = e.target[1].value;
        data["test"] = e.target[2].value;
        data["activity"] = [];

        //  Send
        try {
            const response = await axios({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                url: "http://localhost:5000/laboratory/testKits/add",
                data: { ...data, type: status.path.type, tokenID: status.key, companyID: status.path.companyID },
            });

            const result = response.data;

            // Update Services
            await set("services", result.services, store);

            // Update testKits
            await set("testKits", result.testKits, store);

            // Update storage
            await set("storage", result.storage, store);

            // Update State
            Dispatch({ type: "addKit", payload: result });
            document.getElementById(e.target.id).reset();
        } catch (error) {
            const response = error.response;
            console.log(response);
        }
    };

    // Click the submit button
    const submitForm = (e) => {
        console.log(e);
        e.target.parentNode.parentNode.childNodes[0].childNodes[0][3].click();
    };

    return status.loggedIn === true ? (
        <Fragment>
            <div className="users">
                {/* <nav> */}
                <div className="text-end rg_f py-2">
                    <div className="text-end">
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            New Kit
                        </button>
                    </div>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <ListKits data={testKits} />

                    {/* Modal */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <AddKit saveKit={saveKit} />
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

export default TestKits;
