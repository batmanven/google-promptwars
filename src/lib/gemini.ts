/**
 * Gemini AI Core Service
 * 
 * Handles interaction with Google's Gemini-2.0-Flash model.
 * Marked with "use server" to ensure API keys remain on the backend.
 */
"use server";

import { getAIClient, systemInstruction } from "./gemini-core";
import { mockAIResponses, getMockVisionResponse } from "./fallbacks";

const apiKey = process.env.GEMINI_API_KEY;

export async function getAetherResponse(prompt: string, context?: string) {
  const trimmedPrompt = prompt.trim();
  if (trimmedPrompt.length < 3) {
    return "Please provide a goal with a bit more detail so I can help.";
  }
  if (trimmedPrompt.length > 2000) {
    return "Please send a shorter prompt so I can process it reliably.";
  }

  if (!apiKey) return mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
  
  const ai = getAIClient(apiKey);
  /**
   * Generates a strategic response from Aether based on prompt and optional context.
   */
  try {
    const fullPrompt = context ? `Context: ${context}\n\nGoal: ${trimmedPrompt}` : trimmedPrompt;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        systemInstruction
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    return "Strategic pulse interrupted. Proceed to next Hall.";
  }
}

/**
 * Performs multimodal vision analysis on event visuals.
 * Returns structured JSON for the Vision Concierge.
 */
export const analyzeVision = async (base64Image: string, mimeType: string) => {
  if (!apiKey) return getMockVisionResponse();
  
  const ai = getAIClient(apiKey);
  try {
    const cleanBase64 = base64Image.split(",")[1];
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          parts: [
            { inlineData: { data: cleanBase64, mimeType } },
            { text: "Analyze this event visual. Return JSON: { \"title\": string, \"summary\": string, \"details\": string[], \"recommendations\": string[], \"insights\": string }" }
          ]
        }
      ],
      config: {
        systemInstruction
      }
    });
    return response.text || getMockVisionResponse();
  } catch (error) {
    return getMockVisionResponse();
  }
};
