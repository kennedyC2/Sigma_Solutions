// ========================================================================
//                             Register
// ========================================================================

// Import libraries
import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormTop from "./components/top";
import FormBottom from "./components/bottom";
import { year, months, monthNum, date, month, hours } from "../../../Misc/helper";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { get, set } from "idb-keyval";
import { store } from "../../../Misc/cacheStorage";
import { Notification_B } from "../../../Misc/notification";

// App
const Register = () => {
    const Dispatch = useDispatch();
    const services = useSelector((state) => state.services);
    const personal = useSelector((state) => state.personal);

    // Confirm log In status
    const [status] = useState(
        () =>
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                token: false,
                path: {
                    type: false,
                    companyID: false,
                },
            }
    );

    const [formData, updateFormData] = useState({
        firstname: "",
        lastname: "",
        other: "",
        day: date.toString(),
        month: month.toString(),
        year: year.toString(),
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
        account: status.ff,
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

    const handleSubmit = async (e) => {
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

        // Source Account
        data["source"] = `${personal.lastname}`;

        //  Send
        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:5000/laboratory/tests/booking",
                data: { ...data, type: status.path.type, tokenID: status.key, companyID: status.path.companyID },
            });

            const result = response.data;

            window.scrollTo(0, 0);

            // Update User
            if (status.ff === "admin") {
                await set("admin", result.admin, store);
            } else {
                await set("users", result.user, store);
            }

            // Update stats
            await set("stats", result.stats, store);

            // Update top_5
            await set("top_5", result.top_5, store);

            // Update hourly
            await set("hourly", result.hourly, store);

            // Update lab_activities
            await set("lab_activities", result.lab_activities, store);

            // Update storage
            await set("storage", result.storage, store);

            // Update revenue
            await set("revenue", result.revenue, store);

            // Update unsettled
            const tests = await get("tests", store);
            tests.unsettled = result.unsettled;
            await set("tests", tests, store);

            setTimeout(() => {
                // Notify
                Notification_B(response.data.message, true);

                // State
                Dispatch({ type: "bookTest", payload: response.data });
            }, 500);
        } catch (error) {
            // Notify
            Notification_B(error.response.data.error, false);
        }
        form.reset();
    };

    return status.loggedIn === true ? (
        <Fragment>
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
        </Fragment>
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default Register;
