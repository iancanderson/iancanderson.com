export const TAG_EMOJI: Record<string, string> = {
  software: "💻",
  investing: "📈",
  music: "🎵",
  video: "🎬",
  homebrewing: "🍺",
  podcast: "🎙️",
};

export function emojiForTag(tag?: string): string {
  if (!tag) return "🏷️";
  const t = tag.toLowerCase();
  return TAG_EMOJI[t] || "🏷️";
}

export function colorClassForTag(tag?: string): string {
  if (!tag) return "";
  const t = tag.toLowerCase();
  return TAG_EMOJI[t] ? `chip-${t}` : "";
}
