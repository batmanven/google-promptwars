"use server";

import { geminiModel } from "./gemini-core";
import { mockAIResponses, getMockVisionResponse } from "./fallbacks";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function getAetherResponse(prompt: string, context?: string) {
  if (!apiKey) {
    return mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
  }

  try {
    const fullPrompt = context ? `Context: ${context}\n\nGoal: ${prompt}` : prompt;
    const result = await geminiModel.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return "Strategic pulse interrupted. Proceed to next Hall.";
  }
}

export const analyzeVision = async (base64Image: string, mimeType: string) => {
  if (!apiKey) {
    return getMockVisionResponse();
  }

  try {
    const result = await geminiModel.generateContent([
      {
        inlineData: {
          data: base64Image.split(",")[1],
          mimeType,
        },
      },
      "Analyze this event visual. Return JSON: { \"title\": string, \"summary\": string, \"details\": string[], \"recommendations\": string[], \"insights\": string }",
    ]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return getMockVisionResponse();
  }
};
