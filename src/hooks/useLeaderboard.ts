import { useState, useEffect } from "react";
import { loadLeaderboard, addWinToLeaderboard } from "@/utils/leaderboard";
import type { LeaderboardEntryT } from "@/types";

export const useLeaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntryT[]>([]);

  useEffect(() => {
    setEntries(loadLeaderboard());
  }, []);

  const registerWin = (playerName: string) => {
    addWinToLeaderboard(playerName);
    setEntries(loadLeaderboard());
  };

  return { entries, registerWin };
};
