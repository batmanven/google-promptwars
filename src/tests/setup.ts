import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock global fetch
global.fetch = vi.fn();

// Mock console errors to keep test output clean
vi.spyOn(console, "error").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});
