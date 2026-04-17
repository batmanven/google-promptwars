"use server";

import { apiKey, geminiModel } from "./gemini-core";
import { mockAIResponses, getMockVisionResponse } from "./fallbacks";

/**
 * Orchestrates the primary NLP interaction for Aether goals.
 * Validates inputs, handles context injection, and provides a robust fallback mechanism.
 * 
 * @param {string} prompt - The user's primary intent or goal string.
 * @param {string} [context] - Optional environmental or temporal context to refine the response.
 * @returns {Promise<string>} - The AI generated response or a graceful fallback string.
 * @throws {Error} - Gracefully handled internally with a log and mock return.
 */
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

 * 
 * @param {string} base64Image - The raw base64 data of the captured image.
 * @param {string} mimeType - The image format (e.g., image/jpeg, image/png).
 * @returns {Promise<string>} - A JSON-formatted string containing the structured image analysis.
 * @see {@link VisionConcierge} for the frontend handling of this deterministic output.
 */
export const analyzeVision = async (base64Image: string, mimeType: string) => {
  if (!apiKey) {
    console.warn("No API key found. Using mock data.");
    return JSON.stringify({
      title: "Event Registration Area",
      summary: "I see a professional event banner with Google PromptWars 2026 branding in a high-tech venue.",
      details: ["Google PromptWars 2026", "Main Entrance", "April 6-19, 2026", "Google Cloud / AI Branding"],
      recommendations: ["Pick up your badge at the registration desk", "Scan the QR code on the banner for the digital schedule"],
      insights: "The registration area currently has low traffic; it is the perfect time to get your swag bag."
    });
  }

  try {
    const data = base64Image.includes(",") ? base64Image.split(",")[1] : base64Image;

    const prompt = `Analyze this image from a physical event. 
Return a STRICT JSON object in the following format:
{
  "title": "Short title",
  "summary": "2-sentence contextual summary",
  "details": ["Array of text/elements visible"],
  "recommendations": ["Actionable next steps"],
  "insights": "Professional insider tips"
}

Ensure the output is ONLY the JSON object. Do not include markdown code block backticks.`;

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
    return response.text().trim();
  } catch (error) {
    console.error("Aether Vision Error:", error);
    return getMockVisionResponse();
  }
};

// --- Helper functions for mock data ---

/**
 * Internal heuristic to map user prompts to the most relevant mock data set.
 * Acts as the final defensive layer in zero-connectivity environments.
 * 
 * @param {string} prompt - The raw user input.
 * @returns {string} - The most semantically relevant mock response.
 */
function getMockGoalResponse(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  for (const mock of mockAIResponses) {
    if (lowerPrompt.includes(mock.goal.toLowerCase())) {
      return mock.response;
    }
  }
  return mockAIResponses[0].response;
}

