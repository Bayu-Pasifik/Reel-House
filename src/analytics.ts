type EventName = "search_submitted" | "movie_detail_opened" | "trailer_opened";

const key = "reelhouse:analytics";

export function track(event: EventName) {
  try {
    const current = JSON.parse(localStorage.getItem(key) || "{}") as Record<string, number>;
    localStorage.setItem(key, JSON.stringify({ ...current, [event]: (current[event] || 0) + 1 }));
  } catch {
    // Analytics are optional and must never interrupt browsing.
  }
}
