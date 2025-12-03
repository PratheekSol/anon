// Complete Medical Intake Dataset - Rebuilt per UX requirements
// Implements branching logic with alphabetized dropdowns and complete datasets

export type QuestionType =
  | "dropdown"
  | "yes-no"
  | "numeric"
  | "date"
  | "height"
  | "weight"
  | "multi-select"
  | "file-upload"
  | "text" // Added text type for "Other" manual entry

export type GenderVisibility = "all" | "male" | "female" | "female-other"

export interface ConditionalChild {
  id: string
  label: string
  type: QuestionType
  options?: string[]
  required?: boolean
  placeholder?: string
  units?: string[]
  tooltip?: string
}

export interface Question {
  id: string
  section: string
  question: string
  type: QuestionType
  options?: string[]
  required: boolean
  genderVisibility: GenderVisibility
  conditionalChildren?: ConditionalChild[]
  units?: string[]
  placeholder?: string
  tooltip?: string
  isOptional?: boolean
  outOfScope?: boolean
  datasetFlag?: string
  healthCategory?: string
  skipGatekeeper?: boolean // Flag to indicate this question goes directly to conditions (no yes/no)
}

export const HEALTH_CATEGORIES = [
  { id: "heart", label: "Heart", icon: "heart" },
  { id: "lungs", label: "Lungs", icon: "wind" },
  { id: "liver", label: "Liver", icon: "activity" },
  { id: "kidney", label: "Kidney / Urology", icon: "droplet" },
  { id: "gut", label: "Gut / Gastrointestinal", icon: "utensils" },
  { id: "neurological", label: "Neurology", icon: "brain" },
  { id: "mental", label: "Mental Health", icon: "brain" },
  { id: "endocrine", label: "Endocrine", icon: "activity" },
  { id: "skin", label: "Skin", icon: "scan" },
  { id: "bone", label: "Bone & Joint", icon: "bone" },
  { id: "immune", label: "Immune System", icon: "shield" },
  { id: "blood", label: "Blood", icon: "droplet" },
  { id: "syndromes", label: "Syndromes", icon: "dna" },
  { id: "allergies", label: "Allergies", icon: "alert-circle" },
  { id: "anaphylaxis", label: "Anaphylaxis", icon: "alert-triangle" },
  { id: "infections", label: "Infection", icon: "bug" },
  { id: "anaesthesia", label: "Anaesthesia problems", icon: "scissors" },
  { id: "disabilities", label: "Disabilities", icon: "accessibility" },
  { id: "medications", label: "Regular medications", icon: "pill" },
  { id: "documents", label: "Document Upload (ECG / scans / blood reports etc.)", icon: "file" },
] as const

export type HealthCategoryId = (typeof HEALTH_CATEGORIES)[number]["id"]

export const SECTIONS = ["Demographics", "Health Overview", "Conditions", "Medications", "Documents"] as const

// Helper function to sort options alphabetically
export function sortAlphabetically(options: string[]): string[] {
  return [...options].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
}

// Heart conditions - full dataset
export const HEART_CONDITIONS = sortAlphabetically([
  "Aortic aneurysm",
  "Aortic regurgitation",
  "Aortic stenosis",
  "AF / AFib (Atrial fibrillation)",
  "Abnormal rhythm",
  "Brugada syndrome",
  "Bypass surgery",
  "Cardiac arrest",
  "Cardiomyopathy",
  "Coronary heart disease",
  "DVT (Deep Vein Thrombosis)",
  "Heart attack",
  "Heart block (1st, 2nd, Mobitz 2, 3rd degree)",
  "Heart failure",
  "Heart stents",
  "Heart transplant",
  "Internal defibrillator (ICD)",
  "Long QT Syndrome",
  "Loop recorder",
  "Mitral regurgitation",
  "Mitral stenosis",
  "Mitral valve prolapse",
  "Pacemaker",
  "Pulmonary embolus",
  "Pulmonary hypertension",
  "SVT (Supraventricular tachycardia)",
  "Syncope",
  "Valve disease",
  "WPW (Wolff-Parkinson-White)",
])

