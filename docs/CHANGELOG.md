# Medical Intake — Change Log

---

## [2.0.0] - December 2024

### Major Changes

- **BREAKING:** Rebuilt as adaptive branching system (replaces linear 50-question flow)
- Added Health Areas Overview screen as branching engine
- Removed skin tone and eye color questions per UX requirements
- All questions now skippable (no mandatory fields)
- Removed question counter; progress bar only

### Added

- Health category selection (17 categories including "None")
- Auto-advance behavior on "No" selections
- Skip button on all questions
- Category-based conditional question visibility
- Gender-based urological option filtering
- Dataset flags for incomplete option lists

### Changed

- Progress indicator shows percentage only
- Demographics reduced to 9 questions (from 13)
- Review screen grouped by section
- Navigation controls simplified

### Removed

- Linear question numbering
- "Questions remaining" indicator
- Skin tone question
- Eye color question

### Fixed

- Gender visibility rules now properly hide/show urological options
- Medication gatekeeper properly skips all medication sub-questions

---

## [1.0.0] - November 2024

### Initial Release

- Linear 50-question medical intake wizard
- Chat-style conversational UI
- Yes/No with conditional children
- All dropdown options from Prompt B dataset
- Review screen with single-field editing
- CSV export functionality
- Analytics event tracking

---

## Unreleased / Planned

- [ ] Document upload functionality (currently OOS placeholder)
- [ ] Full syndrome list (55+ items) - awaiting client data
- [ ] Full mental health medication list - awaiting client data
- [ ] Anti-epileptic medication list - awaiting dataset correction
- [ ] Multi-language support
- [ ] Offline mode with service worker
