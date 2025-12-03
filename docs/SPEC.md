# Medical Intake Prototype - Human-Readable Specification

## Overview
This document provides a complete specification for the medical intake onboarding prototype. All question text, dropdown options, and conditional logic are taken exactly from the provided dataset (Prompt B).

---

## Section 1: Demographics & Basics (Questions 1-20)

### Question 1: Age Group / Birth Decade
- **Type:** Dropdown (single-select)
- **Required:** Yes
- **Options:**
  - 1920-1929
  - 1930-1939
  - 1940-1949
  - 1950-1959
  - 1960-1969
  - 1970-1979
  - 1980-1989
  - 1990-1999
  - 2000-2009
  - 2010-2019
  - After 2020

---

### Question 2: Gender
- **Type:** Dropdown (single-select)
- **Required:** Yes
- **Options:**
  - Male
  - Female
  - Other

**If "Female" or "Other" selected:**
- **Child: When was your last period?**
  - Type: Date picker
  - Required: No

**Gender-Based Hiding Rules:**
- If Male: Hide Q22 options (Menopause, Ovarian cancer, Large ovarian cysts, Endometriosis, Large fibroids, Mennorhagia, Pregnancy date last period)
- If Female: Hide Q22 options (Prostate enlarged, Prostate cancer, Prostate removed)

---

### Question 3: Skin Tone
- **Type:** Dropdown (single-select)
- **Required:** Yes
- **Options:**
  - White
  - Black
  - Brown
  - Other

---

### Question 4: Eye Colour / Color
- **Type:** Dropdown (single-select)
- **Required:** Yes
- **Options:**
  - Brown
  - Blue
  - Green
  - Other

---

### Question 5: Height
- **Type:** Height input (slider + numeric)
- **Required:** Yes
- **Units:** Inches / CM (toggle)
- **Range CM:** 50-250
- **Range Inches:** 20-100

---

### Question 6: Weight
- **Type:** Weight input (slider + numeric)
- **Required:** Yes
- **Units:** LBS / KG (toggle)
- **Range KG:** 20-300
- **Range LBS:** 45-660

---

### Question 7: Blood Type
- **Type:** Dropdown (single-select)
- **Required:** Yes
- **Options:**
  - Do not know
  - Jehovahs witness
  - A+
  - A-
  - B+
  - B-
  - AB+
  - AB-
  - O+
  - O-
  - No blood products

---

### Question 8: Disability / Impairment
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Type of disability**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Sight impaired
    - Hearing impaired
    - Speech impaired
    - Mobility impaired
    - Mentally impaired
    - Other

---

### Question 9: Average Systolic Blood Pressure
- **Type:** Numeric input (slider + stepper)
- **Required:** Yes
- **Range:** 0-300
- **Tooltip:** The top number in your blood pressure reading

---

### Question 10: Average Heart Rate
- **Type:** Numeric input (slider + stepper)
- **Required:** Yes
- **Range:** 0-250
- **Tooltip:** Beats per minute at rest

---

### Question 11: Average Oxygen Saturation
- **Type:** Numeric input
- **Required:** No (Optional)
- **Range:** 0-100
- **Tooltip:** SpO2 percentage

---

### Question 12: ACD – Advance Care Directive / Living Will
- **Type:** Yes/No toggle
- **Required:** Yes
- **Status:** OUT OF SCOPE for upload functionality

**If Yes:**
- **Child: Upload Document**
  - Type: File upload
  - Status: OUT OF SCOPE - Placeholder only

---

### Question 13: Document Upload & Categorization
- **Type:** Dropdown (single-select)
- **Required:** No
- **Status:** OUT OF SCOPE - Placeholder only
- **Options:** (Full list of 60+ document categories as provided in dataset)

---

### Question 14: Anaphylaxis History
- **Type:** Yes/No toggle
- **Required:** Yes
- **Tooltip:** A severe, potentially life-threatening allergic reaction

**If Yes:**
- **Child: What caused anaphylaxis?**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Penicillins
    - Cephalosporins
    - Sulpha / Sulfa drugs
    - Suxamethonium / succinylcholine
    - Rocuronium
    - Vecuronium
    - Sugammadex
    - Chlorhexidine
    - Latex
    - Anti-inflammatory drugs (NSAIDS)
    - Aspirin
    - Vaccines
    - X ray contrast materials
    - Anesthetic drugs
    - Antibody drugs
    - Peanuts / nuts
    - Seafood / Shellfish / Crustsceans
    - Insects (bees / wasps / spiders)
    - Snakes / venomous animals