// Lung conditions - full dataset
export const LUNG_CONDITIONS = sortAlphabetically([
  "Asbestosis",
  "Asthma - severe (need steroids or ICU/intubation)",
  "Breathless at rest",
  "Bronchiectasis",
  "Chronic bronchitis",
  "COPD",
  "Cystic fibrosis",
  "Emphysema",
  "Heavy smoker",
  "Home oxygen",
  "ILD (Interstitial Lung Disease)",
  "Lung bulla",
  "Lung cancer",
  "Lung removal",
  "Lung transplant",
  "Mesothelioma",
  "O2 saturation < 90%",
  "Pleural effusion",
  "Pneumothorax",
  "Pulmonary fibrosis",
  "Recurrent pneumonia",
  "Silicosis",
  "Tuberculosis",
])

// Liver conditions - full dataset
export const LIVER_CONDITIONS = sortAlphabetically([
  "Cholangitis",
  "Cirrhosis",
  "Cystic fibrosis",
  "Fatty liver",
  "Hemochromatosis",
  "Hepatic encephalopathy",
  "Hepatitis",
  "Liver cancer",
  "Liver failure",
  "Liver fibrosis",
  "Liver transplant",
  "Oesophageal Varices",
  "Portal Hypertension",
  "Wilson's disease",
])

// Kidney/Urology conditions - full dataset
export const KIDNEY_CONDITIONS = sortAlphabetically([
  "Bladder cancer",
  "Bladder incontinence",
  "Dialysis needed",
  "Glomerulonephritis",
  "Hydroureter",
  "Kidney cancer",
  "Kidney failure",
  "Kidney stones",
  "Kidney transplant",
  "Nephritis",
  "Polycystic kidney disease",
  "Pyelonephritis",
  "Uremic encephalopathy",
  "Urethral stricture",
])

// Additional male-specific urological conditions
export const KIDNEY_MALE_CONDITIONS = sortAlphabetically(["Prostate cancer", "Prostate enlarged", "Prostate removed"])

// Additional female-specific urological conditions
export const KIDNEY_FEMALE_CONDITIONS = sortAlphabetically([
  "Endometriosis",
  "Large fibroids",
  "Large ovarian cysts",
  "Menopause",
  "Menorrhagia",
  "Ovarian cancer",
])

// Gut/GI conditions - full dataset
export const GUT_CONDITIONS = sortAlphabetically([
  "Bowel cancer",
  "Bowel removal",
  "Constipation (severe)",
  "Crohns disease",
  "Diarrhea (severe)",
  "Difficulty swallowing",
  "Gastroparesis",
  "Gastric cancer",
  "GERD / GORD",
  "GI bleeding",
  "Stoma",
  "Ulcer",
  "Ulcerative colitis",
  "Weight loss surgery",
])

// Neurology conditions - full dataset
export const NEUROLOGICAL_CONDITIONS = sortAlphabetically([
  "ADHD",
  "ALS (Amyotrophic Lateral Sclerosis)",
  "Alzheimers",
  "Arnold-Chiari Malformation",
  "Autism",
  "AVM (Arteriovenous malformation)",
  "Brain aneurysm",
  "Brain bleed",
  "Brain surgery",
  "Brain tumour",
  "Dementia",
  "Disc prolapse",
  "Encephalitis",
  "Epilepsy (grand mal or other)",
  "Huntington's disease",
  "Hydrocephalus (with or without shunt)",
  "Lewy body dementia",
  "Meningitis",
  "MND (Motor Neurone Disease)",
  "Multiple sclerosis",
  "Myasthenia gravis",
  "Neurofibromatosis",
  "Paraplegia",
  "Parkinson's disease",
  "Peripheral neuropathy",
  "Quadraplegia",
  "Severe Migraine",
  "Spinal diseases",
  "Spinal surgery",
  "Trigeminal Neuralgia",
])

// Mental Health conditions - full dataset
export const MENTAL_HEALTH_CONDITIONS = sortAlphabetically([
  "ADHD (attention deficit hyperactivity disorder)",
  "Alcohol excessive use",
  "Anorexia",
  "Anxiety",
  "ASD (Autism Spectrum Disorder)",
  "BPD (Borderline Personality Disorder)",
  "Bulimia",
  "Depression",
  "Dyslexia",
  "Dyspraxia",
  "Eating disorder",
  "MDD (Major Depressive Disorder)",
  "Neurodivergent",
  "OCD (Obsessive Compulsive Disorder)",
  "Panic attacks",
  "Phobias (needle, hospital, social, claustrophobia, flying)",
  "Psychosis",
  "PTSD (Post Traumatic Stress Disorder)",
  "Schizoaffective disorder",
  "Schizophrenia",
  "Severe insomnia",
  "SUD (Substance Use Disorder)",
  "Suicidality",
  "Tourette syndrome",
])

