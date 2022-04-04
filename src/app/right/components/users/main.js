// ========================================================================
//                             Users
// ========================================================================

// Import libraries
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddUser from "./components/addUser";
import ListUsers from "./components/listUsers";

// App
const Users = () => {
    // fetch Data From Storage
    const users = useSelector((state) => state.users);

    const Dispatch = useDispatch();

    // Save Selected Services
    const saveUsers = (e) => {
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
        data["activity"] = [];
        Dispatch({ type: "addUser", payload: data });
        document.getElementById(e.target.id).reset();
    };

    // Click the submit button
    const submitForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[0][11].click();
    };

    return (
        <React.Fragment>
            <div className="users">
                {/* <nav> */}
                <div className="text-end rg_f">
                    <div className="text-end">
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            New User
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
        </React.Fragment>
    );
};

export default Users;
