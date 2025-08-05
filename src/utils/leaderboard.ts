import { LOCALSTORAGE_LEADERBOARD_KEY } from "@/constants/keys";
import type { LeaderboardEntryT } from "@/types";

export const loadLeaderboard = (): LeaderboardEntryT[] => {
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveLeaderboard = (entries: LeaderboardEntryT[]) => {
  localStorage.setItem(LOCALSTORAGE_LEADERBOARD_KEY, JSON.stringify(entries));
};

export const addWinToLeaderboard = (playerName: string) => {
  const entries = loadLeaderboard();
  const existing = entries.find((e) => e.name === playerName);
  if (existing) {
    existing.wins += 1;
  } else {
    entries.push({ name: playerName, wins: 1 });
  }
  saveLeaderboard(entries);
};