// Endocrine conditions - full dataset
export const ENDOCRINE_CONDITIONS = sortAlphabetically([
  "Acromegaly",
  "Addison's disease (Adrenal insufficiency)",
  "Carcinoid syndrome",
  "Conn's syndrome",
  "Cushing's syndrome",
  "Diabetes insipidus",
  "Diabetes Type 1",
  "Diabetes Type 2",
  "Diabetic coma history",
  "Goitre",
  "Hyperthyroid",
  "Hypoglycemia",
  "Hypopituitarism",
  "Hypothyroid",
  "Insulin pump",
  "Insulin required",
  "NET tumour",
  "Pancreatic cancer",
  "Pancreatic surgery",
  "Pancreatitis",
  "Pheochromocytoma",
  "Pituitary tumour",
  "Hyperparathyroidism",
  "Hypoparathyroidism",
  "Prolactinoma",
  "Thyroid cancer",
])

// Skin conditions - full dataset
export const SKIN_CONDITIONS = sortAlphabetically([
  "Epidermolysis Bullosa",
  "Ichthyosis",
  "Lupus",
  "Pemphigus",
  "Psoriasis",
  "Scleroderma",
  "Severe dermatitis",
  "Stevens-Johnson syndrome",
  "TENS (Toxic Epidermal Necrolysis)",
  "Xeroderma pigmentosum",
])

// Bone & Joint conditions - full dataset
export const BONE_JOINT_CONDITIONS = sortAlphabetically([
  "Ankylosing spondylitis",
  "Cauda Equina syndrome",
  "Cervical disc disease",
  "Joint replacements",
  "Kyphosis",
  "Lumbar disc disease",
  "Osteoarthritis",
  "Osteogenesis imperfecta",
  "Osteoporosis",
  "Psoriatic arthritis",
  "Rheumatoid arthritis",
  "Scoliosis",
  "Spinal cord stimulator",
  "Spinal fusion",
  "Spinal stenosis",
  "Spondylolisthesis",
])

// Immune System conditions - full dataset
export const IMMUNE_CONDITIONS = sortAlphabetically([
  "Angioedema",
  "Asplenia (no spleen)",
  "Chemotherapy (current/recent)",
  "DiGeorge syndrome",
  "Goodpasture syndrome",
  "GVHD (Graft vs Host Disease)",
  "HIV/AIDS",
  "Hyper IgM syndrome",
  "Immunodeficiency",
  "ITP (Immune Thrombocytopenic Purpura)",
  "Kawasaki disease",
  "Leukemia",
  "Lupus SLE",
  "Lymphoma",
  "Myeloma",
  "Neutropenia",
  "Polymyositis",
  "Sjogren's syndrome",
  "Temporal arteritis",
  "Transplant immunosuppression",
  "Vasculitis",
])

// Blood conditions - full dataset
export const BLOOD_CONDITIONS = sortAlphabetically([
  "Anaemia / Anemia",
  "Aplastic anemia",
  "Asplenia",
  "Castleman disease",
  "Coagulopathy",
  "Deep Vein Thrombosis (DVT)",
  "DIC (Disseminated Intravascular Coagulation)",
  "Fibrinogen deficiency",
  "Hemophilia A",
  "Hemophilia B",
  "Hodgkins lymphoma",
  "Leukemia",
  "Lymphoma",
  "MDS (Myelodysplastic syndrome)",
  "Myeloma",
  "Neutropenia",
  "Polycythemia",
  "Polycythemia Vera",
  "Porphyria",
  "Pulmonary Embolism (PE)",
  "Sickle cell disease",
  "Spherocytosis",
  "Thalassemia major/minor",
  "Thrombocytopenia",
  "Thrombocytosis",
  "Thrombophilia",
  "Vitamin K deficiency",
  "Von Willebrand Disease (VWD)",
])

