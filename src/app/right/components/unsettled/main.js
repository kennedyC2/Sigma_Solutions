// ========================================================================
//                             Unsettled
// ========================================================================

// Import libraries
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultEntry, { retrieve_Result } from "./component/result";
import RenderResults from "./component/renderResult_2";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";

// App
const Unsettled = () => {
    const Dispatch = useDispatch();
    const { unsettled } = useSelector((state) => state.test) || [];

    const incomplete_Result_Entry = (e) => {
        // Get Add buttons
        let data;
        const btns = document.querySelectorAll(`button.add.${e.target.dataset.id}`);
        console.log(btns);

        if (btns[0].parentNode.childNodes[1].value) {
            if (btns[btns.length - 1].parentNode.childNodes[1].value) {
                btns[btns.length - 1].click();

                // Close Tab
                e.target.parentNode.childNodes[0].click();
                data = retrieve_Result();
            }
        } else {
            btns[0].click();
            data = retrieve_Result();
        }

        // Update Store
        Dispatch({ type: "incomplete_Result", payload: data });
    };

    const completed_Result_Entry = (e) => {
        const data = {};
        data["position"] = e.target.dataset.id;
        data["date"] = e.target.dataset.day;
        console.log(data);

        // // Update Store
        Dispatch({ type: "complete_Result", payload: data });
    };

    return (
        <Fragment>
            <div className="unsettled">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" style={{ height: "inherit", width: "auto" }}>
                    {Object.keys(unsettled).length > 0 ? (
                        <div className="d-flex align-items-start justify-content-between" style={{ height: "inherit", width: "auto" }}>
                            {/* tab 1 */}
                            <div className="rg_f py-4" style={{ width: "54%", height: "623px" }}>
                                <div className="nav flex-column nav-pills menu" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                                    {Object.keys(unsettled).map((key) => (
                                        <Fragment>
                                            {/* <h6 className="text-decoration-underline px-2 mt-2">{key}</h6> */}
                                            {unsettled[key].map((item, index) => (
                                                <div key={index} className={`nav-link  btn-sm  d-flex justify-content-between ${index === 0 ? "active" : ""}`} id={`v-pills-${"ghy" + index}${index + 5}-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${"ghy" + index}${index + 5}`} type="button" role="tab" aria-controls={`v-pills-${"ghy" + index}${index + 5}`} aria-selected="true">
                                                    <p style={{ marginBottom: 0 }}>{`${item["firstname"]}  ${item["lastname"]}  ${item["other"]}`} </p>
                                                    <p style={{ marginBottom: 0 }}>{` ${item["date"]} | ${item["time"]}`}</p>
                                                </div>
                                            ))}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                            {/* tab 2 */}
                            <div className="rg_f py-4" style={{ width: "44%", height: "623px" }}>
                                <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", height: "100%", overflowY: "auto" }}>
                                    {Object.keys(unsettled).map((key) => (
                                        <Fragment>
                                            {unsettled[key].map((item, index) => (
                                                <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${"ghy" + index}${index + 5}`} role="tabpanel" aria-labelledby={`v-pills-${"ghy" + index}${index + 5}-tab`}>
                                                    <div key={index} className="mb-3" style={{ fontSize: "13.5px", textTransform: "Capitalize" }}>
                                                        <h6 className="text-decoration-underline text-center mb-4">Test Details:</h6>
                                                        <p>
                                                            Name: &nbsp; {item["firstname"]}&nbsp;{item["lastname"]}&nbsp;{item["other"]}
                                                        </p>
                                                        <p>
                                                            Age: &nbsp; <span style={{ textTransform: "lowercase" }}>{item["age"]}</span>
                                                        </p>
                                                        <p>
                                                            Sex: &nbsp; <span>{item["sex"]}</span>
                                                        </p>
                                                        <p>
                                                            Religion: &nbsp; <span>{item["religion"]}</span>
                                                        </p>
                                                        <p>Tribe: &nbsp; {item["tribe"]}</p>
                                                        <p>
                                                            Provisional Diagnosis: &nbsp; <span>{item["diagnosis"]}</span>
                                                        </p>
                                                        <p>
                                                            Date: &nbsp; <span>{item["date"]}</span>
                                                        </p>
                                                        <p>
                                                            Time: &nbsp; <span className="text-lowercase">{item["time"]}</span>
                                                        </p>
                                                        <div>
                                                            <p>Specimen Collected:</p>
                                                            <ol className="list-group list-group-numbered" style={{ width: "98%" }}>
                                                                {item["specimen"].map((key, index) => (
                                                                    <li key={index} className="list-group-item">
                                                                        &nbsp; {key}
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                        <br></br>
                                                        <div>
                                                            <p>Test Required:</p>
                                                            <ol className="list-group mb-3 list-group-numbered" style={{ width: "98%" }}>
                                                                {item["selectedTest"].map((key, index) => (
                                                                    <li key={index} className="list-group-item">
                                                                        &nbsp; {key.split(":")[2]}
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                        <RenderResults result={item["result"]} />
                                                    </div>

                                                    <div className="text-end pe-4">
                                                        {/* Button trigger modal */}
                                                        <button type="button" className="btn btn-sm btn-outline-primary mt-1 me-3" data-bs-toggle="modal" data-bs-target={"#staticBackdrop" + index}>
                                                            {Object.keys(item["result"]).length < 1 ? "Enter Result" : "Edit Result"}
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger mt-1" data-id={index} data-day={key} onClick={(e) => completed_Result_Entry(e)}>
                                                            Mark As Complete
                                                        </button>
                                                    </div>

                                                    {/* Modal */}
                                                    <div className="modal fade" id={"staticBackdrop" + index} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={"staticBackdropLabel" + index} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "800px" }}>
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title fs-6" id={"staticBackdropLabel" + index}>
                                                                        {item["firstname"]} {item["lastname"]} {item["other"]}
                                                                    </h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <ResultEntry data={item["selectedTest"]} date={key} position={index} />
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                                                                        Close
                                                                    </button>
                                                                    <button type="button" className="btn btn-sm btn-primary" data-id={"fvk" + index} onClick={(e) => incomplete_Result_Entry(e)}>
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="" id="pyl" style={{ backgroundImage: `url(${bg})` }}></div>
                            <div className="mt-4 px-4">
                                <div className="rg_f py-4" style={{ height: "auto" }}>
                                    <div style={{ textAlign: "left", padding: "115px 0", width: "55%", margin: "auto", fontSize: "13px", height: "" }}>
                                        <p>No Laboratory Services Has Been Added</p>
                                        <p>
                                            Please click the <span style={{ color: "rgb(44, 123, 229)" }}>SERVICES</span> tab and add all services currently rendered by your laboratory
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Unsettled;
