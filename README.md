# Aether: Intelligent Event Companion

Aether is an autonomous, intent-driven event companion designed to navigate and optimize the high-tech physical event experience. Developed for the Google PromptWars Hackathon 2026, the platform leverages Gemini 1.5 Flash to transform unstructured event data into personalized, actionable intelligence.

## Core Capabilities

### Pulse: Real-time Intelligence
A centralized dashboard providing live updates on sessions, networking status, and system health. It synchronizes with real-time event data from Google Sheets to ensure attendees are always aligned with the latest scheduling changes.

### Vision: Multimodal Analysis
Utilizes Gemini 1.5 Flash Vision to analyze physical environment cues. Attendees can capture images of banners, room layouts, or maps to receive instant context, scheduling information, and strategic recommendations.

### Radar: Spatial awareness
A high-fidelity venue radar integrated with the Google Maps JavaScript API. It provides real-time spatial intelligence, marking key collaboration zones, speaking tracks, and networking lounges with precision.

### Intent: Autonomous Goal Alignment
An intent-driven engine that adapts the entire user experience based on specific attendee goals. By defining targets—such as specialized networking or technical deep dives—Aether dynamically prioritizes information across all modules.

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
