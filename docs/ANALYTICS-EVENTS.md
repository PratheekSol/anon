# Medical Intake — Analytics Event Map

**Version:** 2.0 (Adaptive Branching System)  
**Last Updated:** December 2024

---

## Event Overview

All events include a `timestamp` field (Unix milliseconds) automatically.

---

## Core Flow Events

### `q_answered`

**Trigger:** User answers any question (including skip = null value)

| Payload Key | Type | Description |
|-------------|------|-------------|
| `question_id` | string | Unique question identifier |
| `answer` | any | User's answer value |
| `time_on_question_ms` | number | Time spent on this question in milliseconds |
| `revealed_children_count` | number | Number of child fields revealed (for Yes/No questions) |

**Example:**
\`\`\`json
{
  "event": "q_answered",
  "data": {
    "question_id": "heart_disease",
    "answer": true,
    "time_on_question_ms": 2340,
    "revealed_children_count": 1
  },
  "timestamp": 1701532800000
}
\`\`\`

---

### `question_skipped`

**Trigger:** User clicks Skip button to bypass a question

| Payload Key | Type | Description |
|-------------|------|-------------|
| `phase` | string | Current flow phase (demographics, conditions, medications) |
| `question_id` | string | Skipped question identifier |

**Example:**
\`\`\`json
{
  "event": "question_skipped",
  "data": {
    "phase": "demographics",
    "question_id": "oxygen_saturation"
  },
  "timestamp": 1701532800000
}
\`\`\`

---

### `health_categories_selected`

**Trigger:** User completes Health Areas Overview screen

| Payload Key | Type | Description |
|-------------|------|-------------|
| `categories` | string[] | Array of selected category IDs |

**Example:**
\`\`\`json
{
  "event": "health_categories_selected",
  "data": {
    "categories": ["heart", "lung", "medications"]
  },
  "timestamp": 1701532800000
}
\`\`\`

---

### `conditional_opened`

**Trigger:** User selects "Yes" on a Yes/No question, revealing child controls

| Payload Key | Type | Description |
|-------------|------|-------------|
| `question_id` | string | Parent question identifier |
| `children_count` | number | Number of child fields revealed |

**Example:**
\`\`\`json
{
  "event": "conditional_opened",
  "data": {
    "question_id": "allergies",
    "children_count": 2
  },
  "timestamp": 1701532800000
}
\`\`\`

---

## Review & Submission Events

### `review_submit_attempt`

**Trigger:** User reaches the Review screen

| Payload Key | Type | Description |
|-------------|------|-------------|
| `answered_count` | number | Total questions answered |

**Example:**
\`\`\`json
{
  "event": "review_submit_attempt",
  "data": {
    "answered_count": 18
  },
  "timestamp": 1701532800000
}
\`\`\`

---

### `final_submit`

**Trigger:** User successfully submits the intake form

| Payload Key | Type | Description |
|-------------|------|-------------|
| `total_answers` | number | Total questions answered |
| `timestamp` | number | Submission timestamp |

**Example:**
\`\`\`json
{
  "event": "final_submit",
  "data": {
    "total_answers": 18,
    "timestamp": 1701532800000
  },
  "timestamp": 1701532800000
}
\`\`\`

---

## Event Implementation

Events are stored in Zustand state and can be exported. Implementation location:

\`\`\`typescript
// lib/intake-store.ts
logEvent: (event, data) => {
  set((state) => ({
    analyticsEvents: [
      ...state.analyticsEvents,
      { event, data, timestamp: Date.now() }
    ],
  }))
}
\`\`\`

---

## Recommended Integrations

Events can be forwarded to:
- Vercel Analytics
- Google Analytics 4
- Mixpanel
- Amplitude
- Custom backend endpoint

---

## Event Frequency Expectations

| Event | Expected Frequency |
|-------|-------------------|
| `q_answered` | 10-40 per session (depends on categories selected) |
| `question_skipped` | 0-10 per session |
| `health_categories_selected` | 1 per session |
| `conditional_opened` | 0-20 per session |
| `review_submit_attempt` | 1 per session |
| `final_submit` | 0-1 per session |
