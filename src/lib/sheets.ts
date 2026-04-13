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
  if (!sheetId) return getFallbackData();

  try {
    const url = `https: 
    const response = await fetch(url);
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error("Sheets Fetch Error:", error);
    return getFallbackData();
  }
};

const parseCSV = (csv: string): EventSession[] => {
  const lines = csv.split("\n").slice(1);
  return lines.map((line, index) => {
    const [title, speaker, time, room, description] = line.split(",").map(s => s.replace(/\"/g, ""));
    return {
      id: index.toString(),
      title: title || "TBA",
      speaker: speaker || "Guest",
      time: time || "00:00",
      room: room || "Main Hall",
      description: description || ""
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
    description: "Deep dive into multimodal LLMs."
  },
  {
    id: "2",
    title: "Networking 101",
    speaker: "Community Lead",
    time: "11:30 AM",
    room: "Lounge",
    description: "Build lasting professional connections."
  }
];
