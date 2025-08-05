import { GameCanvas } from "./components/GameCanvas";
import { GameOverOverlay } from "./components/GameOverOverlay";
import { useGameStats } from "@/contexts/GameStatsContext";

const App = () => {
  const { isGameOver } = useGameStats();
  return (
    <div className="relative h-screen bg-gray-400 flex items-center justify-center">
      <GameCanvas />
      {isGameOver && <GameOverOverlay />}
    </div>
  );
};

export default App;
