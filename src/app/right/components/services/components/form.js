//  Import dependencies
import React from "react";

// Component
const AddForm = (props) => {
    const { testData, saveServices } = props;

    return (
        <form action="#" method="POST" className="pt-3" id="formR" onSubmit={saveServices}>
            <div className="px-2">
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
                    <select className="form-select form-select-sm" name="category" required>
                        {Object.keys(testData)
                            .sort()
                            .map((key, index) => (
                                <option key={index} value={key}>
                                    {key.replaceAll("_", " ")}
                                </option>
                            ))}
                    </select>
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
                    <textarea className="form-control form-control-sm" id="description" name="description" rows="5" required></textarea>
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

export default AddForm;
