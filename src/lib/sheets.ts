import { getFallbackEventData } from "./fallbacks";

export interface EventSession {
  id: string;
  title: string;
  speaker: string;
  time: string;
  room: string;
  description: string;
}

export const getEventData = async (): Promise<EventSession[]> => {
  const sheetId = process.env.EVENT_DATA_SHEET_ID || process.env.NEXT_PUBLIC_EVENT_DATA_SHEET_ID;

  if (!sheetId || !/^[a-zA-Z0-9\-_]+$/.test(sheetId)) {
    console.warn("Invalid or missing Event Data Sheet ID. Using fallback data.");
    return getFallbackEventData();
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
        'Accept': 'text/csv',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error("Sheets Fetch Error:", error);
    return getFallbackEventData();
  }
};

const parseCSV = (csv: string): EventSession[] => {
  if (!csv) return [];

  const lines = csv.split(/\r?\n/);
  const dataLines = lines.slice(1).filter(line => line.trim() !== "");

  return dataLines.map((line, index) => {
    // Advanced Regex for multi-column CSV with quote support
    const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

    const cleanFields = (matches || []).map(field =>
      field.replace(/^"|"$/g, "").trim()
    );

    // God-Mode Deterministic Handlers
    const title = cleanFields[0] || "Untitled Session";
    const speaker = cleanFields[1] || "TBA";
    const time = cleanFields[2] || "TBA";
    const room = cleanFields[3] || "TBA";
    const description = cleanFields[4] || "";

    // Normalize Time Strings (e.g. "10am" -> "10:00 AM")
    const normalizedTime = time.toLowerCase().includes('am') || time.toLowerCase().includes('pm') 
      ? time 
      : `${time}:00 PM`; // Safe default for missing suffixes

    return {
      id: `session-${index}-${Date.now()}`, // Unique deterministic ID
      title: title.length > 100 ? title.substring(0, 97) + "..." : title,
      speaker,
      time: normalizedTime,
      room: room || "Venue Main",
      description
    };
  });
};

const getFallbackData = (): EventSession[] => [
  {
    id: "1",
    title: "The Future of AI with Gemini",
    speaker: "Google Developer Team",
    time: "10:00 AM",
    room: "Stage A",
    description: "Deep dive into multimodal LLMs and their applications in modern software development."
  },
  {
    id: "2",
    title: "Building with Vertex AI",
    speaker: "Sarah Chen - Google Cloud",
    time: "11:30 AM",
    room: "Room 201",
    description: "Hands-on workshop for building scalable AI applications using Google's Vertex AI platform."
  },
  {
    id: "3",
    title: "AI Ethics & Responsibility",
    speaker: "Panel Discussion",
    time: "2:00 PM",
    room: "Main Hall",
    description: "Industry experts discuss the ethical implications of AI development and deployment."
  },
  {
    id: "4",
    title: "Networking 101",
    speaker: "Community Lead",
    time: "3:30 PM",
    room: "Lounge",
    description: "Build lasting professional connections with practical networking strategies."
  },
  {
    id: "5",
    title: "Multimodal AI Workshop",
    speaker: "Google Research Team",
    time: "4:00 PM",
    room: "Room 205",
    description: "Advanced workshop on implementing multimodal AI in production environments."
  },
  {
    id: "6",
    title: "Cloud Native Development",
    speaker: "Google Cloud Engineers",
    time: "5:00 PM",
    room: "Stage B",
    description: "Best practices for building and deploying cloud-native applications."
  }
];