export const fetchEventPulse = async (sheetId: string) => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Fetch failed");
    
    const text = await resp.text();
    const rows = text.split("\n").map(r => r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
    
    return rows.slice(1).map((row, index) => ({
      id: `session-${index}-${Date.now()}`,
      time: row[0]?.replace(/"/g, "") || "",
      title: row[1]?.replace(/"/g, "") || "Untitled Session",
      location: row[2]?.replace(/"/g, "") || "Main Hall",
    }));
  } catch (err) {
    return [
      { id: "1", time: "10:00 AM", title: "Aether Pulse Keynote", location: "Stage A" },
      { id: "2", time: "02:00 PM", title: "GCP Singularity Workshop", location: "Room 202" }
    ];
  }
};
