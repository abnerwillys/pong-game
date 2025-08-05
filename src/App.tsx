import { useGameStats } from "@/contexts/GameStatsContext";
import { useGameSettings } from "@/contexts/GameSettingsContext";

import { GameCanvas } from "@/components/GameCanvas";
import { GameOverOverlay } from "@/components/GameOverOverlay";
import { LeaderboardOverlay } from "@/components/LeaderboardOverlay";

const App = () => {
  const { isGameOver } = useGameStats();
  const { isLeaderboardVisible } = useGameSettings();
  return (
    <div className="h-screen bg-gray-400 flex items-center justify-center overflow-y-auto">
      <GameCanvas />
      {isGameOver && <GameOverOverlay />}
      {isLeaderboardVisible && <LeaderboardOverlay />}
    </div>
  );
};

export default App;
