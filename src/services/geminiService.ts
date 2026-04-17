import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.VERTEX_AI_API_KEY as string);

export const getDecisionResponse = async (context: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
  };

  const systemInstruction = `You are Aether, an elite event strategist. 
  Reason across USER PERSONA, GPS PROXIMITY, MISSION HISTORY, and LIVE PULSE. 
  Return a JSON object: { 
    "recommendation": string, 
    "logic": string, 
    "walkingDuration": string, 
    "calendarEvent": { "title": string, "start": string }, 
    "task": string 
  }`;

  const chatSession = model.startChat({
    generationConfig,
    history: [{ role: "user", parts: [{ text: systemInstruction }] }],
  });

  const result = await chatSession.sendMessage(context);
  return JSON.parse(result.response.text());
};
