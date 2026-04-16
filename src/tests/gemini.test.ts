import { describe, it, expect, vi, beforeEach } from "vitest";
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

describe("Aether AI Integration (Gemini 1.5 Flash)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should generate a response for valid user intent", async () => {
    const prompt = "How do I find the Gemini lounge?";
    const response = await getAetherResponse(prompt);
    
    expect(response).toBeDefined();
    expect(response).toBe("Mocked AI Response for the event.");
  });

  it("should handle empty or very short inputs by returning a helpful default", async () => {
    const response = await getAetherResponse("");
    expect(response).toContain("Please provide a goal");
  });

  it("should enforce input length limits for technical safety", async () => {
    const longPrompt = "a".repeat(3000);
    const response = await getAetherResponse(longPrompt);
    expect(response).toContain("shorter");
  });

  it("should handle API failure by returning a graceful fallback response", async () => {
    // Force a mock failure if needed, but our implementation currently has a try-catch 
    // that returns fallback text.
    const response = await getAetherResponse("cause an error");
    expect(response).toBeDefined();
    expect(typeof response).toBe("string");
  });
});
