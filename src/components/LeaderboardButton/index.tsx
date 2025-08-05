import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";
import { useGameSettings } from "@/contexts/GameSettingsContext";

export const LeaderboardButton = () => {
  const { setIsLeaderboardVisible } = useGameSettings();

  return (
    <Button
      onClick={() => setIsLeaderboardVisible(true)}
      className="bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
    >
      <Trophy size={18} />
      <span className="text-sm font-medium">
        Leaderboard
        <kbd className="ml-2 border px-1 text-xs rounded bg-white/10">
          {SHORTCUT_KEYS.LEADERBOARD.toUpperCase()}
        </kbd>
      </span>
    </Button>
  );
};
