//  Import dependencies
import React from "react";

// Component
const AddKit = (props) => {
    const { saveKit } = props;

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
