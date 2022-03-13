// Import Dependencies
import { useEffect } from "react";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm";

// Component
const SelectedTests = (props) => {
    // console.log(props);
    const { data } = props;

    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl);
        });
    });

    const showSelectedServices = () => {
        if (Object.keys(data).length < 1) {
            return (
                <div style={{ textAlign: "left", paddingTop: "200px", width: "65%", margin: "auto", fontSize: "14px" }}>
                    <p>No Laboratory Services Has Been Selected</p>
                    <p>
                        Please click the <span style={{ color: "rgb(44, 123, 229)" }}>More</span> tab and select all services currently rendered by your laboratory
                    </p>
                </div>
            );
        } else {
            return (
                <div className="d-flex align-items-start mt-4 justify-content-between">
                    {/* tab 1 */}
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        {Object.keys(data)
                            .sort()
                            .map((key, index) => (
                                <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${data[key]["name"]}-services-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${data[key]["name"]}-services`} type="button" role="tab" aria-controls={`v-pills-${data[key]["name"]}-services`} aria-selected="true">
                                    {key}
                                </div>
                            ))}
                    </div>
                    {/* tab 2 */}
                    <div className="tab-content ms-5 px-4 py-2" id="v-pills-tabContent" style={{ borderLeft: "1px solid rgba(149, 170, 201, .3)", width: "70%", height: "500px", overflowY: "auto" }}>
                        {Object.keys(data)
                            .sort()
                            .map((key, index) => (
                                <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${data[key]["name"]}-services`} role="tabpanel" aria-labelledby={`v-pills-${data[key]["name"]}-services-tab`}>
                                    <table className="table table-sm table-borderless">
                                        <tbody>
                                            {data[key]["testList"].map((test, index) => (
                                                <tr key={index} data-bs-toggle="tooltip" data-bs-placement="bottom" title={test["description"]}>
                                                    <td className="align-middle ps-3">{index + 1 + "."}</td>
                                                    <td className="align-middle">{test["title"]}</td>
                                                    <td className="align-middle">
                                                        <span>&#8358;</span>
                                                        {test["cost"]}
                                                    </td>
                                                    <td className="text-end align-middle">
                                                        <button className="btn text-danger">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                                                <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            {showSelectedServices()}
        </div>
    );
};

export default SelectedTests;
