// ========================================================================
//                             Users
// ========================================================================

// Import libraries
import axios from "axios";
import { get, set } from "idb-keyval";
import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { store } from "../../../Misc/cacheStorage";
import AddUser from "./components/addUser";
import ListUsers from "./components/listUsers";
import { Notification_A } from "../../../Misc/notification";

// App
const Users = () => {
    // fetch Data From Storage
    const users = useSelector((state) => state.users);
    const personal = useSelector((state) => state.personal);
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
    const saveUsers = async (e) => {
        e.preventDefault();

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
        data["account_type"] = e.target[9].value;
        data["password"] = e.target[10].value;
        data["admin"] = personal.email;

        //  Send
        try {
            const response = await axios({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                url: "http://localhost:5000/laboratory/users/create",
                data: { ...data, type: status.path.type, tokenID: status.key, companyID: status.path.companyID },
            });

            const result = response.data;

            // Update Users
            const users = await get("users", store);
            users[result.user.details.email.split("@")[0]] = result.user;
            await set("users", users, store);

            // Update Stats
            await set("stats", result.stats, store);

            // Close
            e.target.parentNode.parentNode.childNodes[1].childNodes[0].click();

            // Update State
            Dispatch({ type: "addUser", payload: result });
            document.getElementById(e.target.id).reset();
        } catch (error) {
            // Notify
            Notification_A(error.response.data.error, false);
        }
    };

    // Click the submit button
    const submitForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[1][11].click();
    };

    return status.loggedIn === true ? (
        <Fragment>
            <div className="users">
                {/* <nav> */}
                <div className="text-end rg_f py-2">
                    <div className="text-end">
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-outline-primary btn-sm px-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Add User
                        </button>
                    </div>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <ListUsers data={users} />

                    {/* Modal */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "800px" }}>
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="notify text-center mt-2"></div>
                                    <AddUser saveUsers={saveUsers} />
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

export default Users;