---

### Question 15: Allergies
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child 1: Allergy Type (Cause)**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Penicillins
    - Cephalosporins
    - Sulpha drugs
    - Muscle relaxants
    - Latex
    - NSAIDs
    - Aspirin
    - Vaccines
    - Contrast
    - Anesthetic drugs
    - Antibodies
    - Peanuts
    - Seafood
    - Insects
    - Snakes

- **Child 2: Reaction**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Anaphylaxis
    - Throat/tongue/neck swelling
    - Wheezing / asthma
    - Low blood pressure
    - Rash early
    - Rash late
    - Severe nausea/vomiting
    - Severe diarrhea

---

### Question 16: Infection History
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Conditions**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Sepsis
    - Endocarditis
    - Encephalitis
    - Pneumonia
    - Nephritis
    - Hepatitis
    - Pancreatitis
    - Cholecystitis
    - Appendicitis
    - Gastritis
    - Severe colitis
    - Gastroenteritis
    - Abscess superficial
    - Abscess deep
    - Quinsy / tonsillitis
    - Neck / Tooth abscess
    - Severe dermatitis
    - Necrotizing fasciitis
    - Covid
    - Long covid
    - Severe influenza
    - Dengue fever
    - Other viruses
    - Malaria

---

### Question 17: Problems with Anaesthesia / Anesthesia
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Problem Type**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Malignant hyperthermia
    - Scoline/sux apnea
    - Difficult intubation
    - Difficult airway
    - Difficult bag/mask
    - Sleep apnea
    - Morbid obesity
    - Aspiration
    - Tongue / throat surgery / cancer
    - Cardiac arrest during surgery
    - Anesthetic allergy
    - Extreme sensitivity
    - Breathing problems
    - Laryngospasm
    - Bronchospasm
    - Severe rash
    - Low blood pressure
    - Awareness during surgery
    - Nausea/vomiting
    - Neurological problem
    - Brain damage
    - Tooth damage

---

### Question 18: Heart Disease
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Heart disease name**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Cardiac arrest
    - Brugada syndrome
    - Long QT Syndrome
    - Heart attack
    - Syncope
    - Coronary heart disease
    - Heart stents
    - Bypass surgery
    - Heart transplant
    - AF / AFib
    - SVT
    - WPW
    - Abnormal rhythm
    - Pacemaker
    - Internal defibrillator
    - Loop recorder
    - Valve disease
    - Mitral stenosis
    - Cardiomyopathy
    - Heart failure
    - Pulmonary hypertension
    - Aortic aneurysm
    - Pulmonary embolus
    - DVT
    - Heart block (1st, 2nd, Mobitz 2, 3rd degree)
    - Aortic stenosis
    - Aortic regurgitation
    - Mitral regurgitation
    - Mitral valve prolapse

---

### Question 19: Major Conditions / Past Medical History / Syndromes
- **Type:** Yes/No toggle
- **Required:** Yes
- **Note:** This is a general gatekeeper question

---

### Question 20: Lung Disease
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Lung disease name**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Heavy smoker
    - Breathless at rest
    - Home oxygen
    - O2 < 90%
    - Asthma severe
    - Emphysema
    - COPD
    - Chronic bronchitis
    - Recurrent pneumonia
    - Bronchiectasis
    - Lung bulla
    - Lung cancer
    - Lung removal
    - Lung transplant
    - Pneumothorax
    - Tuberculosis
    - Pulmonary fibrosis
    - Cystic fibrosis
    - ILD
    - Silicosis
    - Asbestosis
    - Mesothelioma
    - Pleural effusion

---

## Section 2: Conditions (Questions 21-31)

### Question 21: Liver Disease
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Liver disease type**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Hepatitis
    - Wilson's disease
    - Liver cancer
    - Fatty liver
    - Cystic fibrosis
    - Liver fibrosis
    - Cirrhosis
    - Liver failure
    - Hepatic encephalopathy
    - Liver transplant
    - Hemochromatosis
    - Cholangitis
    - Portal Hypertension
    - Oesophageal Varices

