# Design Rationale

## Key UX Decisions

1. **One Question Per Screen (Chat-Style):** Reduces cognitive load and creates a conversational feel. Users focus on one decision at a time, improving completion rates for lengthy medical forms.

2. **Inline Conditional Children:** When a user selects "Yes" on a gating question, child dropdowns appear immediately below within the same bubble rather than as separate screens. This maintains context and reduces navigation friction.

3. **Large Touch Targets (56px+ for Yes/No):** Medical intake users may include elderly patients or those with motor impairments. Oversized buttons ensure accessibility and reduce input errors on mobile devices.

4. **Persistent Progress + Summary Access:** The top progress bar and sidebar summary button give users confidence about their progress and allow quick review without losing their place.

5. **Gender-Filtered Options (Not Separate Questions):** Rather than creating duplicate questions for different genders, we filter the options within Q22 (Urological) based on the gender selected in Q2. This keeps the question count manageable while ensuring relevance.

## Technical Decisions

- **Zustand with Persistence:** Chosen for lightweight state management with built-in localStorage persistence, ensuring users don't lose progress on page refresh.
- **No External Form Library:** Given the custom chat-style UI and complex conditional logic, a custom solution provides more control than libraries like React Hook Form.
- **CSV Export:** Provides immediate value for QA testing and allows users to keep records without backend integration.
