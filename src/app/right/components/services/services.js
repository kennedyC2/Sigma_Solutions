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

    const services = useSelector((state) => state.selected);

    const Dispatch = useDispatch();

    // Save Selected Services
    const saveServices = (e) => {
        e.preventDefault();
        const data = {};
        const form = document.getElementById(e.target.id);
        data["title"] = form.elements["title"].value;
        data["category"] = form.elements["category"].value;
        data["cost"] = form.elements["cost"].value;
        data["description"] = form.elements["description"].value;
        data["name"] = form.dataset.reference;
        data["display"] = form.dataset.display;
        Dispatch({ type: "add", payload: data });
        form.reset();
    };

    return (
        <React.Fragment>
            <div className="services p-4 my-3">
                <nav>
                    <div className="nav nav-tabs justify-content-end" id="nav-tab" role="tablist">
                        <button className="nav-link text-center active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                            All
                        </button>
                        <button className="nav-link text-center" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                            More
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <SelectedTests data={services} />
                    <AddForm testData={testData} saveServices={saveServices} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Services;
