// ========================================================================
//                             Database
// ========================================================================

// Import libraries
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import RenderResults from "./components/renderResult_1";
import { RF_days, months, CalenderYear, date, month, year } from "../../../Misc/helper";
import { Navigate } from "react-router-dom";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";

// App
const Database = () => {
    const { settled } = useSelector((state) => state.tests);
    const { completed } = useSelector((state) => state.storage);

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
            return settled[`${sortData["month"]} ${sortData["day"]}`] || [];
        } else {
            const empty = [];
            return empty;
        }
    };

    return status.loggedIn === true ? (
        <Fragment>
            <div className="settled" style={{ height: "auto" }}>
                {Object.keys(settled).length > 0 ? (
                    <Fragment>
                        <div className="text-end rg_f d-flex justify-content-between py-2">
                            <div className="py-1 px-2" style={{ fontSize: "16px" }}>
                                Completed Tests: {completed}
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
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            {fetchData().length > 0 ? (
                                <div className="d-flex align-items-start justify-content-between mt-3">
                                    {/* tab 1 */}
                                    <div className="rg_f py-4" style={{ width: "52%", height: "calc(623px - 68px)" }}>
                                        <div style={{ width: "100%", overflowY: "auto", height: "96%" }}>
                                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                {fetchData().map((key, index) => (
                                                    <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""} d-flex justify-content-between`} id={`v-pills-${"res" + index}${index + 5}-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${"res" + index}${index + 5}`} type="button" role="tab" aria-controls={`v-pills-${"res" + index}${index + 5}`} aria-selected="true" style={{ width: "98%" }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M6.5 20q-2.275 0-3.887-1.575Q1 16.85 1 14.575q0-1.95 1.175-3.475Q3.35 9.575 5.25 9.15q.625-2.3 2.5-3.725Q9.625 4 12 4q2.925 0 4.962 2.037Q19 8.075 19 11q1.725.2 2.863 1.487Q23 13.775 23 15.5q0 1.875-1.312 3.188Q20.375 20 18.5 20Zm3.85-3L16 11.35L14.55 9.9l-4.225 4.225l-2.1-2.1L6.8 13.45Z" />
                                                        </svg>
                                                        <div className="d-flex justify-content-between ps-2" style={{ width: "505px", fontSize: "15px", marginTop: "2px" }}>
                                                            <p style={{ marginBottom: 0 }}>{`${key["firstname"]}  ${key["lastname"]}  ${key["other"]}`} </p>
                                                            <p style={{ marginBottom: 0 }}>
                                                                {key["date"]} | {key["time"]}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* tab 2 */}
                                    <div className="rg_f py-4" style={{ width: "46%", height: "calc(623px - 68px)" }}>
                                        <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", height: "96%", overflowY: "auto" }}>
                                            {fetchData().map((item, index) => (
                                                <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${"res" + index}${index + 5}`} role="tabpanel" aria-labelledby={`v-pills-${"res" + index}${index + 5}-tab`}>
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
                                                            <p style={{ marginBottom: ".55rem" }}>Specimen Collected:</p>
                                                            <ol className="list-group list-group-numbered" style={{ width: "90%", fontSize: "13px" }}>
                                                                {item["specimen"].map((key, index) => (
                                                                    <li key={index} className="list-group-item mb-1 rounded">
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
                                                                    <li key={index} className="list-group-item mb-1 rounded">
                                                                        &nbsp; {key.split(":")[2].replaceAll("_", " ")}
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                        <RenderResults result={item["result"]} />
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

export default Database;
