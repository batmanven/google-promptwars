export interface EventSession {
  id: string;
  title: string;
  speaker: string;
  time: string;
  room: string;
  description: string;
}

export const getEventData = async (): Promise<EventSession[]> => {
  const sheetId = process.env.NEXT_PUBLIC_EVENT_DATA_SHEET_ID;

  if (!sheetId) {
    console.warn("NEXT_PUBLIC_EVENT_DATA_SHEET_ID is not defined. Using fallback data.");
    return getFallbackData();
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error("Sheets Fetch Error:", error);
    return getFallbackData();
  }
};

const parseCSV = (csv: string): EventSession[] => {
  if (!csv) return [];

  const lines = csv.split(/\r?\n/);

  const dataLines = lines.slice(1).filter(line => line.trim() !== "");

  return dataLines.map((line, index) => {
    const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

    const cleanFields = (matches || []).map(field =>
      field.replace(/^"|"$/g, "").trim()
    );

    const [title, speaker, time, room, description] = cleanFields;

    return {
      id: index.toString(),
      title: title || "Untitled Session",
      speaker: speaker || "TBA",
      time: time || "TBA",
      room: room || "TBA",
      description: description || ""
    };
  });
};

const getFallbackData = (): EventSession[] => [
  {
    id: "fb-1",
    title: "The Future of AI with Gemini",
    speaker: "Google Developer Team",
    time: "10:00 AM",
    room: "Stage A",
    description: "Deep dive into multimodal LLMs."
  },
  {
    id: "fb-2",
    title: "Networking 101",
    speaker: "Community Lead",
    time: "11:30 AM",
    room: "Lounge",
    description: "Build lasting professional connections."
  }
];