// ========================================================================
//                             Register
// ========================================================================

// Import libraries
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormTop from "./components/top";
import FormBottom from "./components/bottom";
import { year, months, monthNum, date, month, hours } from "../../../Helpers/helper";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";

// App
const Register = () => {
    const services = useSelector((state) => state.selected);
    const Dispatch = useDispatch();

    const [formData, updateFormData] = useState({
        firstname: "",
        lastname: "",
        other: "",
        day: date,
        month: month,
        year: year,
        date: "",
        time: "",
        age: "",
        sex: "male",
        religion: "christian (catholic)",
        tribe: "igbo",
        phone: "",
        email: "",
        diagnosis: "",
        specimen: [],
        selectedTest: [],
        result: {},
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById(e.target.id);
        const data = formData;

        if (parseInt(formData["year"]) === parseInt(year)) {
            const age = monthNum - months.indexOf(formData["month"]) + 1;
            data.age = age < 2 ? age + " month" : age + " months";
        }

        if (parseInt(formData["year"]) < parseInt(year)) {
            const diff = parseInt(year) - parseInt(formData["year"]);
            if (diff === 1) {
                const prev = 12 - months.indexOf(formData["month"]);
                const next = monthNum + 1;
                data.age = prev + next < 2 ? prev + next + " month" : prev + next + " months";
            } else {
                var age = 0;
                for (var i = 1; i < diff + 1; i++) {
                    if (i === 1) {
                        age += 12 - months.indexOf(formData["month"]);
                    }

                    if (i === diff + 1) {
                        age += monthNum + 1;
                    }

                    age += 12;
                }
                data.age = Math.floor(age / 12) < 2 ? Math.floor(age / 12) + " year" : Math.floor(age / 12) + " years";
            }
        }

        // time
        const now = new Date(Date.now());
        data["time"] = `${hours[now.getHours()].split(":")[0]}:${now.getMinutes() < 10 ? "0" + now.getMinutes().toString() : now.getMinutes().toString()} ${hours[now.getHours()].split(":")[1]}`;
        data["date"] = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        console.log(data);
        Dispatch({ type: "bookTest", payload: data });
        form.reset();
    };

    return (
        <React.Fragment>
            <div className="register" style={{ height: "auto" }}>
                <div className="" id="pyl" style={{ backgroundImage: `url(${bg})` }}></div>
                <div className="px-4 mt-4">
                    <div>
                        <form action="#" method="post" id="register" onSubmit={handleSubmit}>
                            <FormTop data={formData} setData={updateFormData} specimenHandler={handleSpecimen} />
                            <FormBottom testData={services} selectedTestHandler={handleSelectedTest} />
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Register;
