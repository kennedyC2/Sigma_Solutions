// Import Dependencies
import { month, date } from "./helper";

// One Layer Nesting
// ========================================================
export const one_layer = (obj) => {
    let count = 0;
    let file = [];
    for (const prop in obj) {
        if (count < 4) {
            file.push(obj[prop]["details"]);
        }

        count++;
    }

    return file;
};

// Two Layer Nesting
// ========================================================
export const two_layer = (obj, add) => {
    let count = 0;
    let file = [];

    if (add) {
        for (const prop in obj[`${month} ${date}`]) {
            if (count < 5) {
                file.push(obj[`${month} ${date}`][prop]);
            }

            count++;
        }

        return file;
    }

    for (const prop in obj[`${month} ${date}`]) {
        if (count < 4) {
            file.push(obj[`${month} ${date}`][prop]);
        }

        count++;
    }

    return file;
};
