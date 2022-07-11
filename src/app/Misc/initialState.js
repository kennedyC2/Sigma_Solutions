// Initial State Of Store
// =============================================================

// Dependencies
import { get } from "idb-keyval";
import { store } from "./cacheStorage";
import testData from "./testData";

// Component
export const Auth = async (callback) => {
    // Get Cache
    const personal = await get("personal", store);
    callback({ type: "personal", payload: personal });
};

const InitialState = async (callback) => {
    // Define DAta
    const data = {};

    // Populate
    data["personal"] = await get("personal", store);

    data["company"] = await get("company", store);

    data["hourly"] = await get("hourly", store);

    data["lab_activities"] = await get("lab_activities", store);

    data["admin"] = await get("admin", store);

    data["revenue"] = await get("revenue", store);

    data["services"] = await get("services", store);

    data["stats"] = await get("stats", store);

    data["storage"] = await get("storage", store);

    data["testKits"] = await get("testKits", store);

    data["tests"] = await get("tests", store);

    data["top_5"] = await get("top_5", store);

    data["users"] = await get("users", store);

    data["fetched"] = await get("fetched", store);

    data["database"] = testData;

    callback({ type: "Full_State", payload: data });
};

export default InitialState;
