import { MAX_SCORE } from "@/constants/config";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useGameSettings } from "../GameSettingsContext";

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
  const { player1Name, player2Name } = useGameSettings();
  const { registerWin } = useLeaderboard();

  const [score, setScore] = useState({ left: 0, right: 0 });
  const [isGameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<PlayerSideT | null>(null);
  const hasRegisteredWinRef = useRef(false);

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
    hasRegisteredWinRef.current = false;
  }, []);

  useEffect(() => {
    if (!winner || hasRegisteredWinRef.current) return;

    if (winner === "left") {
      registerWin(player1Name);
    } else if (winner === "right") {
      registerWin(player2Name);
    }

    hasRegisteredWinRef.current = true;
  }, [player1Name, player2Name, registerWin, winner]);

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
