//  Import dependencies
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

// Component
const AddKit = (props) => {
    const { saveKit } = props;
    const services = useSelector((state) => state.services);

    return (
        <form action="#" method="POST" className="pt-3" id="formT" onSubmit={saveKit}>
            <div className="pe-3 ps-2">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="title" id="title" placeholder="Covid-19 Test Kit" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                        Quantity:
                    </label>
                    <input type="number" className="form-control form-control-sm" name="quantity" id="quantity" placeholder="0" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                        Test:
                    </label>
                    {Object.keys(services).length > 0 ? (
                        <Fragment>
                            {Object.keys(services).map((key, index) => (
                                <select key={index} name="test" className="form-select form-select-sm" defaultValue={`${Object.keys(services)[0]}:${Object.keys(services[key]["testList"])[0].replaceAll(" ", "_")}`}>
                                    {Object.keys(services[key]["testList"]).map((item, index) => (
                                        <option key={index} value={`${key}:${item.replaceAll(" ", "_")}`}>
                                            {item.replaceAll("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            ))}
                        </Fragment>
                    ) : (
                        <input type="text" className="form-control form-control-sm" name="test" id="test" placeholder="Liver function test" required />
                    )}
                </div>
                <div className="mb-3 text-end">
                    <button type="submit" className="hide">
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddKit;
