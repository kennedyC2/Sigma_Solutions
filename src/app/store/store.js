// Import dependencies
import { createStore } from "redux";
import { hoursInString, date, month } from "../Misc/helper";

const appReducer = (state = {}, action) => {
    switch (action.type) {
        // Personal Profile
        case "personalDetails": {
            if (state["personal"] === undefined) {
                const data = {};
                data["auth"] = action.payload.auth;
                data["personal"] = action.payload.personal;
                return {
                    ...state,
                    ...data,
                };
            }

            return state;
        }

        // Services
        // ====================================================================================================================
        case "addServices": {
            if (state["services"][action.payload.category] !== undefined) {
                //  Define Data to be Stored
                const data = {};
                data["title"] = action.payload.title;
                data["cost"] = action.payload.cost;
                data["description"] = action.payload.description;

                // Merge with Previous Data
                const oldData = state.services;
                const stats = state.stats;
                const top_5 = state.top_5;
                oldData[action.payload.category].testList.push(data);
                stats.services += 1;
                top_5["tests"][action.payload.title.trim().replaceAll(" ", "_")] = 0;

                return {
                    ...state,
                    services: { ...oldData },
                    stats: stats,
                    top_5: top_5,
                };
            } else {
                //  Define Data to be Stored
                const data = {};
                data["name"] = action.payload.name;
                data["display"] = action.payload.display;
                data["testList"] = [];
                const newTest = {};
                newTest["title"] = action.payload.title;
                newTest["cost"] = action.payload.cost;
                newTest["description"] = action.payload.description;
                data["testList"].push(newTest);

                // Merge With Previous Data
                const oldData = state.services;
                const stats = state.stats;
                const top_5 = state.top_5;
                oldData[action.payload.category] = data;
                stats.services += 1;
                top_5["tests"][action.payload.title.trim().replaceAll(" ", "_")] = 0;

                return {
                    ...state,
                    services: { ...oldData },
                    stats: stats,
                    top_5: top_5,
                };
            }
        }

        // Booking A TEst
        // ====================================================================================================================
        case "bookTest": {
            const test = state.test;
            const stats = state.stats;
            const activity = state.lab_activities;
            const hourly = state.hourly;
            const top_5 = state.top_5;
            const storage = state.storage;

            // Update stat Data
            stats.test += 1;
            stats.revenue += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));

            // Define activity data
            const actData = {};
            actData["firstname"] = action.payload.firstname;
            actData["lastname"] = action.payload.lastname;
            actData["other"] = action.payload.other;
            actData["date"] = action.payload.date;
            actData["time"] = action.payload.time;
            actData["type"] = "Booked A Test";

            // Update
            activity.unshift(actData);

            // update hourly
            const hour = parseInt(hoursInString.split(":")[0]);

            if (hour <= 8 && hoursInString.split(":")[1] === "am") {
                hourly["a"][0] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
                hourly["b"] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 8 && hour <= 10 && hoursInString.split(":")[1] === "am") {
                hourly["a"][1] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
                hourly["b"] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 10 && hour <= 12 && hoursInString.split(":")[1] === "pm") {
                hourly["a"][2] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
                hourly["b"] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 0 && hour <= 2 && hoursInString.split(":")[1] === "pm") {
                hourly["a"][3] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
                hourly["b"] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 2 && hour <= 4 && hoursInString.split(":")[1] === "pm") {
                hourly["a"][4] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
                hourly["b"] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 4 && hour <= 6 && hoursInString.split(":")[1] === "pm") {
                console.log("hello");
                hourly["a"][5] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
                hourly["b"] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 6 && hour <= 8 && hoursInString.split(":")[1] === "pm") {
                hourly["a"][6] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
                hourly["b"] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 8 && hour <= 10 && hoursInString.split(":")[1] === "pm") {
                hourly["a"][7] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
                hourly["b"] += parseInt(action.payload.servicesTest.map((cost) => cost.split(":").pop()));
            }

            // update Top 5 Test
            for (const item of action.payload.servicesTest) {
                top_5["tests"][item.split(":")[2].trim().replaceAll(" ", "_")] += 1;
            }

            // Update Storage
            storage["pending"] += 1;

            // Update Unsettled
            if (test["unsettled"][`${month} ${date}`] !== undefined) {
                // Prev
                test["unsettled"][`${month} ${date}`] = [...test["unsettled"][`${month} ${date}`], action.payload];

                // Upload
                return {
                    ...state,
                    test: { ...test },
                    stats: stats,
                    lab_activities: activity,
                    hourly: hourly,
                    storage: storage,
                };
            }

            // Create Object
            test["unsettled"][`${month} ${date}`] = [];

            // Add new
            test["unsettled"][`${month} ${date}`] = [...test["unsettled"][`${month} ${date}`], action.payload];

            // Upload
            return {
                ...state,
                test: { ...test },
                stats: stats,
                lab_activities: activity,
                hourly: hourly,
                storage: storage,
            };
        }

        // Pending Tests
        // ====================================================================================================================
        case "incomplete_Result": {
            // Previous Data
            const test = state.test;

            for (const category in action.payload.testData) {
                if (test["unsettled"][action.payload.date][action.payload.index]["result"][category] !== undefined) {
                    for (const item in action.payload.testData[category]) {
                        test["unsettled"][action.payload.date].map((each, index) => (index === action.payload.index ? (each["result"][category][item] = action.payload.testData[category][item]) : each));
                    }
                } else {
                    test["unsettled"][action.payload.date].map((each, index) => (index === action.payload.index ? (each["result"][category] = action.payload.testData[category]) : each));
                }
            }

            // Upload
            return {
                ...state,
                test: { ...test },
            };
        }

        // Completed Tests
        // ====================================================================================================================
        case "complete_Result": {
            // test Previous Data
            const test = state.test;
            const storage = state.storage;

            // Get File from unsettled
            const file = test["unsettled"][action.payload.date][action.payload.position];

            // Remove file from unsettled
            test["unsettled"][action.payload.date] = test["unsettled"][action.payload.date].filter((data) => data !== test["unsettled"][action.payload.date][action.payload.position]);

            if (test["this_Month"][action.payload.date] !== undefined) {
                test["this_Month"][action.payload.date] = [...test["this_Month"][action.payload.date], file];
            } else {
                test["this_Month"][action.payload.date] = [file];
            }

            if (test["unsettled"][action.payload.date].length < 1) {
                delete test["unsettled"][action.payload.date];
            }

            storage["pending"] -= 1;
            storage["completed"] += 1;

            // // Upload
            return {
                ...state,
                test: { ...test },
                storage: storage,
            };
        }

        // Add New User
        // ====================================================================================================================
        case "addUser": {
            // Previous Data
            const oldData = state.users;
            const stats = state.stats;
            stats.employees.total += 1;

            // Upload
            return {
                ...state,
                users: [...oldData, action.payload],
                stats: stats,
            };
        }

        // Add New Kit
        // ====================================================================================================================
        case "addKit": {
            // kit Previous Data
            const oldData = state.testKits;

            // Upload
            return {
                ...state,
                testKits: [...oldData, action.payload],
            };
        }

        case "profile": {
            // Profile Previous Data
            const oldData = state.profile;
            oldData.personal = action.payload;

            // Upload
            return {
                ...state,
                profile: { ...oldData },
            };
        }

        // Add Company
        // ====================================================================================================================
        case "company": {
            // Profile Previous Data
            const oldData = state.profile;
            oldData.company = action.payload;

            // Upload
            return {
                ...state,
                profile: { ...oldData },
            };
        }

        // Default
        // ====================================================================================================================
        default: {
            return state;
        }
    }
};

//  Create Store
const store = createStore(appReducer);

export default store;
