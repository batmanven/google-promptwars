/**
 * Event Configuration
 * 
 * Centralized strategic context for Aether's proximity logic.
 * These signals represent the current "Pulse" of the event.
 */
export const EVENT_CONTEXT = {
  PULSE: "Main Stage: AI Keynote (Current), Hall B: VC Networking (Starting in 10m)",
  HALLS: {
    MAIN_STAGE: "Main Stage",
    HALL_B: "Hall B",
    NETWORKING_LOUNGE: "Lounge Area"
  },
  TARGETS: {
    VC_NETWORKING: "40.7128,-74.0060" // NYC coordinates for demo
  }
};
