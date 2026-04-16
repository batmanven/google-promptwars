import { EventSession } from "./sheets";

export const mockAIResponses = [
  {
    goal: "Networking",
    response: `## **Recommendations**
- **Visit the Gemini Lounge (2F)**: High traffic area for industry leaders.
- **Join 'AI Ethics & Responsibility' Panel**: 2:00 PM at the Main Hall.

## **Next Steps**
1. Head to the 2nd Floor Lounge.
2. Introduce yourself to at least 3 people near the demo pods.

## **Pro Tips**
- The coffee bar near Room 205 is a secret hotspot for Google Cloud engineers.`
  },
  {
    goal: "Technical Deep Dive",
    response: `## **Recommendations**
- **Multimodal AI Workshop**: 4:00 PM in Room 205.
- **Q&A Session with Sarah Chen**: Immediately following her talk at 11:30 AM in Room 201.

## **Next Steps**
1. Prepare your environment for the 4:00 PM workshop.
2. Visit the Sandbox area to try the latest Gemini 1.5 prototypes.

## **Pro Tips**
- Technical leads usually hang out in the Sandbox during lunch breaks.`
  }
];

export const getFallbackEventData = (): EventSession[] => [
  {
    id: "1",
    title: "The Future of AI with Gemini",
    speaker: "Google Developer Team",
    time: "10:00 AM",
    room: "Stage A",
    description: "Deep dive into multimodal LLMs and their applications."
  },
  {
    id: "2",
    title: "Building with Vertex AI",
    speaker: "Google Cloud",
    time: "11:30 AM",
    room: "Room 201",
    description: "Hands-on workshop for building scalable AI applications."
  }
];

export const getMockVisionResponse = () => `## **What I See**
- Professional event banner with Google PromptWars 2026 branding
- High-tech conference venue with digital displays.

## **Event Context**
- This appears to be the main registration area of Google PromptWars.

## **Recommendations**
- **Check the digital schedule board** for any last-minute room changes.
- **Visit the Google Cloud booth** for technical discussions.`;
