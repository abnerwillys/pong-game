import { useGameStats } from "@/contexts/GameStatsContext";
import { useGameSettings } from "@/contexts/GameSettingsContext";

import { GameCanvas } from "@/components/GameCanvas";
import { GameOverOverlay } from "@/components/GameOverOverlay";
import { LeaderboardOverlay } from "@/components/LeaderboardOverlay";

const App = () => {
  const { isGameOver } = useGameStats();
  const { isLeaderboardVisible } = useGameSettings();
  return (
    <div className="relative h-screen bg-gray-400 flex items-center justify-center">
      <GameCanvas />
      {isGameOver && <GameOverOverlay />}
      {isLeaderboardVisible && <LeaderboardOverlay />}
    </div>
  );
};

export default App;
