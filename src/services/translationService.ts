import { TranslationServiceClient } from "@google-cloud/translate";

const translateClient = new TranslationServiceClient();

export const translateInsight = async (text: string, targetLanguage: string = "en") => {
  try {
    const [response] = await translateClient.translateText({
      parent: `projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/locations/global`,
      contents: [text],
      mimeType: "text/plain",
      targetLanguageCode: targetLanguage,
    });

    return response.translations?.[0]?.translatedText || text;
  } catch (err) {
    return text;
  }
};
