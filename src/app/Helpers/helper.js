const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();

// Seconds
export const seconds = today.getSeconds();

// Minutes
export const minutes = today.getMinutes();

// Hour
export const hour = today.getHours();

// Date
export const date = today.getDate();

// Day
export const day = days[today.getDay()];

// Month in number
export const monthNum = today.getMonth();

// Month in words
export const month = months[today.getMonth()];

// Year
export const year = today.getFullYear();

// Registration Form Date Of Birth Helper
export const CalenderYear = () => {
    let data = ["Year"];
    for (var i = Math.round(year) - 100 + (2000 - year); i < year + 1; i++) {
        data.push(i);
    }
    return data;
};

export const RF_days = ["Day", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
export const RF_months = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Specimen
export const specimen = ["Blood", "Urine", "Sputum", "Faeces", "Saliva", "Swab", "Tissue", "CSF", "Semen"];

// Religion
export const religion = ["Christian (Catholic)", "Christian (Pentecostal)", "Christian (Jehovah Witness)", "Muslim", "Judaism", "Hindi", "Traditional", "None"];

// Sex
export const sex = ["Male", "Female", "Transgender", "Homosexual"];

// Tribe
export const tribe = ["Igbo", "Yoruba", "Hausa", "Tiv", "Efik", "Fulani"];
