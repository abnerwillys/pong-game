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
  handleScoreReset: () => void;
}

const GameStatsContext = createContext<IGameStatsContextData | null>(null);

export const GameStatsProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState({ left: 0, right: 0 });

  const handleScoreIncrement = useCallback((side: PlayerSideT) => {
    setScore((prev) => ({
      ...prev,
      [side]: prev[side] + 1,
    }));
  }, []);

  const handleScoreReset = useCallback(
    () => setScore({ left: 0, right: 0 }),
    []
  );

  const value = useMemo(
    () => ({ score, handleScoreIncrement, handleScoreReset }),
    [handleScoreIncrement, handleScoreReset, score]
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
