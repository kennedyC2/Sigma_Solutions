// Import dependencies
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const appReducer = (state = {}, action) => {
    switch (action.type) {
        // Personal Profile
        // ====================================================================================================================
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
        // ====================================================================================================================
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
            const services = action.payload.services;
            const stats = action.payload.stats;
            const top_5 = action.payload.top_5;

            return {
                ...state,
                services: { ...services },
                stats: { ...stats },
                top_5: { ...top_5 },
            };
        }

        // Booking A TEst
        // ====================================================================================================================
        case "bookTest": {
            // Get Tests
            const test = state.tests;

            // VAr
            const unsettled = action.payload.unsettled;
            const stats = action.payload.stats;
            const activity = action.payload.lab_activities;
            const hourly = action.payload.hourly;
            const top_5 = action.payload.top_5;
            const storage = action.payload.storage;
            const revenue = action.payload.revenue;

            // Update Tests
            test.unsettled = unsettled;

            if (action.payload.admin !== undefined) {
                const admin = action.payload.admin;

                // Upload
                return {
                    ...state,
                    test: { ...test },
                    stats: { ...stats },
                    lab_activities: { ...activity },
                    hourly: { ...hourly },
                    storage: { ...storage },
                    top_5: { ...top_5 },
                    revenue: { ...revenue },
                    admin: { ...admin },
                };
            }

            const user = action.payload.user;

            // Upload
            return {
                ...state,
                test: { ...test },
                stats: { ...stats },
                lab_activities: { ...activity },
                hourly: { ...hourly },
                storage: { ...storage },
                top_5: { ...top_5 },
                revenue: { ...revenue },
                users: { ...user },
            };
        }

        // Pending Tests
        // ====================================================================================================================
        case "incomplete_Result": {
            // Previous Data
            const test = state.tests;
            test.unsettled = action.payload;

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
            const test = action.payload.tests;
            const storage = action.payload.storage;

            // Upload
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
            const testKits = action.payload.testKits;
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

        // ====================================================================================================================
        case "profile": {
            // Profile Data
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
            // Profile Data
            const data = action.payload;

            // Upload
            return {
                ...state,
                company: { ...data },
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
const store = configureStore({ reducer: appReducer, middleware: [thunk] });

export default store;
