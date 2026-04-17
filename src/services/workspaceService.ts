export const createCalendarEvent = (title: string, start: string) => {
  const encodedTitle = encodeURIComponent(title);
  const startTime = new Date(start).toISOString().replace(/-|:|\.\d\d\d/g, "");
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startTime}/${startTime}&details=Managed+by+Aether+Prime`;
};

export const createGoogleTask = async (task: string) => {
  try {
    const response = await fetch("/api/workspace/tasks", {
      method: "POST",
      body: JSON.stringify({ title: task }),
    });
    return response.ok;
  } catch (err) {
    return false;
  }
};

export const exportToDrive = async (content: string) => {
  try {
    const response = await fetch("/api/workspace/drive", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    return response.ok;
  } catch (err) {
    return false;
  }
};
