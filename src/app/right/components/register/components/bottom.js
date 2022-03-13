// Import Libraries
import React, { useEffect } from "react";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm";

// Component
const FormBottom = (props) => {
    const { testData, selectedTestHandler } = props;

    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl);
        });
    });

    const showSelectedServices = () => {
        if (Object.keys(testData).length < 1) {
            return (
                <div style={{ textAlign: "left", padding: "100px 0 150px", width: "70%", margin: "auto", fontSize: "13px" }}>
                    <p>No Laboratory Services Has Been Added</p>
                    <p>
                        Please click the <span style={{ color: "rgb(44, 123, 229)" }}>SERVICES</span> tab and add all services currently rendered by your laboratory
                    </p>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="d-flex align-items-start mt-4 justify-content-between">
                        {/* tab 1 */}
                        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {Object.keys(testData)
                                .sort()
                                .map((key, index) => (
                                    <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${testData[key]["name"]}-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${testData[key]["name"]}`} type="button" role="tab" aria-controls={`v-pills-${testData[key]["name"]}`} aria-selected="true">
                                        {key}
                                    </div>
                                ))}
                        </div>
                        {/* tab 2 */}
                        <div className="tab-content ms-5 px-4 py-2" id="v-pills-tabContent" style={{ borderLeft: "1px solid rgba(149, 170, 201, .3)", width: "70%", height: "500px", overflowY: "auto" }}>
                            {Object.keys(testData)
                                .sort()
                                .map((key, index) => (
                                    <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${testData[key]["name"]}`} role="tabpanel" aria-labelledby={`v-pills-${testData[key]["name"]}-tab`} style={{ width: "90%" }}>
                                        {testData[key]["testList"].map((test, index) => (
                                            <div key={index} className="form-check" data-bs-toggle="tooltip" data-bs-placement="bottom" title={test["description"]}>
                                                <input className="form-check-input me-2" type="checkbox" id={test["title"].split(" ")[0] + "_" + index} value={`${test["title"].trim()}:${test["cost"]}`} onChange={selectedTestHandler} />
                                                <label
                                                    className="form-check-label d-flex justify-content-between"
                                                    htmlFor={test["title"].split(" ")[0] + "_" + index}
                                                    style={{
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    <div>{test["title"]}</div>
                                                    <div>
                                                        <span>&#8358;</span> {test["cost"]}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="text-end pt-3">
                        <button type="reset" className="btn btn-sm me-5 btn-primary">
                            Reset form
                        </button>
                        <button type="submit" className="btn btn-sm btn-primary">
                            Book test
                        </button>
                    </div>
                </React.Fragment>
            );
        }
    };

    return <React.Fragment>{showSelectedServices()}</React.Fragment>;
};

export default FormBottom;
