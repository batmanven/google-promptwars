import { describe, it, expect, vi } from "vitest";
import { executeAetherDecision } from "../utils/decisionEngine";

// Mock Services
vi.mock("../services/firestoreService", () => ({
  getUserPersona: vi.fn().mockResolvedValue({ role: "Founder", focus: "AI" }),
  getRecentMissions: vi.fn().mockResolvedValue([{ goal: "Netowrking", strategy: {} }])
}));

vi.mock("../services/spatialService", () => ({
  calculateWalkingTime: vi.fn().mockResolvedValue("5 mins")
}));

vi.mock("../services/geminiService", () => ({
  getDecisionResponse: vi.fn().mockResolvedValue({ 
    recommendation: "Target reached", 
    logic: "Fusion successful" 
  })
}));

describe("Aether Singularity Engine (Integration)", () => {
  it("successfully fuses vision data into decision logic", async () => {
    const mockVision = { title: "Booth A", summary: "Google Cloud Booth" };
    const result = await executeAetherDecision(
      "user123", 
      "Find cloud experts", 
      { lat: 0, lng: 0 }, 
      mockVision
    );

    expect(result.recommendation).toBeDefined();
    expect(result.logic).toContain("Fusion");
  });

  it("throws validation error for malformed inputs (Security Check)", async () => {
    await expect(
      executeAetherDecision("", "too-short", null)
    ).rejects.toThrow("Validation Failure");
  });
});