// Syndromes - full dataset
export const SYNDROME_CONDITIONS = sortAlphabetically([
  "Achondroplasia",
  "Alport syndrome",
  "Antiphospholipid Syndrome",
  "Angelman syndrome",
  "Brugada syndrome",
  "Carcinoid syndrome",
  "Carpal tunnel syndrome",
  "Chronic fatigue syndrome",
  "Compartment syndrome",
  "Cushing syndrome",
  "Down syndrome",
  "Ehlers-Danlos syndrome",
  "Fragile X syndrome",
  "Guillain-Barré syndrome",
  "Irritable bowel syndrome",
  "Klinefelter syndrome",
  "Long QT syndrome",
  "Marfan syndrome",
  "Metabolic syndrome",
  "Munchausen syndrome",
  "Nephrotic syndrome",
  "Noonan syndrome",
  "Polycystic ovary syndrome",
  "Prader-Willi syndrome",
  "Restless leg syndrome",
  "Reye syndrome",
  "Sjogren syndrome",
  "Tourette syndrome",
  "Turner syndrome",
  "Williams syndrome",
  "Wolff-Parkinson-White syndrome",
])

// Allergy causes - full dataset
export const ALLERGY_CAUSES = sortAlphabetically([
  "Anesthetic drugs",
  "Anti-inflammatory drugs (NSAIDS)",
  "Antibody drugs",
  "Aspirin",
  "Cephalosporins",
  "Contrast materials (X-ray)",
  "Insects (bees/wasps/spiders)",
  "Latex",
  "Muscle relaxants",
  "Peanuts/nuts",
  "Penicillins",
  "Seafood/Shellfish/Crustaceans",
  "Snakes/venomous animals",
  "Sulpha/Sulfa drugs",
  "Vaccines",
])

// Allergy reactions - full dataset
export const ALLERGY_REACTIONS = sortAlphabetically([
  "Anaphylaxis",
  "Low blood pressure",
  "Rash - early (within hours)",
  "Rash - late (after 24 hours)",
  "Severe diarrhea",
  "Severe nausea/vomiting",
  "Throat/tongue/neck swelling",
  "Wheezing / asthma",
])

// Anaphylaxis causes - full dataset
export const ANAPHYLAXIS_CAUSES = sortAlphabetically([
  "Anesthetic drugs",
  "Anti-inflammatory drugs (NSAIDS)",
  "Antibody drugs",
  "Aspirin",
  "Cephalosporins",
  "Chlorhexidine",
  "Insects (bees/wasps/spiders)",
  "Latex",
  "Peanuts/nuts",
  "Penicillins",
  "Rocuronium",
  "Seafood/Shellfish/Crustaceans",
  "Snakes/venomous animals",
  "Sugammadex",
  "Sulpha/Sulfa drugs",
  "Suxamethonium/succinylcholine",
  "Vaccines",
  "Vecuronium",
  "X-ray contrast materials",
])

// Infection conditions - full dataset
export const INFECTION_CONDITIONS = sortAlphabetically([
  "Abscess (deep)",
  "Abscess (superficial)",
  "Appendicitis",
  "Cholecystitis (Gall bladder)",
  "Covid",
  "Dengue fever",
  "Encephalitis",
  "Endocarditis",
  "Gastritis",
  "Gastroenteritis",
  "Hepatitis",
  "Long covid",
  "Malaria",
  "Neck/Tooth abscess",
  "Necrotizing fasciitis",
  "Nephritis",
  "Pancreatitis",
  "Pneumonia",
  "Quinsy/tonsillitis",
  "Sepsis",
  "Severe colitis",
  "Severe dermatitis",
  "Severe influenza",
  "Other viruses",
])

// Anaesthesia problems - full dataset
export const ANAESTHESIA_CONDITIONS = sortAlphabetically([
  "Anesthetic allergy",
  "Aspiration (food etc) into lungs",
  "Awareness - remembered things during surgery",
  "Brain damage",
  "Breathing problems after or during anesthesia",
  "Bronchospasm",
  "Cardiac arrest during surgery",
  "Difficult airway",
  "Difficult bag/mask ventilation",
  "Difficult intubation",
  "Extreme sensitivity to anesthetics",
  "Laryngospasm",
  "Low blood pressure",
  "Malignant hyperthermia",
  "Morbid obesity",
  "Nausea/vomiting (severe)",
  "Neurological problem",
  "Scoline/suxamethonium apnea",
  "Severe rash",
  "Sleep apnea",
  "Tongue/throat surgery/cancer",
  "Tooth damage",
])

// Disability types - full dataset
export const DISABILITY_CONDITIONS = sortAlphabetically([
  "Hearing impaired",
  "Mentally impaired",
  "Mobility impaired",
  "Sight impaired",
  "Speech impaired",
])

