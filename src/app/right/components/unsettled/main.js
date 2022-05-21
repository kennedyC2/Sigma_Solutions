// ========================================================================
//                             Unsettled
// ========================================================================

// Import libraries
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultEntry from "./component/result";
import RenderResults from "./component/renderResult_2";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { get, set } from "idb-keyval";
import { store } from "../../../Misc/cacheStorage";
import { RF_days, months, CalenderYear, date, month, year } from "../../../Misc/helper";
import { Notification_B } from "../../../Misc/notification";

// App
const Unsettled = () => {
    const Dispatch = useDispatch();
    const { unsettled } = useSelector((state) => state.tests) || {};
    const { pending } = useSelector((state) => state.storage) || {};

    // Confirm log In status
    const [status] = useState(
        () =>
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                token: false,
                path: {
                    type: false,
                    companyID: false,
                },
            }
    );

    const [sortData, setSortData] = useState({
        day: date,
        month: month,
        year: year,
    });

    const fetchData = () => {
        if (parseInt(sortData.year) === parseInt(year)) {
            return unsettled[`${sortData["month"]} ${sortData["day"]}`] || [];
        } else {
            const empty = [];
            return empty;
        }
    };

    const incomplete_Result_Entry = async (e) => {
        // Get Add buttons
        const data = {};
        data["date"] = e.target.dataset.date.trim();
        data["position"] = e.target.dataset.position.trim();
        const form = document.querySelectorAll(`div.${e.target.dataset.id}`);

        form.forEach((each) => {
            const test = each.dataset.selected.split(":")[2].trim();
            data["testData"] = data["testData"] ? data["testData"] : {};

            if (each.childNodes[1].value.trim() !== "") {
                data["testData"][test] ? (data["testData"][test][each.childNodes[0].value.trim()] = `${each.childNodes[1].value.trim()}${each.childNodes[2].value.trim()}`) : (data["testData"][test] = { [each.childNodes[0].value.trim()]: `${each.childNodes[1].value.trim()}${each.childNodes[2].value.trim()}` });
            }
        });

        //  Send
        try {
            const response = await axios({
                method: "PUT",
                url: "http://localhost:5000/laboratory/tests/pending",
                data: { ...data, type: status.path.type, tokenID: status.key, companyID: status.path.companyID },
            });

            // Update unsettled
            const tests = await get("tests", store);
            tests.unsettled = response.data;
            await set("tests", tests, store);

            // Update Store
            e.target.previousSibling.click();
            Dispatch({ type: "incomplete_Result", payload: response.data });
        } catch (error) {
            e.target.previousSibling.click();

            // Notify
            Notification_B("Something Happened, Please Try Again Later", false);
        }
    };

    const completed_Result_Entry = async (e) => {
        const data = {};
        data["position"] = e.target.dataset.id;
        data["date"] = e.target.dataset.day;
        console.log(data);

        //  Send
        try {
            const response = await axios({
                method: "PUT",
                url: "http://localhost:5000/laboratory/tests/completed",
                data: { ...data, type: status.path.type, tokenID: status.key, companyID: status.path.companyID },
            });

            // Update tests
            await set("tests", response.data.tests, store);

            // Update storage
            await set("storage", response.data.storage, store);

            // Update Store
            Dispatch({ type: "complete_Result", payload: response.data });
        } catch (error) {
            // Notify
            Notification_B("Something Happened, Please Try Again Later", false);
        }
    };

    return status.loggedIn === true ? (
        <Fragment>
            <div className="unsettled" style={{ height: "auto" }}>
                {Object.keys(unsettled).length > 0 ? (
                    <Fragment>
                        <div className="text-end rg_f d-flex justify-content-between py-2">
                            <div className="py-1 px-2" style={{ fontSize: "16px" }}>
                                Pending Tests: {pending}
                            </div>
                            <div className="d-flex justify-content-end" style={{ width: "500px" }}>
                                <div className="py-1 px-3" style={{ fontSize: "14px" }}>
                                    Sort By Date:
                                </div>
                                <form action="#" method="get" className="" style={{ width: "70%" }}>
                                    <div className="input-group">
                                        <select className="form-select form-select-sm me-1" name="day" aria-label="Default select" defaultValue={sortData["day"]} onChange={(e) => setSortData({ ...sortData, [e.target.name]: e.target.value })} required>
                                            {RF_days.map((key, index) => (
                                                <option key={index} value={key}>
                                                    {key}
                                                </option>
                                            ))}
                                        </select>
                                        <select className="form-select form-select-sm me-1" name="month" aria-label="Default select" defaultValue={sortData["month"]} style={{ width: "90px" }} onChange={(e) => setSortData({ ...sortData, [e.target.name]: e.target.value })} required>
                                            {months.map((key, index) => (
                                                <option key={index} value={key}>
                                                    {key}
                                                </option>
                                            ))}
                                        </select>
                                        <select className="form-select form-select-sm" name="year" aria-label="Default select" defaultValue={sortData["year"]} onChange={(e) => setSortData({ ...sortData, [e.target.name]: e.target.value })} required>
                                            {CalenderYear().map((key, index) => (
                                                <option key={index} value={key}>
                                                    {key}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" style={{ height: "inherit", width: "auto" }}>
                            {fetchData().length > 0 ? (
                                <div className="d-flex align-items-start justify-content-between mt-3" style={{ height: "inherit", width: "auto" }}>
                                    {/* tab 1 */}
                                    <div className="rg_f py-4" style={{ width: "52%", height: "calc(623px - 68px)" }}>
                                        <div style={{ width: "100%", overflowY: "auto", height: "95%" }}>
                                            <div className="nav flex-column nav-pills menu" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                {fetchData().map((item, index) => (
                                                    <div key={index} className={`nav-link btn-sm mb-1 d-flex justify-content-between ${index === 0 ? "active" : ""}`} id={`v-pills-${"ghy" + index}${index + 5}-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${"ghy" + index}${index + 5}`} type="button" role="tab" aria-controls={`v-pills-${"ghy" + index}${index + 5}`} aria-selected="true" style={{ width: "98%" }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="23" height="23" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                                <path d="m16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621Z" />
                                                                <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
                                                            </g>
                                                        </svg>
                                                        <div className="d-flex justify-content-between ps-2" style={{ width: "505px", fontSize: "15px" }}>
                                                            <p style={{ marginBottom: 0 }}>{`${item["firstname"]}  ${item["lastname"]}  ${item["other"]}`} </p>
                                                            <p style={{ marginBottom: 0 }}>{` ${item["date"]} | ${item["time"]}`}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* tab 2 */}
                                    <div className="rg_f py-4" style={{ width: "46%", height: "calc(623px - 68px)" }}>
                                        <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", height: "95%", overflowY: "auto" }}>
                                            {fetchData().map((item, index) => (
                                                <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${"ghy" + index}${index + 5}`} role="tabpanel" aria-labelledby={`v-pills-${"ghy" + index}${index + 5}-tab`}>
                                                    <div key={index} className="mb-3" style={{ fontSize: "13.5px", textTransform: "Capitalize" }}>
                                                        <h6 className="text-decoration-underline text-center text-uppercase mb-4">Test Details:</h6>
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
                                                            <p style={{ marginBottom: ".55rem" }}>Specimen Collected:</p>
                                                            <ol className="list-group list-group-numbered" style={{ width: "90%", fontSize: "13px" }}>
                                                                {item["specimen"].map((key, index) => (
                                                                    <li key={index + "f"} className="list-group-item mb-1 rounded">
                                                                        &nbsp; {key}
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                        <br></br>
                                                        <div>
                                                            <p style={{ marginBottom: ".55rem" }}>Test Required:</p>
                                                            <ol className="list-group mb-3 list-group-numbered" style={{ width: "90%", fontSize: "13px" }}>
                                                                {item["selectedTest"].map((key, index) => (
                                                                    <li key={index + "t"} className="list-group-item mb-1 rounded">
                                                                        &nbsp; {key.split(":")[2].replaceAll("_", " ")}
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                        <RenderResults result={item["result"]} />
                                                    </div>

                                                    <div className="text-end pe-4" style={{ position: "absolute", bottom: "35px", right: "13px" }}>
                                                        <button type="button" className="btn btn-sm btn-outline-primary mt-1 me-3" data-bs-toggle="modal" data-bs-target={"#staticBackdrop" + index}>
                                                            {Object.keys(item["result"]).length < 1 ? "Enter Result" : "Edit Result"}
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger mt-1" data-id={index} data-day={`${sortData["month"]} ${sortData["day"]}`} onClick={(e) => completed_Result_Entry(e)}>
                                                            Mark As Complete
                                                        </button>
                                                    </div>

                                                    <div className="modal fade" id={"staticBackdrop" + index} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={"staticBackdropLabel" + index} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered modal-xl" style={{ width: "850px" }}>
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title ms-1 text-uppercase" id={"staticBackdropLabel" + index} style={{ fontSize: "18px" }}>
                                                                        {item["firstname"]} {item["lastname"]} {item["other"]}
                                                                    </h5>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <ResultEntry data={item["selectedTest"]} position={index} />
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                                                                        Close
                                                                    </button>
                                                                    <button type="button" className="btn btn-sm btn-primary" data-id={"fvk" + index} data-date={`${sortData["month"]} ${sortData["day"]}`} data-position={index} onClick={(e) => incomplete_Result_Entry(e)}>
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rg_f mt-3 d-flex align-items-center justify-content-center" style={{ height: "calc(623px - 68px)" }}>
                                    <div style={{ textAlign: "center", width: "50%", margin: "auto", fontSize: "18px", color: "rgba(149, 170, 201, .8)" }}>
                                        <p className="mb-1">-no data-</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Fragment>
                ) : (
                    <div>
                        <div id="pyl" style={{ backgroundImage: `url(${bg})` }}></div>
                        <div className="mt-4 px-4">
                            <div className="rg_f py-4 d-flex align-items-center justify-content-center" style={{ height: "calc(623px - 230px - 24px)" }}>
                                <div style={{ textAlign: "left", width: "55%", margin: "auto", fontSize: "17px", color: "rgba(149, 170, 201, .8)" }}>
                                    <p className="mb-1">Nothing Here Yet !!!</p>
                                    <p>Booked Tests and Unsettled Tests Will Appear Here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default Unsettled;
