// Import Libraries
import React from "react";
import { Link } from "react-router-dom";

// Component
const FormBottom = (props) => {
    const { testData, selectedTestHandler } = props;

    return (
        <React.Fragment>
            {Object.keys(testData).length > 0 ? (
                <div className="mt-3">
                    <div className="d-flex align-items-start mt-4 justify-content-between">
                        {/* tab 1 */}
                        <div className="rg_f py-4" style={{ width: "40%", height: "calc(623px - 64px - 1rem)" }}>
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                                {Object.keys(testData)
                                    .sort()
                                    .map((key, index) => (
                                        <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${testData[key]["name"]}-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${testData[key]["name"]}`} type="button" role="tab" aria-controls={`v-pills-${testData[key]["name"]}`} aria-selected="true">
                                            {key.replaceAll("_", " ")}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {/* tab 2 */}
                        <div className="rg_f py-4" style={{ width: "58%", height: "calc(623px - 64px - 1rem)" }}>
                            <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                                {Object.keys(testData)
                                    .sort()
                                    .map((key, index) => (
                                        <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${testData[key]["name"]}`} role="tabpanel" aria-labelledby={`v-pills-${testData[key]["name"]}-tab`}>
                                            {Object.keys(testData[key].testList).map((test, index) => (
                                                <div key={index} className="form-check mb-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title={test["description"]}>
                                                    <input className="form-check-input me-2" type="checkbox" id={test.split(" ")[0] + "_" + index} value={`${key}:${testData[key]["name"]}:${test.trim().replaceAll(" ", "_")}:${testData[key]["testList"][test]["cost"]}`} onChange={selectedTestHandler} />
                                                    <label
                                                        className="form-check-label d-flex justify-content-between"
                                                        htmlFor={test.split(" ")[0] + "_" + index}
                                                        style={{
                                                            textTransform: "capitalize",
                                                            paddingTop: "2px",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        <div>{test.replaceAll("_", "  ")}</div>
                                                        <div>₦{new Intl.NumberFormat("en-US", {}).format(testData[key]["testList"][test]["cost"])}</div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="rg_f mt-3 py-2">
                        <div className="text-end">
                            <button type="reset" className="btn btn-sm me-4 px-3 btn-outline-primary">
                                Reset form
                            </button>
                            <button type="submit" className="btn btn-sm px-3 btn-outline-primary">
                                Book test
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rg_f mt-4 d-flex align-items-center justify-content-center" style={{ height: "calc(623px - 230px - 24px)" }}>
                    <div style={{ textAlign: "left", width: "75%", margin: "auto", fontSize: "16px" }}>
                        <p className="mb-1">Nothing Here Yet !!!</p>
                        <p>
                            Please click the{" "}
                            <span style={{ color: "rgb(44, 123, 229)" }}>
                                <Link to="/app/laboratory/services">Services</Link>
                            </span>{" "}
                            tab and add all services currently offered in your laboratory.
                        </p>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default FormBottom;
