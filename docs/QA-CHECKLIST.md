# QA Checklist - Medical Intake Prototype

## Pre-Review Checklist

### Question Coverage
- [ ] All 40 root-level questions from Prompt B are present
- [ ] Question text matches dataset exactly (no modifications)
- [ ] Question numbers match dataset (1-40)
- [ ] Sections are correctly grouped (Demographics, Conditions, Medications)

### Yes/No Questions with Children
For each Yes/No question with conditional children:

| Q# | Question | Children Revealed on Yes | Options Match Dataset |
|----|----------|--------------------------|----------------------|
| 8 | Disability | Disability type dropdown | [ ] |
| 12 | ACD | Upload placeholder (OOS) | [ ] |
| 14 | Anaphylaxis | Cause multi-select | [ ] |
| 15 | Allergies | Type + Reaction multi-selects | [ ] |
| 16 | Infection | Conditions multi-select | [ ] |
| 17 | Anaesthesia | Problem type multi-select | [ ] |
| 18 | Heart disease | Disease name multi-select | [ ] |
| 20 | Lung disease | Disease name multi-select | [ ] |
| 21 | Liver disease | Disease type multi-select | [ ] |
| 22 | Urological | Conditions multi-select (gender-filtered) | [ ] |
| 23 | Gut problem | Conditions multi-select | [ ] |
| 24 | Neurological | Conditions multi-select | [ ] |
| 25 | Mental illness | Conditions multi-select | [ ] |
| 26 | Endocrine | Conditions multi-select | [ ] |
| 27 | Skin disease | Conditions multi-select | [ ] |
| 28 | Bone/joint | Conditions multi-select | [ ] |
| 29 | Immune system | Conditions multi-select | [ ] |
| 30 | Blood disease | Conditions multi-select | [ ] |
| 31 | Syndrome | Syndrome name multi-select | [ ] |
| 33 | Blood thinners | Medications multi-select | [ ] |
| 34 | BP meds | Medications multi-select | [ ] |
| 35 | Heart meds | Medications multi-select | [ ] |
| 36 | Diabetes meds | Medications multi-select | [ ] |
| 37 | Steroid meds | Medications multi-select | [ ] |
| 38 | Mental health meds | Medications multi-select | [ ] |
| 39 | Anti-epileptic/Parkinson's | Medications multi-select | [ ] |
| 40 | Misc/Narcotic | Two multi-selects | [ ] |

### Gender-Based Hiding Rules
- [ ] Male selected: Last period question hidden
- [ ] Male selected: Q22 hides female-specific options (Menopause, Ovarian cancer, etc.)
- [ ] Female selected: Q22 hides male-specific options (Prostate enlarged, etc.)
- [ ] Other selected: Behaves same as Female

### Medication Gatekeeper (Q32)
- [ ] Q32 = No: Questions 33-40 are skipped
- [ ] Q32 = Yes: Questions 33-40 are shown
- [ ] Skipped questions don't appear in Review screen

### Review Screen
- [ ] All answered questions displayed
- [ ] Grouped by section
- [ ] Each item has Edit button
- [ ] Edit button navigates to specific question
- [ ] Editing preserves all other answers
- [ ] Return to Review after edit
- [ ] Conflicts displayed with clear messages
- [ ] Consent checkbox required for submit
- [ ] Export CSV functional

### Input Controls
- [ ] Yes/No: Large segmented toggle (44px+ touch target)
- [ ] Dropdowns: Searchable for lists > 10 items
- [ ] Multi-select: Checkboxes with search for lists > 10
- [ ] Height: Slider + numeric input + unit toggle (CM/Inches)
- [ ] Weight: Slider + numeric input + unit toggle (KG/LBS)
- [ ] Numeric: Slider + stepper + manual input
- [ ] Date: Year/Month/Day dropdowns

### Accessibility
- [ ] All inputs have programmatic labels
- [ ] ARIA roles present (radiogroup, listbox, etc.)
- [ ] Focus order is logical
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets >= 44px

### Analytics Events
- [ ] q_answered fires on each answer
- [ ] conditional_opened fires when Yes reveals children
- [ ] review_submit_attempt fires on Review screen open
- [ ] final_submit fires on submission

### Out of Scope Items
- [ ] Q12 upload shows OOS placeholder
- [ ] Q13 upload shows OOS placeholder
- [ ] No functional file upload in prototype

### Data Integrity
- [ ] No invented questions
- [ ] No invented options
- [ ] No reordered options (except alphabetical where specified)
- [ ] Dataset flags clearly marked in UI and spec

---

## Test Scenarios

### Scenario 1: Male User, No Medications
1. Select Male for gender
2. Verify last period question NOT shown
3. Answer Q22 (Urological) = Yes
4. Verify prostate options ARE shown
5. Verify female options NOT shown
6. Answer Q32 (Regular medications) = No
7. Verify Q33-Q40 are skipped
8. Complete to Review
9. Verify medication section shows only Q32

### Scenario 2: Female User, Full Flow
1. Select Female for gender
2. Verify last period question IS shown
3. Answer Q22 (Urological) = Yes
4. Verify female options ARE shown
5. Verify prostate options NOT shown
6. Answer Q32 = Yes
7. Complete all medication questions
8. Review and verify all answers

### Scenario 3: Edit from Review
1. Complete intake
2. Go to Review
3. Click Edit on Q5 (Height)
4. Change value
5. Verify return to Review
6. Verify Q5 shows new value
7. Verify all other answers unchanged

### Scenario 4: Conflict Detection
1. Answer Q26 (Endocrine) = No
2. Answer Q32 = Yes
3. Answer Q36 (Diabetes meds) = Yes
4. Select "Insulin"
5. Go to Review
6. Verify conflict warning displayed

---

## Sign-off

| Check | Tester | Date | Pass/Fail |
|-------|--------|------|-----------|
| Question Coverage | | | |
| Conditional Logic | | | |
| Gender Rules | | | |
| Medication Gatekeeper | | | |
| Review Screen | | | |
| Accessibility | | | |
| Analytics | | | |
