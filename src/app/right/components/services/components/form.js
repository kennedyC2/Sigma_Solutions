//  Import dependencies
import React from "react";

// Component
const AddForm = (props) => {
    const { testData, saveServices } = props;

    return (
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div className="d-flex align-items-start mt-4 justify-content-between">
                {/* tab 1 */}
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {Object.keys(testData)
                        .sort()
                        .map((key, index) => (
                            <div key={index} className={`nav-link  btn-sm ${testData[key]["display"]}`} id={`v-pills-${testData[key]["name"]}-service-input-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${testData[key]["name"]}-service-input`} type="button" role="tab" aria-controls={`v-pills-${testData[key]["name"]}-service-input`} aria-selected="true">
                                {key}
                            </div>
                        ))}
                </div>
                {/* tab 2 */}
                <div className="tab-content ms-5 px-4 py-2" id="v-pills-tabContent" style={{ borderLeft: "1px solid rgba(149, 170, 201, .3)", width: "70%", height: "500px", overflowY: "auto" }}>
                    {Object.keys(testData)
                        .sort()
                        .map((key, index) => (
                            <div key={index} className={`tab-pane fade show ${testData[key]["display"]}`} id={`v-pills-${testData[key]["name"]}-service-input`} role="tabpanel" aria-labelledby={`v-pills-${testData[key]["name"]}-service-input-tab`}>
                                <form action="#" method="POST" key={index} id={testData[key]["name"]} className="pt-3" data-reference={testData[key]["name"]} data-display={testData[key]["display"]} onSubmit={saveServices}>
                                    <div className="px-3">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">
                                                Title:
                                            </label>
                                            <input type="text" className="form-control form-control-sm" name="title" id="title" placeholder="Liver Function Test" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category" className="form-label">
                                                Category:
                                            </label>
                                            <input type="text" className="form-control form-control-sm" name="category" id="category" value={key} disabled />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cost" className="form-label">
                                                Cost:
                                            </label>
                                            <input type="text" className="form-control form-control-sm" name="cost" id="cost" placeholder="5000" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">
                                                Description:
                                            </label>
                                            <textarea className="form-control" id="description" name="description" rows="5" required></textarea>
                                        </div>
                                        <div className="mb-3 text-end">
                                            <button type="submit" className="">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AddForm;
