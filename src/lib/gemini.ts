import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_VERTEX_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

export const getAetherResponse = async (prompt: string, context?: string) => {
  try {
    const fullPrompt = `You are Aether, an autonomous, intelligent event companion for a high-tech physical event.

Your goal is to help attendees navigate, network, and optimize their experience with structured, actionable insights.

Context: ${context || "A physical tech hackathon/conference"}

User request: ${prompt}

Provide a professional, well-structured response using Markdown formatting:

## **Recommendations**
- Use bullet points for specific suggestions
- Include session names, times, and locations when relevant
- Focus on actionable advice

## **Next Steps**
- Numbered list of immediate actions to take
- Include specific people to meet or places to go
- Add time-sensitive recommendations

## **Pro Tips**
- Insider knowledge about the event
- Networking opportunities
- Hidden gems or special sessions

Keep responses concise but comprehensive. Don't use emojis sparingly for emphasis.Make it proffesional. Format everything in clean Markdown.`;

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

Keep responses actionable and helpful.Don't use emojis sparingly for emphasis.Make it proffesional.`;

    const result = await geminiModel.generateContent([
      {
        inlineData: {
          data: Buffer.from(imageBuffer).toString("base64"),
          mimeType,
        },
      },
      prompt,
    ]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Aether Vision Error:", error);
    return "I couldn't analyze the image clearly. Please try again.";
  }
};
