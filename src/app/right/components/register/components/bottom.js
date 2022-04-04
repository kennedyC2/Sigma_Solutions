// Import Libraries
import React from "react";

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
                                            {testData[key]["testList"].map((test, index) => (
                                                <div key={index} className="form-check" data-bs-toggle="tooltip" data-bs-placement="bottom" title={test["description"]}>
                                                    <input className="form-check-input me-2" type="checkbox" id={test["title"].split(" ")[0] + "_" + index} value={`${key}:${testData[key]["name"]}:${test["title"].trim()}:${test["cost"]}`} onChange={selectedTestHandler} />
                                                    <label
                                                        className="form-check-label d-flex justify-content-between"
                                                        htmlFor={test["title"].split(" ")[0] + "_" + index}
                                                        style={{
                                                            textTransform: "capitalize",
                                                            paddingTop: "2px",
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
                    </div>

                    <div className="rg_f mt-3">
                        <div className="text-end">
                            <button type="reset" className="btn btn-sm me-5 btn-primary">
                                Reset form
                            </button>
                            <button type="submit" className="btn btn-sm btn-primary">
                                Book test
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rg_f mt-4">
                    <div style={{ textAlign: "left", padding: "100px 0 150px", width: "70%", margin: "auto", fontSize: "13px" }}>
                        <p>No Laboratory Services Has Been Added</p>
                        <p>
                            Please click the <span style={{ color: "rgb(44, 123, 229)" }}>SERVICES</span> tab and add all services currently rendered by your laboratory
                        </p>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default FormBottom;
