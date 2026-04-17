import { ImageAnnotatorClient } from "@google-cloud/vision";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const visionClient = new ImageAnnotatorClient();

export const analyzeEventVisual = async (base64Data: string, userId: string): Promise<any> => {
  try {
    const fileName = `vision/${userId}_${Date.now()}.jpg`;
    const storageRef = ref(storage, fileName);
    
    const byteString = atob(base64Data.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const blob = new Blob([ab], { type: "image/jpeg" });

    await uploadBytes(storageRef, blob);
    const gcsUri = `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/${fileName}`;

    const [result] = await visionClient.annotateImage({
      image: { source: { imageUri: gcsUri } },
      features: [{ type: "TEXT_DETECTION" }, { type: "LABEL_DETECTION" }, { type: "LOGO_DETECTION" }],
    });

    return {
      text: result.fullTextAnnotation?.text || "",
      labels: result.labelAnnotations?.map(l => l.description) || [],
      logos: result.logoAnnotations?.map(l => l.description) || []
    };
  } catch (err) {
    return null;
  }
};
