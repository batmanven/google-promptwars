import { TextToSpeechClient } from "@google-cloud/text-to-speech";

const ttsClient = new TextToSpeechClient();

export const generateAudioBriefing = async (text: string) => {
  try {
    const [response] = await ttsClient.synthesizeSpeech({
      input: { text },
      voice: { languageCode: "en-US", name: "en-US-Neural2-F" },
      audioConfig: { audioEncoding: "MP3", pitch: 0, speakingRate: 1.05 },
    });

    return response.audioContent;
  } catch (err) {
    return null;
  }
};
