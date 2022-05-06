// Import dependencies
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { hoursInString, date, month } from "../Misc/helper";

const appReducer = (state = {}, action) => {
    switch (action.type) {
        // Personal Profile
        case "personal": {
            if (state["personal"] === undefined) {
                const data = {};
                data["personal"] = action.payload;

                return {
                    ...state,
                    ...data,
                };
            }

            return state;
        }

        // Full Data
        case "Full_State": {
            const data = action.payload;
            return {
                ...state,
                ...data,
            };
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

                // Add
                if (oldData[action.payload.category].testList[action.payload.title] !== undefined) {
                    return {
                        ...state,
                    };
                } else {
                    oldData[action.payload.category].testList[action.payload.title] = data;
                    stats.services += 1;
                    top_5["tests"][action.payload.title.trim().replaceAll(" ", "_")] = 0;

                    return {
                        ...state,
                        services: { ...oldData },
                        stats: stats,
                        top_5: top_5,
                    };
                }
            } else {
                //  Define Data to be Stored
                const data = {};
                data["name"] = action.payload.name;
                data["display"] = action.payload.display;
                data["testList"] = {};
                const newTest = {};
                newTest["cost"] = action.payload.cost;
                newTest["description"] = action.payload.description;
                data["testList"][action.payload.title] = newTest;

                // Merge With Previous Data
                const oldData = state.services;
                const stats = state.stats;
                const top_5 = state.top_5;
                oldData[action.payload.category] = data;
                stats.services += 1;
                top_5["tests"][action.payload.title.trim().replaceAll(" ", "_").toLowerCase()] = 0;

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
            const test = state.tests;
            const stats = state.stats;
            const activity = state.lab_activities;
            const hourly = state.hourly;
            const top_5 = state.top_5;
            const storage = state.storage;
            const admin = state.admin;

            // Update stat Data
            stats.test += 1;
            stats.revenue += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));

            // Define activity data
            const actData = {};
            actData["firstname"] = action.payload.firstname;
            actData["lastname"] = action.payload.lastname;
            actData["other"] = action.payload.other;
            actData["source"] = action.payload.source;
            actData["date"] = action.payload.date;
            actData["time"] = action.payload.time;
            actData["type"] = "Booked A Test";

            if (action.payload.account === "admin") {
                if (admin[`${date} ${month}`] !== undefined) {
                    // Update admin activity
                    admin[`${month} ${date}`] = [actData, ...admin[`${month} ${date}`]];
                } else {
                    // Update admin activity
                    admin[`${month} ${date}`] = [actData];
                }
            }

            // Update Lab Activity
            if (activity[`${month} ${date}`] !== undefined) {
                // Update admin activity
                activity[`${month} ${date}`] = [actData, ...activity[`${month} ${date}`]];
            } else {
                // Update admin activity
                activity[`${month} ${date}`] = [actData];
            }

            // update hourly
            const hour = parseInt(hoursInString.split(":")[0]);

            if (hour <= 8 && hoursInString.split(":")[1] === "am") {
                hourly["amount"][0] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
                hourly["total"] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 8 && hour <= 10 && hoursInString.split(":")[1] === "am") {
                hourly["amount"][1] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
                hourly["total"] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 10 && hour <= 12 && hoursInString.split(":")[1] === "pm") {
                hourly["amount"][2] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
                hourly["total"] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 0 && hour <= 2 && hoursInString.split(":")[1] === "pm") {
                hourly["amount"][3] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
                hourly["total"] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 2 && hour <= 4 && hoursInString.split(":")[1] === "pm") {
                hourly["amount"][4] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
                hourly["total"] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 4 && hour <= 6 && hoursInString.split(":")[1] === "pm") {
                console.log("hello");
                hourly["amount"][5] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
                hourly["total"] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 6 && hour <= 8 && hoursInString.split(":")[1] === "pm") {
                hourly["amount"][6] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
                hourly["total"] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
            }

            if (hour > 8 && hour <= 10 && hoursInString.split(":")[1] === "pm") {
                hourly["amount"][7] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
                hourly["total"] += parseInt(action.payload.selectedTest.map((cost) => cost.split(":").pop()));
            }

            // update Top 5 Test
            for (const item of action.payload.selectedTest) {
                top_5["tests"][item.split(":")[2].trim().replaceAll(" ", "_").toLowerCase()] += 1;
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
                    admin: admin,
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
                admin: admin,
            };
        }

        // Pending Tests
        // ====================================================================================================================
        case "incomplete_Result": {
            // Previous Data
            const test = state.tests;

            for (const category in action.payload.testData) {
                if (test["unsettled"][action.payload.date][action.payload.position]["result"][category] !== undefined) {
                    for (const item in action.payload.testData[category]) {
                        test["unsettled"][action.payload.date][action.payload.position]["result"][category][item] = action.payload.testData[category][item];
                    }
                } else {
                    test["unsettled"][action.payload.date][action.payload.position]["result"][category] = action.payload.testData[category];
                }
            }

            // Upload
            return {
                ...state,
                tests: { ...test },
            };
        }

        // Completed Tests
        // ====================================================================================================================
        case "complete_Result": {
            // test Previous Data
            const test = state.tests;
            const storage = state.storage;
            console.log(test);

            // Get File from unsettled
            const file = test["unsettled"][action.payload.date][action.payload.position];

            // Remove file from unsettled
            test["unsettled"][action.payload.date] = test["unsettled"][action.payload.date].filter((data) => data !== test["unsettled"][action.payload.date][action.payload.position]);

            if (test["settled"][action.payload.date] !== undefined) {
                test["settled"][action.payload.date] = [file, ...test["settled"][action.payload.date]];
            } else {
                test["settled"][action.payload.date] = [file];
            }

            if (test["unsettled"][action.payload.date].length < 1) {
                delete test["unsettled"][action.payload.date];
            }

            storage["pending"] -= 1;
            storage["completed"] += 1;
            console.log(test);

            // // Upload
            return {
                ...state,
                tests: { ...test },
                storage: { ...storage },
            };
        }

        // Add New User
        // ====================================================================================================================
        case "addUser": {
            // Previous Data
            const users = state.users;
            const stats = state.stats;
            stats.employees += 1;

            // Update
            users[action.payload.user.details.email.split("@")[0]] = action.payload.user;

            // Upload
            return {
                ...state,
                users: { ...users },
                stats: { ...stats },
            };
        }

        // Add New Kit
        // ====================================================================================================================
        case "addKit": {
            // kit Previous Data
            const testKits = action.payload.testsKits;
            const storage = action.payload.storage;
            const services = action.payload.services;

            // Upload
            return {
                ...state,
                testKits: { ...testKits },
                storage: { ...storage },
                services: { ...services },
            };
        }

        case "profile": {
            // Profile Previous Data
            const data = action.payload;

            // Upload
            return {
                ...state,
                personal: { ...data },
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
const store = createStore(appReducer, applyMiddleware(thunk));

export default store;
