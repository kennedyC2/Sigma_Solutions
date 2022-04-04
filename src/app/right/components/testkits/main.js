// ========================================================================
//                             TestKits
// ========================================================================

// Import libraries
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddKit from "./components/addkit";
import ListKits from "./components/listkits";

// App
const TestKits = () => {
    // fetch Data From Storage
    const testKits = useSelector((state) => state.testKits);

    const Dispatch = useDispatch();

    // Save Selected Services
    const saveKit = (e) => {
        e.preventDefault();
        const data = {};
        data["title"] = e.target[0].value.replaceAll(" ", "_");
        data["quantity"] = e.target[1].value;
        data["activity"] = [];
        console.log(data);
        Dispatch({ type: "addKit", payload: data });
        document.getElementById(e.target.id).reset();
    };

    // Click the submit button
    const submitForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[0][2].click();
    };

    return (
        <React.Fragment>
            <div className="users">
                {/* <nav> */}
                <div className="text-end rg_f">
                    <div className="text-end">
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
        </React.Fragment>
    );
};

export default TestKits;
