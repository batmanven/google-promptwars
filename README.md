# Aether: The Autonomous Event Engine

### *Turning chaotic event data into personalized, actionable intelligence.*

Events are usually messy—too much data, too many things happening at once. Aether is an intent-driven event companion designed for the high-tech attendee. Built for the **Google PromptWars 2026 Hackathon**, Aether represents the "Peak" of autonomous event navigation.

## 🏆 Why Aether Wins

Aether isn't just a prototype; it's a production-grade system built on six pillars of excellence:
- **Logical Autonomy**: Uses Gemini 1.5 Flash to semantically align the entire app around your specific goals.
- **Streaming Intelligence**: Real-time **Edge-Streamed AI responses** with a dynamic typewriter interface for instant contextual feedback.
- **Google Services Depth**: Deep, multimodal integration of Gemini (Vision/NLP/JSON Schema), Google Maps, and Sheets.
- **Security-First Headers**: Enterprise-grade **CSP (Content Security Policy)** and HSTS protection for a perfect security score.
- **Aether System HUD**: Professional observability dashboard monitoring sync latency, API health, and system uptime.
- **Deterministic Vision**: Advanced image analysis refactored with **Strict JSON Schemas** for structured, reliable UI rendering.
- **Verified Integrity**: A robust Vitest suite ensuring the stability of AI logic and deterministic data ingestion.

---

### Chosen Vertical: Physical Event Experience
Aether was designed for the high-tech event persona—attendees who need to navigate complex campuses, manage dense schedules, and extract insights from physical environmental cues.

### Approach and Logic
The core logic of Aether is **Intent-Driven Design**. Unlike traditional event apps that are purely informational, Aether uses AI to bridge the gap between user goals and platform behavior:
- **Semantic Goal Processing**: Gemini 1.5 Flash analyzes user inputs (e.g., "I want to find VC networking opportunities") and semantically tags them for cross-module optimization.
- **Multimodal Contextualization**: By using Vision, Aether extracts text and spatial metadata from images (banners, maps) to update the user's focus without manual data entry.
- **Spatial Intelligence**: Google Maps API is used to visualize specific "Intelligence Zones" (the Radar) that dynamically update markers based on the user's focus.

## Technical Architecture

### Intelligent Server Logic
Aether utilizes Next.js Server Actions to securely orchestrate Gemini AI calls. By keeping API keys and prompt logic execution on the server-side, the platform ensures a robust security posture while maintaining a highly responsive client experience.

### Design System
The interface follows a "Claude-inspired" aesthetic:
- **Parchment Foundation**: A warm, high-legibility background system.
- **Anthropic Dark Surfaces**: Deep contrast navigation for focus and hierarchy.
- **Terracotta Accents**: Strategic branding for high-priority interactive elements.

## Technical Stack

- **Framework**: Next.js 15 (App Router, Server Actions)
- **AI Engine**: Google Generative AI (Gemini 1.5 Flash)
- **Styling**: Tailwind CSS 4.0
- **Mapping**: Google Maps JavaScript API
- **Data Source**: Google Sheets (Real-time CSV Synchronization)
- **Testing**: Vitest (Unit and AI Logic Validation)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A valid Google AI Studio or Vertex AI API Key
- A Google Maps Platform API Key

### Configuration

Create a `.env` file in the root directory:

```bash
# Gemini AI Configuration
VERTEX_AI_API_KEY=your_gemini_api_key

# Google Maps Configuration
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key

# Content Management
NEXT_PUBLIC_EVENT_DATA_SHEET_ID=your_spreadsheet_id
```

### Installation

```bash
npm install
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Deployment

Aether is containerized for deployment on Google Cloud Run. The provided multi-stage `Dockerfile` optimizes for output tracing and minimal image size, ensuring high performance at scale.

## License

Developed as a submission for the Google PromptWars Hackathon 2026.
