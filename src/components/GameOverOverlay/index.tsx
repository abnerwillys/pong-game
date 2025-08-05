import { Button } from "@/components/ui/button";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";
import { useGameSettings } from "@/contexts/GameSettingsContext";
import { useGameStats } from "@/contexts/GameStatsContext";
import { Trophy } from "lucide-react";

export const GameOverOverlay = () => {
  const { player1Name, player2Name } = useGameSettings();
  const { winner, handleStatsReset } = useGameStats();
  const winnerName = winner === "left" ? player1Name : player2Name;

  return (
    <div className="absolute inset-0 bg-black/70 z-30 flex flex-col items-center justify-center text-white">
      <Trophy className="w-20 h-20 text-amber-400 mb-4" />
      <h1 className="text-4xl font-bold mb-2">🏆 {winnerName} Wins!</h1>
      <Button
        variant="secondary"
        onClick={handleStatsReset}
        className="cursor-pointer"
      >
        Play Again
        <kbd className="ml-3 border px-1 text-xs rounded bg-white/10">
          {SHORTCUT_KEYS.START_PLAY_AGAIN.toUpperCase()}
        </kbd>
      </Button>
    </div>
  );
};