---

### Question 22: Urological (kidney, bladder, reproductive)
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Urological conditions**
  - Type: Multi-select checkboxes
  - Required: Yes
  - **Gender-filtered options:**
  
  **All genders:**
  - Glomerulonephritis
  - Nephritis
  - Pyelonephritis
  - Hydroureter
  - Polycystic kidney disease
  - Kidney stones
  - Kidney cancer
  - Kidney failure
  - Uremic encephalopathy
  - Dialysis
  - Kidney transplant
  - Urethral stricture
  - Bladder cancer
  - Bladder incontinence
  
  **Male only:**
  - Prostate enlarged
  - Prostate cancer
  - Prostate removed
  
  **Female/Other only:**
  - Menopause
  - Ovarian cancer
  - Large ovarian cysts
  - Endometriosis
  - Large fibroids
  - Mennorhagia
  - Pregnancy date last period

---

### Question 23: Gut Problem
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Gut conditions**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Difficulty swallowing
    - GERD / GORD
    - GI bleeding
    - Weight loss surgery
    - Gastroparesis
    - Gastric cancer
    - Ulcer
    - Crohns
    - Ulcerative colitis
    - Constipation severe
    - Diarrhea severe
    - Bowel cancer
    - Bowel removal
    - Stoma

---

### Question 24: Neurological Disease
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Neurological conditions**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Epilepsy (grand mal or other)
    - Encephalitis
    - Meningitis
    - Brain aneurysm
    - AVM
    - Parkinson's
    - Multiple sclerosis
    - MND
    - ALS
    - Huntington's
    - Spinal diseases
    - Disc prolapse
    - Spinal surgery
    - Paraplegia
    - Quadraplegia
    - Dementia
    - Alzheimers
    - Lewy body
    - Peripheral neuropathy
    - Brain tumour
    - Brain bleed
    - Brain surgery
    - Hydrocephalus ± shunt
    - Myasthenia gravis
    - Neurofibromatosis
    - Arnold-Chiari
    - Trigeminal Neuralgia
    - Severe Migraine
    - Autism
    - ADHD

---

### Question 25: Mental Illness (Optional)
- **Type:** Yes/No toggle
- **Required:** No (Optional)

**If Yes:**
- **Child: Mental health conditions**
  - Type: Multi-select checkboxes
  - Required: No
  - Options:
    - Anxiety
    - Panic attacks
    - PTSD
    - Depression
    - MDD
    - BPD
    - OCD
    - ADHD
    - ASD
    - Dyslexia
    - Dyspraxia
    - Tourette
    - Neurodivergent
    - Eating disorder
    - Anorexia
    - Bulimia
    - Schizophrenia
    - Schizoaffective
    - Psychosis
    - Suicidality
    - SUD
    - Alcohol excessive
    - Severe insomnia
    - Phobias (needle, hospital, social, claustrophobia, flying)

---

### Question 26: Endocrine Disease
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Endocrine conditions**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Hyperthyroid
    - Hypothyroid
    - Thyroid cancer
    - Goitre
    - Diabetes 1
    - Diabetes 2
    - Insulin required
    - Insulin pump
    - Hypoglycemia
    - Diabetic coma
    - Pancreatitis
    - Pancreatic surgery
    - Pancreatic cancer
    - NET tumour
    - Addison's
    - Conn's
    - Pheochromocytoma
    - Carcinoid
    - Pituitary tumour
    - Cushing's
    - Acromegaly
    - Hypopituitarism
    - Prolactinoma
    - Diabetes insipidus
    - Hyperparathyroidism
    - Hypoparathyroidism

---

### Question 27: Skin Disease
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Skin conditions**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Severe dermatitis
    - Psoriasis
    - Epidermolysis Bullosa
    - Stevens-Johnson
    - TENS
    - Xeroderma
    - Pemphigus
    - Scleroderma
    - Lupus
    - Ichthyosis

---

### Question 28: Bone/Joint Disease
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Bone/joint conditions**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Osteoarthritis
    - Rheumatoid
    - Psoriatic
    - Osteoporosis
    - OI
    - Joint replacements
    - Spinal stenosis
    - Ankylosing spondylitis
    - Scoliosis
    - Kyphosis
    - Cervical disc
    - Lumbar disc
    - Spondylolisthesis
    - Spinal fusion (C/T/L)
    - Spinal cord stimulator
    - Cauda Equina

