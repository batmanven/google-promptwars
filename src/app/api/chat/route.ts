import { geminiModel } from "@/lib/gemini-core";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { prompt, context } = await req.json();

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const fullPrompt = context ? `User context: ${context}\n\nUser request: ${prompt}` : prompt;

    // Use generateContentStream for God-Mode real-time feedback
    const result = await geminiModel.generateContentStream(fullPrompt);

    // Create a readable stream for the response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response("Error generating content", { status: 500 });
  }
}
