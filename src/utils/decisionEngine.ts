/**
 * Decision Engine
 * 
 * Orchestrates multimodal signals from Vision, Spatial, and FireStore
 * to generate proactive strategic recommendations via Gemini AI.
 */
"use server";

import { getUserPersona, getRecentMissions } from "@/services/firestoreService";
import { calculateWalkingTime } from "@/services/spatialService";
import { getDecisionResponse } from "@/services/geminiService";
import { EVENT_CONTEXT } from "@/config/event";
import { ExecuteDecisionSchema } from "@/lib/schemas";

/**
 * Orchestrates multimodal signals from Vision, Spatial, and FireStore
 * to generate proactive strategic recommendations via Gemini AI.
 */
export const executeAetherDecision = async (
  userId: string, 
  userGoal: string, 
  currentLocation: { lat: number, lng: number } | null,
  visionData: any | null = null
) => {
  // Runtime Security Validation
  const validation = ExecuteDecisionSchema.safeParse({ userId, userGoal, currentLocation, visionData });
  if (!validation.success) {
    throw new Error(`Validation Failure: ${validation.error.message}`);
  }
  const [persona, history] = await Promise.all([
    getUserPersona(userId),
    getRecentMissions(userId)
  ]);

  const eventPulse = EVENT_CONTEXT.PULSE;

  let walkingContext = "";
  if (currentLocation) {
    const timeToHallB = await calculateWalkingTime(
      `${currentLocation.lat},${currentLocation.lng}`, 
      EVENT_CONTEXT.TARGETS.VC_NETWORKING
    );
    walkingContext = `User is ${timeToHallB} away from Hall B.`;
  }

  const strategicContext = `
    USER GOAL: ${userGoal}
    USER PERSONA: ${JSON.stringify(persona)}
    MISSION HISTORY: ${JSON.stringify(history)}
    EVENT PULSE: ${eventPulse}
    
    [MULTIMODAL SIGNALS]
    VISION ANALYTICS: ${visionData ? JSON.stringify(visionData) : "No visual context uploaded."}
    SPATIAL CONTEXT: ${walkingContext}

    INSTRUCTION: Fuse the visual signals (what the user is seeing) with their goal and proximity. 
    If they just photographed a booth or sign, prioritize that in your trajectory logic.
  `;

  const result = await getDecisionResponse(strategicContext);
  
  const { logSingularityEvent } = await import("@/services/monitoringService");
  await logSingularityEvent("INFO", "Aether Strategy Generated", { userId, userGoal });

  return result;
};
