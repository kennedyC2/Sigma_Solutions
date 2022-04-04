// Import Dependencies

// Component
const SelectedTests = (props) => {
    const { data } = props;

    return (
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            {Object.keys(data).length > 0 ? (
                <div className="d-flex align-items-start mt-3 justify-content-between">
                    {/* tab 1 */}
                    <div className="rg_f py-4" style={{ width: "40%", height: "calc(623px - 68px - 1rem)" }}>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                            {Object.keys(data)
                                .sort()
                                .map((key, index) => (
                                    <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${data[key]["name"]}-services-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${data[key]["name"]}-services`} type="button" role="tab" aria-controls={`v-pills-${data[key]["name"]}-services`} aria-selected="true">
                                        {key.replaceAll("_", " ")}
                                    </div>
                                ))}
                        </div>
                    </div>
                    {/* tab 2 */}
                    <div className="rg_f py-4" style={{ width: "58%", height: "calc(623px - 68px - 1rem)" }}>
                        <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                            {Object.keys(data)
                                .sort()
                                .map((key, index) => (
                                    <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${data[key]["name"]}-services`} role="tabpanel" aria-labelledby={`v-pills-${data[key]["name"]}-services-tab`}>
                                        <table className="table table-sm table-borderless">
                                            <tbody>
                                                {data[key]["testList"].map((test, index) => (
                                                    <tr key={index} data-bs-toggle="tooltip" data-bs-placement="bottom" title={test["description"]}>
                                                        <td className="align-middle ps-3">{index + 1 + "."}</td>
                                                        <td className="align-middle" style={{ width: "450px" }}>
                                                            {test["title"]}
                                                        </td>
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
                </div>
            ) : (
                <div className="rg_f mt-3" style={{ height: "calc(623px - 68px - 1rem)" }}>
                    <div style={{ textAlign: "left", paddingTop: "200px", width: "65%", margin: "auto", fontSize: "14px" }}>
                        <p>No Laboratory Services Has Been Selected</p>
                        <p>
                            Please click the <span style={{ color: "rgb(44, 123, 229)" }}>Add Services</span> button and select all services currently rendered by your laboratory
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedTests;
