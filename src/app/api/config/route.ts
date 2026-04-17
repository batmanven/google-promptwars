import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    mapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    sheetId: process.env.NEXT_PUBLIC_EVENT_DATA_SHEET_ID,
    recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  };

  return NextResponse.json(config);
}
