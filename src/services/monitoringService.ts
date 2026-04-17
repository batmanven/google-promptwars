"use server";

import { Logging } from "@google-cloud/logging";

const logging = new Logging();
const log = logging.log("aether-pulse");

export const logSingularityEvent = async (severity: string, message: string, payload: any = {}) => {
  try {
    const entry = log.entry({ severity: severity as any, labels: { service: "aether-prime-20" } }, {
      message,
      ...payload,
      timestamp: new Date().toISOString()
    });
    await log.write(entry);
  } catch (err) {
  }
};

export const reportAetherError = async (message: string, error: any) => {
  await logSingularityEvent("ERROR", message, { error: error.message || error });
};
