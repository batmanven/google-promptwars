import { getUserPersona, getRecentMissions } from "@/services/firestoreService";
import { calculateWalkingTime } from "@/services/spatialService";
import { getDecisionResponse } from "@/services/geminiService";

export const executeAetherDecision = async (
  userId: string, 
  userGoal: string, 
  currentLocation: { lat: number, lng: number } | null,
  visionData: any | null = null
) => {
  const [persona, history] = await Promise.all([
    getUserPersona(userId),
    getRecentMissions(userId)
  ]);

  const eventPulse = "Main Stage: AI Keynote (Current), Hall B: VC Networking (Starting in 10m)";

  let walkingContext = "";
  if (currentLocation) {
    const timeToHallB = await calculateWalkingTime(
      `${currentLocation.lat},${currentLocation.lng}`, 
      "40.7128,-74.0060" 
    );
    walkingContext = `User is ${timeToHallB} away from Hall B.`;
  }

  const strategicContext = `
    USER GOAL: ${userGoal}
    USER PERSONA: ${JSON.stringify(persona)}
    MISSION HISTORY: ${JSON.stringify(history)}
    VISION SIGNALS: ${JSON.stringify(visionData)}
    EVENT PULSE: ${eventPulse}
    SPATIAL CONTEXT: ${walkingContext}
  `;

  const result = await getDecisionResponse(strategicContext);
  
  const { logSingularityEvent } = await import("@/services/monitoringService");
  await logSingularityEvent("INFO", "Aether Strategy Generated", { userId, userGoal });

  return result;
};
