"use server";

import { generateAudioBriefing } from "@/services/audioService";
import { translateInsight } from "@/services/translationService";

/**
 * Server Action to synthesize speech.
 * Returns audio content as a base64 string.
 */
export async function getAudioBriefingAction(text: string) {
  const audioContent = await generateAudioBriefing(text);
  if (!audioContent) return null;
  
  // Return as base64 for client-side playback
  return Buffer.from(audioContent).toString("base64");
}

/**
 * Server Action to translate text.
 */
export async function translateAction(text: string, targetLanguage: string) {
  const result = await translateInsight(text, targetLanguage);
  const { logSingularityEvent } = await import("@/services/monitoringService");
  await logSingularityEvent("INFO", "Translation Executed", { targetLanguage });
  return result;
}
