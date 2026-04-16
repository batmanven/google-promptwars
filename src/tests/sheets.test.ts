import { describe, it, expect, vi, beforeEach } from "vitest";
import { getEventData } from "@/lib/sheets";

describe("Sheets Library Logic", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should successfully parse valid CSV data from Google Sheets", async () => {
    const mockCsv = "Title,Speaker,Time,Room,Description\nKeynote,Speaker One,10:00 AM,Stage 1,Test Description";
    
    // @ts-expect-error - Mocking global fetch for testing
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockCsv),
    });

    process.env.EVENT_DATA_SHEET_ID = "test-id";
    const data = await getEventData();

    expect(data).toHaveLength(1);
    expect(data[0].title).toBe("Keynote");
    expect(data[0].speaker).toBe("Speaker One");
    expect(data[0].room).toBe("Stage 1");
  });

  it("should return fallback data when the sheet ID is missing", async () => {
    delete process.env.EVENT_DATA_SHEET_ID;
    delete process.env.NEXT_PUBLIC_EVENT_DATA_SHEET_ID;
    
    const data = await getEventData();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].id).toBe("1"); // Fallback check
  });

  it("should handle HTTP errors gracefully and return fallback data", async () => {
    // @ts-expect-error - Mocking global fetch for testing
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    process.env.EVENT_DATA_SHEET_ID = "invalid-id";
    const data = await getEventData();
    
    expect(data.length).toBeGreaterThan(0); // Should fallback
  });
});
