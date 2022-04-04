// ========================================================================
//                             Services
// ========================================================================

// Import libraries
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddForm from "./components/form";
import SelectedTests from "./components/selectedTest";

// App
const Services = () => {
    // fetch Data From Storage
    const testData = useSelector((state) => state.Database);
    console.log(testData);

    const services = useSelector((state) => state.selected);

    useSelector((state) => console.log(state));

    const Dispatch = useDispatch();

    // Save Selected Services
    const saveServices = (e) => {
        e.preventDefault();
        console.log(e);
        const data = {};
        data["title"] = e.target[0].value;
        data["category"] = e.target[1].value;
        data["cost"] = e.target[2].value;
        data["description"] = e.target[3].value;
        data["name"] = testData[e.target[1].value]["name"];
        Dispatch({ type: "addServices", payload: data });
        document.getElementById(e.target.id).reset();
    };

    // Click the submit button
    const submitForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[0][4].click();
    };

    return (
        <React.Fragment>
            <div className="services">
                {/* <nav> */}
                <div className="text-end rg_f">
                    <div className="text-end">
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
        </React.Fragment>
    );
};

export default Services;