// Document types - full dataset
export const DOCUMENT_TYPES = sortAlphabetically([
  "Abdominal CT",
  "Abdominal MRI",
  "Abdominal Ultrasound",
  "Abdominal X-ray",
  "Angiogram",
  "Blood test results",
  "Brain CT",
  "Brain MRI",
  "Chest CT",
  "Chest X-ray",
  "Colonoscopy report",
  "DEXA scan",
  "Echocardiogram",
  "ECG / EKG",
  "Endoscopy report",
  "Exercise stress test",
  "Genetic test results",
  "Holter monitor",
  "Lung function tests",
  "Mammogram",
  "Nuclear medicine scan",
  "Pathology report",
  "PET scan",
  "Sleep study",
  "Specialist letter",
  "Spine CT",
  "Spine MRI",
  "Surgical report",
])

// Medication datasets
export const BLOOD_THINNER_MEDS = sortAlphabetically([
  "Apixaban",
  "Aspirin",
  "Clopidogrel",
  "Dabigatran",
  "Prasugrel",
  "Rivaroxaban",
  "Ticagrelor",
  "Warfarin",
])

export const BLOOD_PRESSURE_MEDS = sortAlphabetically([
  "ACE inhibitors (e.g. Ramipril, Lisinopril)",
  "Alpha blockers",
  "ARBs (e.g. Losartan, Valsartan)",
  "Beta blockers",
  "Calcium channel blockers",
  "Diuretics",
])

export const HEART_MEDS = sortAlphabetically([
  "Amiodarone",
  "Beta blocker",
  "Bisoprolol",
  "Digoxin",
  "Ezetimibe",
  "Flecainide",
  "Frusemide/Furosemide",
  "GLP1 agonists",
  "Nitrates",
  "SGLT2 inhibitors",
  "Sotalol",
  "Spironolactone",
  "Statins",
])

export const DIABETES_MEDS = sortAlphabetically(["Glicazide", "GLP1 drugs", "Insulin", "Metformin", "SGLT2 inhibitors"])

export const STEROID_MEDS = sortAlphabetically([
  "Anabolic steroids",
  "Betamethasone",
  "Dexamethasone",
  "Hydrocortisone",
  "Prednisolone",
  "Prednisone",
])

export const MENTAL_HEALTH_MEDS = sortAlphabetically([
  "Antipsychotics",
  "Benzodiazepines",
  "Buspirone",
  "Lithium",
  "MAOIs",
  "Mood stabilizers",
  "SNRIs",
  "SSRIs",
  "Stimulants",
  "Tricyclic antidepressants",
])

export const ANTIEPILEPTIC_MEDS = sortAlphabetically([
  "Carbamazepine",
  "Keppra (Levetiracetam)",
  "Lamotrigine",
  "Topiramate",
  "Valproate/Epilim",
])

export const PARKINSONS_MEDS = sortAlphabetically([
  "Amantadine",
  "Anticholinergic",
  "Benserazide/Madopar",
  "Carbidopa",
  "COMT inhibitor",
  "Istradefylline",
  "L-dopa",
  "MAOI-B",
  "Pramipexole",
  "Rotigotine",
  "Sinemet",
])

export const MISC_MEDS = sortAlphabetically([
  "Benzodiazepines",
  "Gut drugs (PPIs, domperidone etc)",
  "NSAIDs",
  "Paracetamol",
  "Respiratory inhalers",
  "Thyroxine",
])

export const NARCOTIC_MEDS = sortAlphabetically([
  "Buprenorphine",
  "Cannabis",
  "Cocaine",
  "Codeine",
  "Fentanyl",
  "Heroin",
  "Hydrocodone",
  "Hydromorphone",
  "Ketamine",
  "Methadone",
  "Methamphetamine",
  "Morphine",
  "Nalbuphine",
  "Oxycodone",
  "Oxymorphone",
  "Suboxone",
  "Tapentadol",
  "Tramadol",
])

