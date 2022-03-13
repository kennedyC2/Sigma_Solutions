// Import dependencies
import { createStore } from "redux";
import initialState from "../Helpers/data";

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "add": {
            if (state["selected"][action.payload.category] !== undefined) {
                //  Define Data to be Stored
                const data = {};
                data["title"] = action.payload.title;
                data["cost"] = action.payload.cost;
                data["description"] = action.payload.description;

                // Merge with Previous Data
                const oldData = state.selected;
                oldData[action.payload.category].testList.push(data);

                return {
                    ...state,
                    selected: { ...oldData },
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
                const oldData = state.selected;
                oldData[action.payload.category] = data;

                return {
                    ...state,
                    selected: { ...oldData },
                };
            }
        }

        default: {
            return state;
        }
    }
};

//  Create Store
const store = createStore(appReducer);

export default store;
