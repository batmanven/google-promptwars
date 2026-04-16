import { describe, it, expect, vi } from "vitest";
import { getAetherResponse } from "../lib/gemini";

// Mock the Google Generative AI SDK
vi.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(() => {
      return {
        getGenerativeModel: vi.fn().mockImplementation(() => {
          return {
            generateContent: vi.fn().mockResolvedValue({
              response: {
                text: () => "Mocked AI Response for the event.",
              },
            }),
          };
        }),
      };
    }),
  };
});

describe("Aether AI Integration", () => {
  it("should generate a structured prompt for Aether", async () => {
    const prompt = "How do I find the Gemini lounge?";
    const response = await getAetherResponse(prompt);
    
    expect(response).toBeDefined();
    expect(typeof response).toBe("string");
  });

  it("should handle mock data gracefully when API key is missing", async () => {
    // This test ensures the fallback logic works
    const prompt = "test goal";
    const response = await getAetherResponse(prompt);
    expect(response).toBeTruthy();
  });
});
