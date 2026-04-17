import "@testing-library/jest-dom";
import { vi } from "vitest";

global.fetch = vi.fn();
process.env.NEXT_PUBLIC_GEMINI_API_KEY = "test-api-key";

vi.spyOn(console, "error").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});

vi.mock("@google-cloud/logging", () => ({
  Logging: class Logging {
    log = vi.fn().mockReturnValue({
      entry: vi.fn(),
      write: vi.fn().mockResolvedValue([{}]),
    });
  },
}));

vi.mock("@google/genai", () => ({
  GoogleGenAI: class GoogleGenAI {
    models = {
      generateContent: vi.fn().mockResolvedValue({
        text: "Mocked AI Response",
      }),
    };
  },
}));
