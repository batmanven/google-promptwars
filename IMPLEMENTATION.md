# Implementation Plan: Aether — The Autonomous Event Companion

Aether is a high-performance, intent-driven application designed to revolutionize the **Physical Event Experience**. It transforms the way attendees interact with venues, speakers, and each other by shifting from a passive "list-based" app to an **Autonomous Assistant** that anticipates user needs.

## User Review Required

> [!IMPORTANT]
> **To win Top 50, we must excel in "Google Services Integration".**
> 1.  **Google Cloud Credits:** The plan assumes you have the Billing account active (as seen in your screenshot) to host on Cloud Run.
> 2.  **Multimodal AI:** We will use Gemini 1.5 Flash for "Vision Concierge" (uploading photos of the venue/program).
> 3.  **Data Persistence:** To keep the repo < 1MB, we will use **Google Sheets** as a lightweight, real-time database for event data (speakers, rooms, schedules). This is a "power move" that shows deep Google ecosystem integration.

---

## Proposed Changes

### 1. Foundation & Architecture
We will use a ultra-lean **Next.js 14** structure to ensure we stay under the 1MB limit.

#### [NEW] `package.json`
*   Core dependencies: `next`, `react`, `react-dom`, `lucide-react` (icons), `@google/generative-ai`.
*   Development dependencies: `typescript`, `postcss`, `autoprefixer`.

#### [NEW] `src/lib/google-services.ts`
*   Central wrapper for **Gemini (Vertex AI)**, **Maps**, and **Calendar**.
*   Implements the "Intent Logic" that the judging AI is looking for.

### 2. Design System: "Glassmorphism 2.0"
A premium, futuristic aesthetic to WOW the judges.

#### [NEW] `src/app/globals.css`
*   Custom CSS variables for a "Deep Space" theme (#0A0A0B background).
*   Glassmorphism utility classes (`backdrop-filter`, `border-white/10`).
*   Smooth micro-animations for state transitions.

### 3. Core Feature Modules

#### [NEW] `The Pulse (Home Dashboard)`
*   A dynamic timeline that uses AI to highlight "What matters to YOU right now."
*   If a session is starting in a room far away, Aether proactively warns the user.

#### [NEW] `Vision Concierge (Multimodal AI)`
*   A "Camera" interface where users upload photos of physical banners or room numbers.
*   **Gemini** analyzes the photo and provides context: "This is the Gemini Lounge. The 'Future of AI' talk starts here in 10 mins. Should I save a seat?"

#### [NEW] `Smart Radar (Google Maps)`
*   An interactive map showing the physical venue.
*   Uses custom markers to show where networking "Heat" is happening based on AI analysis of attendee goals.

### 4. Deployment & Submission
#### [NEW] `Dockerfile`
*   Multi-stage build to ensure the final image is slim for Cloud Run.

#### [NEW] `README.md`
*   Professional documentation including the **"Submission Narrative"** required by the judges.
*   Clear explanation of the "Intent-Driven" logic.

---

## Open Questions

> [!WARNING]
> **API Keys:** We need to store your Google Maps and Vertex AI keys in Cloud Run Environment Variables. Do you have access to create these in the Google Cloud Console?

---

## Verification Plan

### Automated Tests
1.  `npm run build`: Ensure the project compiles perfectly without bloat.
2.  **Lighthouse Audit:** Target 90+ for Accessibility and Performance (Key evaluation focus).

### Manual Verification
1.  **Mobile View:** Test on a simulated mobile device (hackathon attendees use phones).
2.  **Vision Test:** Upload a photo of "Physical Text" to verify Gemini's intent-parsing logic.
3.  **Deployment:** Verify the Cloud Run URL is live and responsive.
