// Import Dependencies

// Component
const SelectedTests = (props) => {
    const { data } = props;

    return (
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            {Object.keys(data).length > 0 ? (
                <div className="d-flex align-items-start mt-3 justify-content-between">
                    {/* tab 1 */}
                    <div className="rg_f py-4" style={{ width: "40%", height: "calc(623px - 68px)" }}>
                        <div style={{ width: "100%", overflowY: "auto", height: "95%" }}>
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {Object.keys(data)
                                    .sort()
                                    .map((key, index) => (
                                        <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${data[key]["name"]}-services-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${data[key]["name"]}-services`} type="button" role="tab" aria-controls={`v-pills-${data[key]["name"]}-services`} aria-selected="true">
                                            {key.replaceAll("_", " ")}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    {/* tab 2 */}
                    <div className="rg_f py-4" style={{ width: "58%", height: "calc(623px - 68px)" }}>
                        <div className="tab-content" id="v-pills-tabContent" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                            {Object.keys(data)
                                .sort()
                                .map((key, index) => (
                                    <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${data[key].name}-services`} role="tabpanel" aria-labelledby={`v-pills-${data[key].name}-services-tab`}>
                                        <table className="table table-sm table-borderless">
                                            <tbody>
                                                {Object.keys(data[key].testList).map((test, index) => (
                                                    <tr key={index} data-bs-toggle="tooltip" data-bs-placement="bottom" title={data[key]["testList"][test]["description"]}>
                                                        <td className="align-middle ps-3">{index + 1 + "."}</td>
                                                        <td className="align-middle text-capitalize" style={{ width: "442px" }}>
                                                            {test.replaceAll("_", " ")}
                                                        </td>
                                                        <td className="align-middle me-5"> ₦{new Intl.NumberFormat("en-US", {}).format(data[key]["testList"][test]["cost"])}</td>
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
                <div className="rg_f mt-3 d-flex align-items-center justify-content-center" style={{ height: "calc(623px - 68px)" }}>
                    <div style={{ textAlign: "left", width: "60%", margin: "auto", fontSize: "16px" }}>
                        <p className="mb-1">Nothing Here Yet !!!</p>
                        <p>
                            Please click the <span style={{ color: "rgb(44, 123, 229)" }}>ADD SERVICES</span> button above to add Services.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedTests;