---

### Question 29: Immune System Disease
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Immune system conditions**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Asplenia
    - DiGeorge
    - Immunodeficiency
    - Chemotherapy
    - Transplant drugs
    - Neutropenia
    - HIV/AIDS
    - Lupus SLE
    - Sjogren's
    - Hyper IgM
    - Angioedema
    - Vasculitis
    - Lymphoma
    - Leukemia
    - Myeloma
    - Polymyositis
    - Temporal arteritis
    - Goodpasture
    - GVHD
    - ITP
    - Kawasaki

---

### Question 30: Blood Disease
- **Type:** Yes/No toggle
- **Required:** Yes

**If Yes:**
- **Child: Blood conditions**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Hemophilia A
    - Hemophilia B
    - VWD
    - Fibrinogen deficiency
    - Anaemia
    - Thalassemia major/minor
    - Sickle cell
    - Polycythemia
    - Thrombophilia
    - Thrombocytopenia
    - Leukemia
    - Hodgkins
    - Lymphoma
    - Aplastic anemia
    - Neutropenia
    - Myeloma
    - Asplenia
    - Spherocytosis
    - Porphyria
    - Castleman
    - Coagulopathy
    - Vit K deficiency
    - MDS
    - DVT
    - PE
    - Thrombocytosis
    - DIC
    - Polycythemia Vera

---

### Question 31: Syndrome
- **Type:** Yes/No toggle
- **Required:** Yes
- **DATASET FLAG:** Full 55+ list not provided - only examples shown. Awaiting complete list from client.

**If Yes:**
- **Child: Syndrome name**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options (partial - flagged for client):
    - Brugada syndrome
    - Marfan syndrome
    - Down syndrome
    - Noonan syndrome
    - (Additional syndromes pending client confirmation)

---

## Section 3: Medications (Questions 32-40)

### Question 32: Regular Medications (GATEKEEPER)
- **Type:** Yes/No toggle
- **Required:** Yes
- **GATEKEEPER BEHAVIOR:** If "No" selected, Questions 33-40 are skipped entirely

---

### Question 33: Blood Thinners
- **Type:** Yes/No toggle
- **Required:** Yes (if Q32 = Yes)
- **Visibility:** Only shown if Q32 = Yes

**If Yes:**
- **Child: Blood thinner medications**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Warfarin
    - Aspirin
    - Clopidogrel
    - Prasugrel
    - Apixaban
    - Rivaroxaban
    - Dabigatran
    - Ticagrelor

---

### Question 34: Blood Pressure Meds
- **Type:** Yes/No toggle
- **Required:** Yes (if Q32 = Yes)
- **Visibility:** Only shown if Q32 = Yes

**If Yes:**
- **Child: Blood pressure medication types**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - ACE
    - ARB
    - Beta blockers
    - Alpha blockers
    - Diuretics
    - Calcium blockers

---

### Question 35: Heart Medications
- **Type:** Yes/No toggle
- **Required:** Yes (if Q32 = Yes)
- **Visibility:** Only shown if Q32 = Yes

**If Yes:**
- **Child: Heart medication types**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Beta blocker
    - Sotalol
    - Bisoprolol
    - Amiodarone
    - Flecainide
    - Digoxin
    - Nitrates
    - SGLT2
    - GLP1
    - Statin
    - Ezetemibe
    - Frusemide
    - Spironolactone

---

### Question 36: Diabetes Meds
- **Type:** Yes/No toggle
- **Required:** Yes (if Q32 = Yes)
- **Visibility:** Only shown if Q32 = Yes

**If Yes:**
- **Child: Diabetes medication types**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Insulin
    - Metformin
    - Glicazide
    - SGLT2
    - GLP1

---

### Question 37: Steroid Meds
- **Type:** Yes/No toggle
- **Required:** Yes (if Q32 = Yes)
- **Visibility:** Only shown if Q32 = Yes

**If Yes:**
- **Child: Steroid medication types**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options:
    - Prednisone
    - Prednisolone
    - Betamethasone
    - Dexamethasone
    - Hydrocortisone
    - Anabolic steroids

---

