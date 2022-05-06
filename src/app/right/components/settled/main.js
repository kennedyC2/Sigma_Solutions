// ========================================================================
//                             Database
// ========================================================================

// Import libraries
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import RenderResults from "./components/renderResult_1";
import { RF_days, months, CalenderYear, date, month, year } from "../../../Misc/helper";
import { Navigate } from "react-router-dom";

// App
const Database = () => {
    const { settled } = useSelector((state) => state.tests);

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
                <div className="text-end rg_f d-flex justify-content-end py-2">
                    <div className="py-1 px-3" style={{ fontSize: "14px" }}>
                        Sort By Date:
                    </div>
                    <form action="#" method="get" className="" style={{ width: "30%" }}>
                        <div className="input-group">
                            <select className="form-select form-select-sm" name="day" aria-label="Default select" defaultValue={sortData["day"]} onChange={(e) => setSortData({ ...sortData, [e.target.name]: e.target.value })} required>
                                {RF_days.map((key, index) => (
                                    <option key={index} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            <select className="form-select form-select-sm" name="month" aria-label="Default select" defaultValue={sortData["month"]} style={{ width: "90px" }} onChange={(e) => setSortData({ ...sortData, [e.target.name]: e.target.value })} required>
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
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    {fetchData().length > 0 ? (
                        <div className="d-flex align-items-start justify-content-between mt-3">
                            {/* tab 1 */}
                            <div className="rg_f py-4" style={{ width: "54%", height: "calc(623px - 68px)" }}>
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                                    {fetchData().map((key, index) => (
                                        <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""} d-flex justify-content-between`} id={`v-pills-${"res" + index}${index + 5}-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${"res" + index}${index + 5}`} type="button" role="tab" aria-controls={`v-pills-${"res" + index}${index + 5}`} aria-selected="true">
                                            <p style={{ marginBottom: 0 }}>{`${key["firstname"]}  ${key["lastname"]}  ${key["other"]}`} </p>
                                            <p style={{ marginBottom: 0 }}>{key["time"]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* tab 2 */}
                            <div className="rg_f py-4" style={{ width: "44%", height: "calc(623px - 68px)" }}>
                                <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", height: "100%", overflowY: "auto" }}>
                                    {fetchData().map((item, index) => (
                                        <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${"res" + index}${index + 5}`} role="tabpanel" aria-labelledby={`v-pills-${"res" + index}${index + 5}-tab`}>
                                            <div key={index} className="mb-3" style={{ fontSize: "13px", textTransform: "Capitalize" }}>
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
                        <div className="rg_f mt-3" style={{ height: "calc(623px - 68px)" }}>
                            <div style={{ textAlign: "left", padding: "200px 0", width: "70%", margin: "auto", fontSize: "13px" }}>
                                <p>No Laboratory Services Has Been Added</p>
                                <p>
                                    Please click the <span style={{ color: "rgb(44, 123, 229)" }}>SERVICES</span> tab and add all services currently rendered by your laboratory
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default Database;