// SECTION 1: DEMOGRAPHICS (Minimal Required)
// NOTE: skin_tone and eye_colour removed per requirements
export const DEMOGRAPHIC_QUESTIONS: Question[] = [
  {
    id: "age_group",
    section: "Demographics",
    question: "What is your age group / birth decade?",
    type: "dropdown",
    options: sortAlphabetically([
      "1920-1929",
      "1930-1939",
      "1940-1949",
      "1950-1959",
      "1960-1969",
      "1970-1979",
      "1980-1989",
      "1990-1999",
      "2000-2009",
      "2010-2019",
      "After 2020",
    ]),
    required: false,
    genderVisibility: "all",
    tooltip: "Select the decade you were born in",
  },
  {
    id: "gender",
    section: "Demographics",
    question: "What is your gender?",
    type: "dropdown",
    options: ["Female", "Male", "Other"], // Alphabetized
    required: false,
    genderVisibility: "all",
  },
  {
    id: "pregnant",
    section: "Demographics",
    question: "Are you currently pregnant?",
    type: "dropdown",
    options: ["No", "Prefer not to say", "Yes"], // Alphabetized
    required: false,
    genderVisibility: "female-other",
    conditionalChildren: [
      {
        id: "due_date",
        label: "Estimated due date",
        type: "date",
        required: false,
      },
      {
        id: "prenatal_meds",
        label: "Are you on prenatal vitamins / medications?",
        type: "text",
        required: false,
        placeholder: "Enter prenatal vitamins or medications",
      },
    ],
  },
  {
    id: "last_period",
    section: "Demographics",
    question: "When was your last period?",
    type: "date",
    required: false,
    genderVisibility: "female-other",
    tooltip: "Approximate date is acceptable",
  },
  {
    id: "height",
    section: "Demographics",
    question: "What is your height?",
    type: "height",
    units: ["CM", "Inches"],
    required: false,
    genderVisibility: "all",
  },
  {
    id: "weight",
    section: "Demographics",
    question: "What is your weight?",
    type: "weight",
    units: ["KG", "LBS"],
    required: false,
    genderVisibility: "all",
  },
  {
    id: "blood_type",
    section: "Demographics",
    question: "What is your blood type?",
    type: "dropdown",
    options: sortAlphabetically([
      "A+",
      "A-",
      "AB+",
      "AB-",
      "B+",
      "B-",
      "Do not know",
      "Jehovahs witness",
      "No blood products",
      "O+",
      "O-",
    ]),
    required: false,
    genderVisibility: "all",
    tooltip: 'Select "Do not know" if unsure',
  },
  {
    id: "heart_rate",
    section: "Demographics",
    question: "What is your average heart rate?",
    type: "numeric",
    required: false,
    genderVisibility: "all",
    placeholder: "e.g., 72",
    tooltip: "Beats per minute at rest (optional)",
  },
  {
    id: "systolic_bp",
    section: "Demographics",
    question: "What is your average systolic blood pressure?",
    type: "numeric",
    required: false,
    genderVisibility: "all",
    placeholder: "e.g., 120",
    tooltip: "The top number in your blood pressure reading (optional)",
  },
  {
    id: "oxygen_saturation",
    section: "Demographics",
    question: "What is your average oxygen saturation?",
    type: "numeric",
    required: false,
    isOptional: true,
    genderVisibility: "all",
    placeholder: "e.g., 98",
    tooltip: "SpO2 percentage (optional)",
  },
]

