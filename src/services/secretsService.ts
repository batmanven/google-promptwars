import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

export const getSecret = async (secretName: string) => {
  if (process.env.NODE_ENV !== "production") {
    return process.env[secretName] || null;
  }

  try {
    const [version] = await client.accessSecretVersion({
      name: `projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/secrets/${secretName}/versions/latest`,
    });
    return version.payload?.data?.toString();
  } catch (error) {
    return process.env[secretName] || null;
  }
};
