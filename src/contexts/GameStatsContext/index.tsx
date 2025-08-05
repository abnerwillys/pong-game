import { MAX_SCORE } from "@/constants/config";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PlayerSideT = "left" | "right";

interface IGameStatsContextData {
  score: { left: number; right: number };
  handleScoreIncrement: (side: PlayerSideT) => void;
  handleStatsReset: () => void;
  isGameOver: boolean;
  winner: PlayerSideT | null;
}

const GameStatsContext = createContext<IGameStatsContextData | null>(null);

export const GameStatsProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState({ left: 0, right: 0 });
  const [isGameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<PlayerSideT | null>(null);

  const handleScoreIncrement = useCallback((side: PlayerSideT) => {
    setScore((prev) => {
      const updated = { ...prev, [side]: prev[side] + 1 };
      if (updated[side] >= MAX_SCORE) {
        setGameOver(true);
        setWinner(side);
      }
      return updated;
    });
  }, []);

  const handleStatsReset = useCallback(() => {
    setScore({ left: 0, right: 0 });
    setGameOver(false);
    setWinner(null);
  }, []);

  const value = useMemo(
    () => ({
      score,
      handleScoreIncrement,
      handleStatsReset,
      isGameOver,
      winner,
    }),
    [handleScoreIncrement, handleStatsReset, isGameOver, score, winner]
  );

  return (
    <GameStatsContext.Provider value={value}>
      {children}
    </GameStatsContext.Provider>
  );
};

export const useGameStats = () => {
  const ctx = useContext(GameStatsContext);
  if (!ctx) throw new Error("useGameStats must be used within provider");
  return ctx;
};
