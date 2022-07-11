// Initial State
const testData = {
    Clinical_Chemistry: {
        name: "chempath",
        class: {
            Blood_Sugar: ["Fasting_Blood_Sugar_(FBS)", "Random_Blood_Sugar_(RBS)", "Oral_Glucose_Tolerance_Test_(OGTT)"],
            Lipid_Profile: ["Total_Cholesterol", "Low_density_Lipoprotein_(LDL)", "High_density_Lipoprotein_(HDL)", "Triglycerides"],
            Blood_Chemistry: ["Sodium", "Potassium", "Chloride", "Bicarbonate", "Calcium", "Phosphate", "Magnesium", "Blood_Urea_Nitrogen_(BUN)", "Uric_Acid", "Amylase", "Serum_Creatinine", "Glucose-6-Phosphate_Dehydrogenase_(G6PD)"],
            Cardiac_Enzymes: ["Creatinine_phosphokinase_(CPK)", "Creatinine_phosphokinase_MB_(CPK-MB)", "Myoglobin", "Ischemia_Modified_Albumin_(IMA)", "Atrial_Natriuretic_Peptide_(ANP)", "C_Reactive_Protein_(CRP)", "Homocysteine", "Troponin"],
            Liver_Function_Test: ["Albumin", "Total_Protein", "Albumin-Globulin_Ratio_(A/G)", "Alkaline_Phosphatase_(ALP)", "Alanine_Transaminase_(ALT)", "Aspartate_Aminotransferase_(AST)", "Gamma_Glutamyl_Transferase_(GGT)", "Total Bilirubin", "Direct Bilirubin", "Lactate_Dehydrogenase_(LDH)", "Prothrombin_Time(PT)", "5_Nucleotidase_(5NT)", "Globulin"],
            Urinalysis: ["Appearance", "Specific_Gravity", "Acidity_(PH)", "Glucose", "Protein", "Ascorbic_Acid", "Ketone", "Nitrite", "Bilirubin", "Urobilinogen", "Blood"],
            Basic_Metabolic_Panel: ["Calcium", "Glucose", "Sodium", "Potassium", "Bicarbonate", "Chloride", "Blood_Urea_Nitrogen", "Serum_Creatinine"],
            Comprehensive_Metabolic_Panel: ["Calcium", "Glucose", "Sodium", "Potassium", "Bicarbonate", "Chloride", "Blood_Urea_Nitrogen", "Serum_Creatinine", "Albumin", "Total_Protein", "Alkaline_Phosphatase_(ALP)", "Alanine_Transaminase_(ALT)", "Aspartate_Aminotransferase_(AST)", "Bilirubin"],
        },
        unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    },

    // Hematology: {
    //     name: "heme",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // Histology_Cytology: {
    //     name: "histo",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // Immunology: {
    //     name: "immune",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    Microbiology: {
        name: "micro",
        class: {
            Urine_Microscopy: ["White_Blood_Cells", "Red_Blood_Cells", "Casts", "Crystals", "Yeast_Cells", "Bacteria", "Parasite"],
        },
        parameters: {},
        unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    },

    // Hormonal_Assay: {
    //     name: "hom",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // "Digital_X-Ray": {
    //     name: "xray",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // Ultrasonography: {
    //     name: "ultra",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // "Magnetic_Resonance_Imaging_(MRI)": {
    //     name: "mri",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // "Computerized Tomography (CT)": {
    //     name: "ct",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // Cardiology: {
    //     name: "cardio",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // Breast_Clinic: {
    //     name: "breast",
    //     parameters: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },
};

export default testData;
