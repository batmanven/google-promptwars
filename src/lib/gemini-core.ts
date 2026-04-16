import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.VERTEX_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Core AI Persona Instruction for Aether.
 * Strictly defines the behavioral boundaries, formatting requirements, and expertise level
 * of the event companion to ensure 100% persona consistency.
 */
export const systemInstruction = `You are Aether, an autonomous, intelligent event companion.
Your mission is to help attendees navigate, network, and optimize their experience with structured, actionable insights.

Response Guidelines:
- Use clear, professional Markdown formatting.
- Include "Recommendations", "Next Steps", and "Pro Tips" sections.
- Focus on actionable advice (session names, times, locations).
- Be concise but comprehensive.
- Context: A physical tech hackathon/conference (PromptWars 2026).`;

/**
 * The primary Generative Model instance, pre-configured with the Aether System Instructions.
 * This is the central engine for all Aether intelligence.
 */
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction,
});

export { apiKey };
