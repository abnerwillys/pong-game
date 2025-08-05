import { useGameSettings } from "@/contexts/GameSettingsContext";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Trophy, X } from "lucide-react";

export const LeaderboardOverlay = () => {
  const { entries } = useLeaderboard();
  const { setIsLeaderboardVisible } = useGameSettings();

  const sortedEntries = [...entries].sort((a, b) => b.wins - a.wins);

  return (
    <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-zinc-900 text-white w-full max-w-md rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-amber-400">
            <Trophy size={20} /> Leaderboard
          </h2>
          <button
            onClick={() => setIsLeaderboardVisible(false)}
            className="text-white/70 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto">
          <table className="w-full text-sm border-separate border-spacing-y-1">
            <thead className="text-amber-300 uppercase text-xs">
              <tr>
                <th className="text-left px-2">Player</th>
                <th className="text-right px-2">Wins</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center text-zinc-400 py-4">
                    No scores yet.
                  </td>
                </tr>
              ) : (
                sortedEntries.map(({ name, wins }) => (
                  <tr key={name}>
                    <td className="font-mono px-2 py-1">{name}</td>
                    <td className="text-right px-2 py-1">{wins}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
