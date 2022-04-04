// Import Dependencies

// Component
const ListKits = (props) => {
    const { data } = props;
    console.log(data);

    return (
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            {data.length > 0 ? (
                <div className="d-flex align-items-start mt-3 justify-content-between">
                    {/* tab 1 */}
                    <div className="rg_f py-4" style={{ width: "54%", height: "calc(623px - 68px - 1rem)" }}>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                            {data.map((key, index) => (
                                <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${index}-services-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${index}-services`} type="button" role="tab" aria-controls={`v-pills-${index}-services`} aria-selected="true">
                                    {key.title.replaceAll("_", " ")}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* tab 2 */}
                    <div className="rg_f py-4" style={{ width: "44%", height: "calc(623px - 68px - 1rem)" }}>
                        <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", overflowY: "auto", height: "100%", fontSize: "13.5px" }}>
                            {data.map((key, index) => (
                                <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${index}-services`} role="tabpanel" aria-labelledby={`v-pills-${index}-services-tab`}>
                                    <p>Test Kit: &nbsp;{key.title.replaceAll("_", " ")}</p>
                                    <p>
                                        {/* add last updated option to the quantity */}
                                        Quantity: &nbsp;{key.quantity} <span>[last update: ..........]</span>
                                    </p>
                                    <div>
                                        <p>Recent Activities:</p>
                                        {key["activity"].length > 0 ? (
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
                                            <div className="px-3 text-center" style={{ padding: "170px 0", border: "1px solid rgba(149, 170, 201, .3)", width: "95%", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem" }}>
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

export default ListKits;
