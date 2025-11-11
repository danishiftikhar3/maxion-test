import type { User } from "../types";

export function scoreAttractiveness(candidate: User) {
  const act = candidate.activity;
  const now = new Date();
  const lastOnline = new Date(act.last_online);
  const daysSinceOnline = (now.getTime() - lastOnline.getTime()) / (1000 * 60 * 60 * 24);

  // --- normalize rates (0–1 range) ---
  const likesGiven = act.likes_given.length;
  const likesReceived = act.likes_received.length;
  const matches = act.matches.length;
  const dates = act.dates.length;
  const weeklyOpens = act.weekly_app_opens || 0;

  // cap weekly opens at 50 (beyond that adds no more weight)
  const weeklyOpenRate = Math.min(1, weeklyOpens / 50);

  const likesReceivedRate = Math.min(1, likesReceived / (likesGiven + 1));
  const matchRate = Math.min(1, matches / (likesGiven + 1));
  const dateRate = Math.min(1, dates / (matches + 1));

  // recency: full credit if active <3 days, decays to 0 after 30
  const recencyFactor = Math.max(0, 1 - daysSinceOnline / 30);

  // --- weighted composite ---
  // Added weeklyOpens (10%) and rebalanced others slightly
  const score =
    0.3 * likesReceivedRate +
    0.25 * matchRate +
    0.15 * dateRate +
    0.15 * recencyFactor +
    0.15 * weeklyOpenRate;

  // --- scale to 0–100 and smooth ---
  const attractivenessScore = Math.round(score * 100);

  // --- qualitative explanation ---
  const summary = [];
  if (likesReceivedRate > 0.5) summary.push("popular among other users");
  if (matchRate > 0.3) summary.push("frequent mutual matches");
  if (dateRate > 0.2) summary.push("actively going on dates");
  if (weeklyOpenRate > 0.5) summary.push("consistently active in the app");
  if (recencyFactor < 0.3) summary.push("less active recently");

  return {
    attractivenessScore,
    explanation:
      summary.join(". ") ||
      "Moderate engagement with balanced interest and activity.",
  };
}