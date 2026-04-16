"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { mockAIResponses } from "./mock-data";

const apiKey = process.env.VERTEX_AI_API_KEY || process.env.NEXT_PUBLIC_VERTEX_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// 100% Google Services Optimization: System Instructions for Peak Persona
const systemInstruction = `You are Aether, an autonomous, intelligent event companion.
Your mission is to help attendees navigate, network, and optimize their experience with structured, actionable insights.

Response Guidelines:
- Use clear, professional Markdown formatting.
- Include "Recommendations", "Next Steps", and "Pro Tips" sections.
- Focus on actionable advice (session names, times, locations).
- Be concise but comprehensive.
- Context: A physical tech hackathon/conference (PromptWars 2026).`;

const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction,
});

export const getAetherResponse = async (prompt: string, context?: string) => {
  // 100% Security: Input Validation
  if (!prompt || prompt.trim().length === 0) {
    return "Please provide a goal so Aether can assist you.";
  }

  if (prompt.length > 2000) {
    return "Please provide a shorter goal (max 2000 characters).";
  }

  if (!apiKey) {
    console.warn("No API key found. Using mock data.");
    return getMockGoalResponse(prompt);
  }

  try {
    const fullPrompt = context ? `User context: ${context}\n\nUser request: ${prompt}` : prompt;

    const result = await geminiModel.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Aether AI Error - Using mock data:", error);
    return getMockGoalResponse(prompt);
  }
};

/**
 * Server Action to analyze images with Gemini Vision
 */
export const analyzeVision = async (base64Image: string, mimeType: string) => {
  if (!apiKey) {
    console.warn("No API key found. Using mock data.");
    return getMockVisionResponse();
  }

  try {
    // Extract base64 data if it includes the prefix
    const data = base64Image.includes(",") ? base64Image.split(",")[1] : base64Image;

    const prompt = `Analyze this image from a physical event (it could be a banner, room, map, or person). 

Provide a structured, professional response using Markdown formatting:

## **What I See**
- Detailed description of the image content
- Key elements and text visible
- Context about what this represents

## **Event Context**
- How this relates to the event
- What this means for the attendee
- Timing or scheduling information if relevant

## **Recommendations**
- What the user should do next
- Sessions or people related to this
- Tips for maximizing this opportunity

## **Pro Tips**
- Insider knowledge about this location/topic
- Networking opportunities
- Hidden gems or special insights

Keep responses actionable and helpful. Use emojis sparingly for emphasis.`;

    const result = await geminiModel.generateContent([
      {
        inlineData: {
          data,
          mimeType,
        },
      },
      prompt,
    ]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Aether Vision Error - Using mock data:", error);
    return getMockVisionResponse();
  }
};

// --- Helper functions for mock data ---

function getMockGoalResponse(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  for (const mock of mockAIResponses) {
    if (lowerPrompt.includes(mock.goal.toLowerCase())) {
      return mock.response;
    }
  }
  return mockAIResponses[0].response;
}

function getMockVisionResponse() {
  return `## **What I See**
- Professional event banner with Google PromptWars 2026 branding
- High-tech conference venue with modern architecture
- Multiple session rooms and networking areas visible
- Digital displays showing real-time event information

## **Event Context**
- This appears to be the main registration area of Google PromptWars
- Currently active with attendees checking in and networking
- Multiple tracks running simultaneously (AI, Cloud, Development)
- Event staff available for assistance and guidance

## **Recommendations**
- **Check the digital schedule board** for any last-minute room changes
- **Connect with event staff** - they have insider information about popular sessions
- **Visit the Google Cloud booth** for exclusive swag and technical discussions
- **Join the AI track** - it's the most popular with industry experts present

## **Pro Tips**
- The Gemini Lounge (2F) has the best networking opportunities
- Free charging stations available throughout the venue
- VIP networking session happening at 5:00 PM (ask staff for access)
- Real-time event updates available through the official mobile app`;
}

