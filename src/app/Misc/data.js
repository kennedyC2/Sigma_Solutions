// Initial State
const initialState = {
    auth: {},

    Database: {
        Clinical_Chemistry: {
            name: "chempath",
            parameter: ["Sodium:128_142mmol/l", "Potassium:34_48mmol/l", "Bicarbonate:24_30mmol/l", "Urea:2.4_6.0mmol/l", "Creatinine:60_120mmol/l", "Creatinine_Clearance:100_130mmol/l", "Calcium:2.1_2.6mmol/l", "Blood_Glucose_(Fasting):3.3_5.5mmol/l", "Total_Protein:62_80g/l", "Albumin:36_50g/l", "Triglycerides:0.3_1.8mmol/l", "Total_Cholesterol:2.6_6.0mmol/l", "HDL_Cholesterol:.............", "Total_Bilirubin:5.17umol/l", "Conjugated_Bilirubin:<8.5umol/l", "Alanine_transaminase (ALT):..........", "Aspartate_transaminase (AST):.........", "Alkaline_phosphatase (ALP):............", "Gamma-glutamyltransferase_(GGT):............", "Acid_phosphatase_(Total):........", "Acid_phosphatase (Prostatic):...........", "Amylase:........", "Creatine_Phosphokinase (CPK):.........", "Uric_Acid:...........", "Hydroxybutyrate_Dehydrogenase_(HBD):........"],
            unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
        },

        Hematology: {
            name: "heme",
            parameters: {},
        },

        Histology_Cytology: {
            name: "histo",
            parameters: {},
        },

        Immunology: {
            name: "immune",
            parameters: {},
        },

        Microbiology: {
            name: "micro",
            parameters: {},
        },

        Hormonal_Assay: {
            name: "hom",
            parameters: {},
        },

        "Digital_X-Ray": {
            name: "xray",
            parameters: {},
        },

        Ultrasonography: {
            name: "ultra",
            parameters: {},
        },

        "Magnetic_Resonance_Imaging_(MRI)": {
            name: "mri",
            parameters: {},
        },

        "Computerized Tomography (CT)": {
            name: "ct",
            parameters: {},
        },

        Cardiology: {
            name: "cardio",
            parameters: {},
        },

        Breast_Clinic: {
            name: "breast",
            parameters: {},
        },
    },

    services: {},

    test: {
        unsettled: {},

        this_Month: {},
    },

    users: [],

    testKits: [],

    stats: {
        test: 0,
        revenue: 0,
        services: 0,
        employees: {
            total: 0,
            online: 0,
        },
    },

    lab_activities: [],

    hourly: {
        a: [0, 0, 0, 0, 0, 0, 0, 0],
        b: 0,
    },

    top_5: {
        sorted: 0,
        tests: {},
    },

    storage: {
        completed: 0,
        pending: 0,
        kits: 0,
    },

    revenue: {
        days: [],
        amount: [],
    },

    profile: {
        personal: {
            firstname: "Amadi",
            lastname: "Precious",
            other: "Chioma",
            sex: "Female",
            day: "17",
            month: "April",
            year: "2010",
            phone: "+2348178359407",
            email: "kennedychidi55@gmail.com",
            address: "Imo state university teaching hospital, orlu",
            state: "Imo State",
            country: "Nigeria",
        },

        company: {
            name: "Phantom Developers",
            type: "Laboratory",
            phone: "+2348178359407",
            reg_no: "DD5E-817835",
            email: "kennedychidi55@gmail.com",
            address: "Imo State University Teaching Hospital, Orlu",
            state: "Enugu State",
            country: "Nigeria",
        },
    },
};

export default initialState;
