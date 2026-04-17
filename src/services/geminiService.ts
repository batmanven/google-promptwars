import { getAIClient, systemInstruction } from "@/lib/gemini-core";
import { getSecret } from "./secretsService";

export const getDecisionResponse = async (context: string) => {
  const apiKey = await getSecret("VERTEX_AI_API_KEY");
  const ai = getAIClient(apiKey || "");

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: context,
    config: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
      systemInstruction,
    }
  });

  return JSON.parse(response.text || "{}");
};