### Question 38: Mental Health Meds
- **Type:** Yes/No toggle
- **Required:** Yes (if Q32 = Yes)
- **Visibility:** Only shown if Q32 = Yes
- **DATASET FLAG:** Full medication list not provided - only categories shown. Awaiting complete list from client.

**If Yes:**
- **Child: Mental health medication types**
  - Type: Multi-select checkboxes
  - Required: Yes
  - Options (categories - flagged for client):
    - SSRIs
    - SNRIs
    - Benzodiazepines
    - Antipsychotics
    - Stimulants
    - Mood stabilizers
    - Tricyclic antidepressants
    - MAOIs
    - Buspirone
    - Lithium
    - Other psychiatric medication

---

### Question 39: Anti-epileptic / Parkinson's Meds
- **Type:** Yes/No toggle
- **Required:** Yes (if Q32 = Yes)
- **Visibility:** Only shown if Q32 = Yes
- **DATASET FLAG:** Epilepsy portion notes "dataset correction needed"

**If Yes:**
- **Child: Parkinson's medications**
  - Type: Multi-select checkboxes
  - Required: No
  - Options:
    - Benserazide
    - Sinemet
    - L-dopa
    - Carbidopa
    - Rotigotine
    - Pramipexole
    - MAOI-B
    - COMT inhibitor
    - Amantadine
    - Anticholinergic
    - Istradefylline

---

### Question 40: Miscellaneous or Narcotic Medications
- **Type:** Yes/No toggle
- **Required:** Yes (if Q32 = Yes)
- **Visibility:** Only shown if Q32 = Yes

**If Yes:**
- **Child 1: Miscellaneous medications**
  - Type: Multi-select checkboxes
  - Required: No
  - Options:
    - Thyroxine
    - Benzodiazepines
    - Paracetamol
    - NSAIDs
    - Inhalers
    - Gut drugs

- **Child 2: Narcotic medications**
  - Type: Multi-select checkboxes
  - Required: No
  - Options:
    - Morphine
    - Codeine
    - Fentanyl
    - Oxycodone
    - Hydrocodone
    - Hydromorphone
    - Methadone
    - Oxymorphone
    - Tramadol
    - Tapentadol
    - Buprenorphine
    - Suboxone
    - Nalbuphine
    - Cannabis
    - Ketamine
    - Methamphetamine
    - Cocaine
    - Tramadol/Tapentadol
    - Heroin

---

## Conditional Logic Rules Summary

### Gender-Based Hiding
| Gender | Hidden Fields |
|--------|---------------|
| Male | Last period (Q2 child), Menopause, Ovarian cancer, Large ovarian cysts, Endometriosis, Large fibroids, Mennorhagia, Pregnancy date last period (Q22 options) |
| Female | Prostate enlarged, Prostate cancer, Prostate removed (Q22 options) |
| Other | Same as Female |

### Medication Gatekeeper (Q32)
- If Q32 = No: Skip Q33-Q40 entirely
- If Q32 = Yes: Show Q33-Q40

### Cross-Validation Rules
| Rule ID | Description | Check |
|---------|-------------|-------|
| diabetes_insulin_consistency | If Insulin selected in Q36, diabetes should be indicated in Q26 | Flag conflict if mismatch |

---

## Analytics Events

| Event Name | Trigger | Payload |
|------------|---------|---------|
| q_answered | User answers any question | question_id, question_number, answer, time_on_question_ms, revealed_children_count |
| conditional_opened | User selects Yes on question with children | question_id, children_count |
| review_submit_attempt | User opens Review screen | answered_count, total_questions |
| final_submit | User completes submission | total_answers, timestamp, validation_errors[] |

---

## Dataset Flags (Require Client Confirmation)

1. **Q31 (Syndromes):** Dataset shows "Full 55+ list exactly as provided—Brugada, Marfan, Down, Noonan, etc." but only examples provided. Complete list needed.

2. **Q38 (Mental Health Meds):** Dataset shows "(Full list: SSRIs, SNRIs, benzos, antipsychotics, stimulants, etc.)" but actual medication names not provided. Using category headers as placeholders.

3. **Q39 (Anti-epileptic meds):** Dataset notes "dataset correction needed" for epilepsy portion. Only Parkinson's medications implemented as provided.

4. **Q12 & Q13 (Document Upload):** Marked as OUT OF SCOPE per Prompt A. Showing placeholder only.
