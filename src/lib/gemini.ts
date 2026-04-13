import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_VERTEXT_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const getAetherResponse = async (prompt: string, context?: string) => {
  try {
    const fullPrompt = `You are Aether, an autonomous, intelligent event companion for a high-tech physical event.
    Your goal is to help attendees navigate, network, and optimize their experience.
    Context: ${context || "A physical tech hackathon/conference"}
    User said: ${prompt}
    Provide a concise, helpful, and proactive response. If appropriate, suggest a next action.`;

    const result = await geminiModel.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Aether AI Error:", error);
    return "I'm having trouble connecting to my core logic. Please try again in a moment.";
  }
};

export const analyzeVision = async (imageBuffer: ArrayBuffer, mimeType: string) => {
  try {
    const result = await geminiModel.generateContent([
      {
        inlineData: {
          data: Buffer.from(imageBuffer).toString("base64"),
          mimeType,
        },
      },
      "Analyze this image from a physical event (it could be a banner, room, map, or person). Provide context-aware assistance.",
    ]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Aether Vision Error:", error);
    return "I couldn't analyze the image clearly. Please try again.";
  }
};
