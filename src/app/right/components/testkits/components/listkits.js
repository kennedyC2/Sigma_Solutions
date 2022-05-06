// Import Dependencies

// Component
const ListKits = (props) => {
    const { data } = props;

    return (
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            {Object.keys(data).length > 0 ? (
                <div className="d-flex align-items-start mt-3 justify-content-between">
                    {/* tab 1 */}
                    <div className="rg_f py-4" style={{ width: "54%", height: "calc(623px - 68px)" }}>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                            {Object.keys(data).map((key, index) => (
                                <div key={index} className={`nav-link text-capitalize btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${index}-services-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${index}-services`} type="button" role="tab" aria-controls={`v-pills-${index}-services`} aria-selected="true">
                                    {key.replaceAll("_", " ")}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* tab 2 */}
                    <div className="rg_f py-4" style={{ width: "44%", height: "calc(623px - 68px)" }}>
                        <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", overflowY: "auto", height: "100%", fontSize: "13.5px" }}>
                            {Object.keys(data).map((key, index) => (
                                <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${index}-services`} role="tabpanel" aria-labelledby={`v-pills-${index}-services-tab`}>
                                    <p>Test Kit: &nbsp;{data[key]["details"].title.replaceAll("_", " ")}</p>
                                    <p className="text-capitalize">
                                        {/* add last updated option to the quantity */}
                                        Quantity: &nbsp;{data[key]["details"].quantity} <span>[last update: ..........]</span>
                                    </p>
                                    <p className="text-capitalize">Category: &nbsp;{data[key]["details"].test.split(":")[0].replaceAll("_", " ")}</p>
                                    <p className="text-capitalize">Test: &nbsp;{data[key]["details"].test.split(":")[1].replaceAll("_", " ")}</p>
                                    <div>
                                        <p>Recent Activities:</p>
                                        {data[key]["activities"].length > 0 ? (
                                            <table key={index} className="table table-bordered">
                                                <tbody>
                                                    {key["activity"].map((items, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{items.split(":")[0]}</td>
                                                            <td>{items.split(":")[1]}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="px-3 text-center" style={{ padding: "142px 0", border: "1px solid rgba(149, 170, 201, .3)", width: "95%", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem" }}>
                                                No Activity Yet
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rg_f mt-3" style={{ height: "calc(623px - 68px)" }}>
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

export default ListKits;
