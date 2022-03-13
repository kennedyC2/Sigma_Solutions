// ========================================================================
//                             Register
// ========================================================================

// Import libraries
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FormTop from "./components/top";
import FormBottom from "./components/bottom";
// import { year, RF_months, monthNum } from "../../../Helpers/helper";

// App
const Register = () => {
    const services = useSelector((state) => state.selected);

    const [formData, updateFormData] = useState({
        firstname: "",
        lastname: "",
        other: "",
        day: "",
        month: "",
        year: "",
        sex: "",
        religion: "",
        tribe: "",
        phone: "",
        email: "",
        diagnosis: "",
        specimen: [],
        selectedTest: [],
    });

    const handleSpecimen = (e) => {
        if (e.target.checked) {
            if (!formData.specimen.includes(e.target.value)) {
                updateFormData({ ...formData, specimen: [...formData.specimen, e.target.value] });
            }
        } else {
            if (formData.specimen.includes(e.target.value)) {
                updateFormData({
                    ...formData,
                    specimen: [
                        ...formData.specimen.filter((word) => {
                            return word !== e.target.value;
                        }),
                    ],
                });
            }
        }
    };

    const handleSelectedTest = (e) => {
        console.log(e);
        if (e.target.checked) {
            if (!formData.selectedTest.includes(e.target.value)) {
                updateFormData({ ...formData, selectedTest: [...formData.selectedTest, e.target.value] });
            }
        } else {
            if (formData.selectedTest.includes(e.target.value)) {
                updateFormData({
                    ...formData,
                    selectedTest: [
                        ...formData.selectedTest.filter((word) => {
                            return word !== e.target.value;
                        }),
                    ],
                });
            }
        }
    };

    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const form = document.getElementById(e.target.id);

        // if (form.elements["year"].value == year) {
        //     const age = monthNum + 1 - RF_months.indexOf(form.elements["month"].value);
        //     data["age"] = age < 2 ? age + " month" : age + " months";
        // }

        // if (form.elements["year"].value < year) {
        //     const age = year - form.elements["year"].value;
        //     data["age"] = age < 2 ? age + " year" : age + " years";
        // }
    };

    return (
        <React.Fragment>
            <div className="register px-5 pt-5 pb-4 my-3" style={{ minHeight: "70vh", height: "auto" }}>
                <form action="#" method="post" id="register" onSubmit={handleSubmit}>
                    <FormTop data={formData} setData={updateFormData} specimenHandler={handleSpecimen} />
                    <hr className="dropdown-divider" style={{ margin: "0", opacity: ".2", color: "rgb(149, 170, 201)" }} />
                    <FormBottom testData={services} selectedTestHandler={handleSelectedTest} />
                </form>
            </div>
        </React.Fragment>
    );
};

export default Register;
