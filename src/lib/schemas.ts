import { z } from "zod";

/**
 * Execute Decision Schema
 * 
 * Strict validation for the Aether Decision Engine inputs.
 */
export const ExecuteDecisionSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  userGoal: z.string().min(3, "Goal must be at least 3 characters").max(1000, "Goal is too long"),
  currentLocation: z.object({
    lat: z.number(),
    lng: z.number()
  }).nullable(),
  visionData: z.any().nullable()
});

export type ExecuteDecisionInput = z.infer<typeof ExecuteDecisionSchema>;