// These questions go directly to multi-select (no yes/no gatekeeper when category is selected)
export const CONDITION_QUESTIONS: Question[] = [
  // Heart conditions - direct multi-select
  {
    id: "heart_conditions",
    section: "Conditions",
    question: "Select your heart conditions (select all that apply)",
    type: "multi-select",
    options: HEART_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "heart",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Lung conditions - direct multi-select
  {
    id: "lung_conditions",
    section: "Conditions",
    question: "Select your lung conditions (select all that apply)",
    type: "multi-select",
    options: LUNG_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "lungs",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Liver conditions - direct multi-select
  {
    id: "liver_conditions",
    section: "Conditions",
    question: "Select your liver conditions (select all that apply)",
    type: "multi-select",
    options: LIVER_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "liver",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Kidney/Urology conditions - direct multi-select (gender-filtered in renderer)
  {
    id: "kidney_conditions",
    section: "Conditions",
    question: "Select your urological / kidney conditions (select all that apply)",
    type: "multi-select",
    options: KIDNEY_CONDITIONS, // Will be combined with gender-specific options in renderer
    required: false,
    genderVisibility: "all",
    healthCategory: "kidney",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Gut conditions - direct multi-select
  {
    id: "gut_conditions",
    section: "Conditions",
    question: "Select your gut problems (select all that apply)",
    type: "multi-select",
    options: GUT_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "gut",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Neurological conditions - direct multi-select
  {
    id: "neurological_conditions",
    section: "Conditions",
    question: "Select your neurological conditions (select all that apply)",
    type: "multi-select",
    options: NEUROLOGICAL_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "neurological",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Mental Health conditions - direct multi-select
  {
    id: "mental_health_conditions",
    section: "Conditions",
    question: "Select any mental health conditions (optional) (select all that apply)",
    type: "multi-select",
    options: MENTAL_HEALTH_CONDITIONS,
    required: false,
    isOptional: true,
    genderVisibility: "all",
    healthCategory: "mental",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Endocrine conditions - direct multi-select
  {
    id: "endocrine_conditions",
    section: "Conditions",
    question: "Select your endocrine conditions (select all that apply)",
    type: "multi-select",
    options: ENDOCRINE_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "endocrine",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Skin conditions - direct multi-select
  {
    id: "skin_conditions",
    section: "Conditions",
    question: "Select your skin conditions (select all that apply)",
    type: "multi-select",
    options: SKIN_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "skin",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Bone & Joint conditions - direct multi-select
  {
    id: "bone_joint_conditions",
    section: "Conditions",
    question: "Select your bone & joint conditions (select all that apply)",
    type: "multi-select",
    options: BONE_JOINT_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "bone",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Immune System conditions - direct multi-select
  {
    id: "immune_conditions",
    section: "Conditions",
    question: "Select your immune system conditions (select all that apply)",
    type: "multi-select",
    options: IMMUNE_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "immune",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Blood conditions - direct multi-select
  {
    id: "blood_conditions",
    section: "Conditions",
    question: "Select your blood conditions (select all that apply)",
    type: "multi-select",
    options: BLOOD_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "blood",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Syndromes - direct multi-select
  {
    id: "syndrome_conditions",
    section: "Conditions",
    question: "Select any syndrome diagnoses (select all that apply)",
    type: "multi-select",
    options: SYNDROME_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "syndromes",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Allergies - dual dropdown (cause + reaction)
  {
    id: "allergy_causes",
    section: "Conditions",
    question: "Any allergies? Select causes (select all that apply)",
    type: "multi-select",
    options: ALLERGY_CAUSES,
    required: false,
    genderVisibility: "all",
    healthCategory: "allergies",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  {
    id: "allergy_reactions",
    section: "Conditions",
    question: "What type of allergic reactions have you had? (select all that apply)",
    type: "multi-select",
    options: ALLERGY_REACTIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "allergies",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Anaphylaxis - direct multi-select
  {
    id: "anaphylaxis_causes",
    section: "Conditions",
    question: "What caused anaphylaxis? (select all that apply)",
    type: "multi-select",
    options: ANAPHYLAXIS_CAUSES,
    required: false,
    genderVisibility: "all",
    healthCategory: "anaphylaxis",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Infection conditions - direct multi-select
  {
    id: "infection_conditions",
    section: "Conditions",
    question: "Select infection-related conditions (select all that apply)",
    type: "multi-select",
    options: INFECTION_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "infections",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Anaesthesia problems - direct multi-select
  {
    id: "anaesthesia_conditions",
    section: "Conditions",
    question: "Select any problems with anaesthesia / anesthesia (select all that apply)",
    type: "multi-select",
    options: ANAESTHESIA_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "anaesthesia",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
  // Disabilities - direct multi-select
  {
    id: "disability_conditions",
    section: "Conditions",
    question: "Select disability/impairment types (select all that apply)",
    type: "multi-select",
    options: DISABILITY_CONDITIONS,
    required: false,
    genderVisibility: "all",
    healthCategory: "disabilities",
    skipGatekeeper: true,
    tooltip: "Select one or more. Press Next when done.",
  },
]

// SECTION 3: MEDICATION QUESTIONS
export const MEDICATION_QUESTIONS: Question[] = [
  // Gatekeeper question
  {
    id: "regular_medications",
    section: "Medications",
    question: "Do you take any regular medications?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    tooltip: "If No, medication questions will be skipped",
  },
  // Blood thinners
  {
    id: "blood_thinners",
    section: "Medications",
    question: "Do you take blood thinners / anticoagulants?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "blood_thinner_meds",
        label: "Blood thinner medications",
        type: "multi-select",
        options: BLOOD_THINNER_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
  // Blood pressure meds
  {
    id: "blood_pressure_meds",
    section: "Medications",
    question: "Do you take blood pressure medications?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "bp_med_types",
        label: "Blood pressure medication types",
        type: "multi-select",
        options: BLOOD_PRESSURE_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
  // Heart medications
  {
    id: "heart_medications",
    section: "Medications",
    question: "Do you take heart medications?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "heart_med_types",
        label: "Heart medication types",
        type: "multi-select",
        options: HEART_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
  // Diabetes medications
  {
    id: "diabetes_meds",
    section: "Medications",
    question: "Do you take diabetes medications?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "diabetes_med_types",
        label: "Diabetes medication types",
        type: "multi-select",
        options: DIABETES_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
  // Steroid medications
  {
    id: "steroid_meds",
    section: "Medications",
    question: "Do you take steroid medications?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "steroid_med_types",
        label: "Steroid medication types",
        type: "multi-select",
        options: STEROID_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
  // Mental health medications
  {
    id: "mental_health_meds",
    section: "Medications",
    question: "Do you take mental health medications?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "mental_health_med_types",
        label: "Mental health medication types",
        type: "multi-select",
        options: MENTAL_HEALTH_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
  // Anti-epileptic medications
  {
    id: "antiepileptic_meds",
    section: "Medications",
    question: "Do you take anti-epileptic medications?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "antiepileptic_med_types",
        label: "Anti-epileptic medications",
        type: "multi-select",
        options: ANTIEPILEPTIC_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
  // Parkinson's medications
  {
    id: "parkinsons_meds",
    section: "Medications",
    question: "Do you take Parkinson's medications?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "parkinsons_med_types",
        label: "Parkinson's medications",
        type: "multi-select",
        options: PARKINSONS_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
  // Miscellaneous medications
  {
    id: "misc_meds",
    section: "Medications",
    question: "Do you take any miscellaneous medications?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "misc_med_types",
        label: "Miscellaneous medications",
        type: "multi-select",
        options: MISC_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
  // Narcotics/controlled substances
  {
    id: "narcotic_meds",
    section: "Medications",
    question: "Do you take any narcotics / controlled substances?",
    type: "yes-no",
    required: false,
    genderVisibility: "all",
    healthCategory: "medications",
    conditionalChildren: [
      {
        id: "narcotic_med_types",
        label: "Narcotic medications",
        type: "multi-select",
        options: NARCOTIC_MEDS,
        required: false,
        placeholder: "Select all that apply",
      },
    ],
  },
]

// SECTION 4: DOCUMENT UPLOAD
export const DOCUMENT_QUESTIONS: Question[] = [
  {
    id: "document_upload",
    section: "Documents",
    question: "Upload your medical documents",
    type: "file-upload",
    required: false,
    genderVisibility: "all",
    healthCategory: "documents",
    tooltip: "Upload ECG, scans, blood reports, etc.",
  },
]

// All questions combined
export const ALL_QUESTIONS = [
  ...DEMOGRAPHIC_QUESTIONS,
  ...CONDITION_QUESTIONS,
  ...MEDICATION_QUESTIONS,
  ...DOCUMENT_QUESTIONS,
]

// Gender-specific urological options filtering
export const UROLOGICAL_MALE_OPTIONS = KIDNEY_MALE_CONDITIONS
export const UROLOGICAL_FEMALE_OPTIONS = KIDNEY_FEMALE_CONDITIONS

// Cross-validation rules
export interface ValidationRule {
  id: string
  description: string
  check: (answers: Record<string, unknown>) => { valid: boolean; message?: string }
}

export const VALIDATION_RULES: ValidationRule[] = [
  {
    id: "diabetes_insulin_consistency",
    description: "If diabetes medication includes Insulin, endocrine conditions should include diabetes",
    check: (answers) => {
      const diabetesMeds = answers.diabetes_med_types as string[] | undefined
      const endocrineConditions = answers.endocrine_conditions as string[] | undefined

      if (diabetesMeds?.includes("Insulin")) {
        const hasDiabetes = endocrineConditions?.some((c) => c.includes("Diabetes") || c.includes("Insulin"))
        if (!hasDiabetes) {
          return {
            valid: false,
            message: "Insulin selected in medications but no diabetes condition indicated. Please verify.",
          }
        }
      }
      return { valid: true }
    },
  },
]
