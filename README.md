# Aether: Intelligent Event Companion

Aether is an autonomous, intent-driven event companion designed to navigate and optimize the high-tech physical event experience. Developed for the Google PromptWars Hackathon 2026, the platform leverages Gemini 1.5 Flash to transform unstructured event data into personalized, actionable intelligence.

## Project Overview

### Chosen Vertical: Autonomous Event Companion
Aether was designed for the high-tech event persona—attendees who need to navigate complex campuses, manage dense schedules, and extract insights from physical environmental cues.

### Approach and Logic
The core logic of Aether is **Intent-Driven Design**. Unlike traditional event apps that are purely informational, Aether uses AI to bridge the gap between user goals and platform behavior:
- **Semantic Goal Processing**: Gemini 1.5 Flash analyzes user inputs (e.g., "I want to find VC networking opportunities") and semantically tags them for cross-module optimization.
- **Multimodal Contextualization**: By using Vision, Aether extracts text and spatial metadata from images (banners, maps) to update the user's focus without manual data entry.
- **Spatial Intelligence**: Google Maps API is used to visualize specific "Intelligence Zones" (the Radar) that dynamic markers based on the user's defined intent.

### How it Works
1. **Pulse**: Acts as the central nervous system, fetching live CSV data from Google Sheets and serving it through a Next.js Server Action to bypass client-side CORS and latency.
2. **Radar**: A bespoke Google Maps integration that dynamically renders interest points.
3. **Vision**: A multimodal interface that converts base64 image data into actionable scheduling strings via Gemini 1.5 Flash.

### Assumptions and Limitations
- **Data Source**: Assumes event organizers provide a valid CSV-exportable Google Sheet for real-time updates.
- **Environmental Context**: Vision analysis assumes standard event lighting and legible typography on banners/signs.
- **Connectivity**: Requires active network status for server-side AI processing (Server Actions).

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
