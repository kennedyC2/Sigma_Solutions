// Import Dependencies
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

// Component
let result = {};

const ResultEntry = (props) => {
    const testParams = useSelector((state) => state.Database);
    const { data, date, position } = props;
    const [formData, setFormData] = useState({});
    console.log(position);

    const renderOptions = (x, y) => {
        let options = "";
        testParams[x][y].forEach((element) => {
            options += `<option value=${element.split(":")[0]}>
                            ${element.split(":")[0].replaceAll("_", " ")}
                        </option>`;
        });

        return options;
    };

    // Add New Layer Of Input
    const addNewLayer = (e) => {
        e.preventDefault();

        // Define Data
        const d = formData["formData"] || formData;
        const testIndex = e.target.dataset.index;
        const category = e.target.dataset.cat;
        const test = data[testIndex].split(":")[2].replaceAll(" ", "_");
        d["date"] = date;
        d["index"] = position;
        d["testData"] = d["testData"] ? d["testData"] : {};
        d["testData"][test] ? (d["testData"][test][e.target[0].value] = `${e.target[1].value}${e.target[2].value}`) : (d["testData"][test] = { [e.target[0].value]: `${e.target[1].value}${e.target[2].value}` });

        // update State
        setFormData({ formData: d });
        result = d;
        console.log(result);

        // Create Form
        const form = document.createElement("form");
        form.setAttribute("action", "#");
        form.setAttribute("method", "post");
        form.setAttribute("data-cat", category);
        form.setAttribute("data-index", testIndex);
        form.onsubmit = addNewLayer;

        // Create Div
        const div = document.createElement("div");
        div.setAttribute("class", "input-group mb-2");
        div.style.fontSize = "13px";

        // Create Select_One
        const select_One = document.createElement("select");
        select_One.setAttribute("class", "form-select form-select-sm");
        select_One.style.width = "40%";
        select_One.innerHTML = `${renderOptions(category, "parameter")}`;

        // Create Input
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control form-control-sm");
        input.setAttribute("placeholder", "value");
        input.required = true;
        input.style.width = "15%";

        // Create Select_Two
        const select_Two = document.createElement("select");
        select_Two.setAttribute("class", "form-select form-select-sm");
        select_Two.innerHTML = `${renderOptions(category, "unit")}`;

        // Create Button_One
        const button_One = document.createElement("button");
        button_One.setAttribute("type", "submit");
        button_One.setAttribute("class", "btn btn-sm add");
        button_One.innerText = "+";

        // Create Button_Two
        const button_Two = document.createElement("button");
        button_Two.setAttribute("type", "submit");
        button_Two.setAttribute("class", "btn btn-sm rmv hide");
        button_Two.setAttribute("data-index", testIndex);
        button_Two.onclick = removeNode;
        button_Two.innerText = "-";

        // Append Form
        div.insertAdjacentElement("beforeend", select_One);
        div.insertAdjacentElement("beforeend", input);
        div.insertAdjacentElement("beforeend", select_Two);
        div.insertAdjacentElement("beforeend", button_One);
        div.insertAdjacentElement("beforeend", button_Two);
        form.append(div);
        e.target.parentElement.append(form);

        // Modify Input Layer
        e.target[0].setAttribute("disabled", "true");
        e.target[1].setAttribute("disabled", "true");
        e.target[2].setAttribute("disabled", "true");
        e.target[3].classList.add("hide");
        e.target[4].classList.remove("hide");
    };

    const removeNode = (e) => {
        e.preventDefault();
        console.log(e);

        // Define Data
        const a = formData["formData"];
        const testIndex = e.target.dataset.index;
        const test = data[testIndex].split(":")[2].replaceAll(" ", "_");
        const target = e.target.parentElement.childNodes[0].value;
        delete a["testData"][test][target];

        // update State
        setFormData({ formData: a });

        // Remove Node
        e.target.parentNode.parentNode.remove();
    };

    return (
        <Fragment>
            <div className="d-flex align-items-start justify-content-between">
                {/* tab 1 */}
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "30%" }}>
                    {data.map((key, index) => (
                        <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${key.split(":")[1]}-services-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${key.split(":")[1]}-services`} type="button" role="tab" aria-controls={`v-pills-${key.split(":")[1]}-services`} aria-selected="true">
                            {key.split(":")[2]}
                        </div>
                    ))}
                </div>
                {/* tab 2 */}
                <div className="tab-content ps-2" id="v-pills-tabContent" style={{ borderLeft: "1px solid rgba(149, 170, 201, .3)", width: "70%", height: "350px", overflow: "hidden auto" }}>
                    {data.map((key, index) => (
                        <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${key.split(":")[1]}-services`} role="tabpanel" aria-labelledby={`v-pills-${key.split(":")[1]}-services-tab`}>
                            <form action="#" method="post" onSubmit={(e) => addNewLayer(e)} data-cat={key.split(":")[0]} data-index={index}>
                                <div className="input-group mb-2" style={{ fontSize: "13px" }}>
                                    <select name="" id="" className="form-select form-select-sm" style={{ width: "40%" }}>
                                        {testParams[key.split(":")[0]]["parameter"].map((key, index) => (
                                            <option key={index} value={key.split(":")[0]}>
                                                {key.split(":")[0].replaceAll("_", " ")}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="text" className="form-control form-control-sm" name="" id="" style={{ width: "15%" }} placeholder="value" autoComplete="0" required />
                                    <select name="" id="" className="form-select form-select-sm">
                                        {testParams[key.split(":")[0]]["unit"].sort().map((key, index) => (
                                            <option key={index} value={key.split(":")[0]}>
                                                {key.split(":")[0]}
                                            </option>
                                        ))}
                                    </select>
                                    <button type="submit" className={`btn btn-sm add ${"fvk" + position}`}>
                                        +
                                    </button>
                                    <button type="button" className="btn btn-sm rmv hide" data-cat={key.split(":")[0]} data-index={index} onClick={(e) => removeNode(e)}>
                                        -
                                    </button>
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export const retrieve_Result = () => {
    return result;
};

export default ResultEntry;
