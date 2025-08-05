import { DIFFICULTY_CONFIG, type DifficultyLevelT } from "@/constants/levels";
import { INITIAL_GAME_THEME, type GameThemeT } from "@/constants/theme";
import { useDifficultyLevel } from "@/hooks/useDifficultyLevel";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";

interface IGameSettingsContextData {
  theme: GameThemeT;
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<React.SetStateAction<boolean>>;
  isDebugInfoVisible: boolean;
  setIsDebugInfoVisible: Dispatch<React.SetStateAction<boolean>>;
  isBallTrailEnabled: boolean;
  setIsBallTrailEnabled: Dispatch<React.SetStateAction<boolean>>;
  isDynamicBounceEnabled: boolean;
  setIsDynamicBounceEnabled: Dispatch<React.SetStateAction<boolean>>;
  player1Name: string;
  setPlayer1Name: Dispatch<React.SetStateAction<string>>;
  player2Name: string;
  setPlayer2Name: Dispatch<React.SetStateAction<string>>;
  isLeaderboardVisible: boolean;
  setIsLeaderboardVisible: Dispatch<React.SetStateAction<boolean>>;
  difficulty: DifficultyLevelT;
  difficultyConfig: (typeof DIFFICULTY_CONFIG)[DifficultyLevelT];
  changeDifficulty: (level: DifficultyLevelT) => void;
}

const GameSettingsContext = createContext<IGameSettingsContextData | null>(
  null
);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
  const { difficulty, changeDifficulty } = useDifficultyLevel();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [isBallTrailEnabled, setIsBallTrailEnabled] = useState(true);
  const [isDynamicBounceEnabled, setIsDynamicBounceEnabled] = useState(true);
  const [isDebugInfoVisible, setIsDebugInfoVisible] = useState(false);

  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);

  const theme = INITIAL_GAME_THEME;

  const difficultyConfig = useMemo(
    () => DIFFICULTY_CONFIG[difficulty],
    [difficulty]
  );

  const value = useMemo(
    () => ({
      theme,
      isSettingsOpen,
      setIsSettingsOpen,
      isDebugInfoVisible,
      setIsDebugInfoVisible,
      isBallTrailEnabled,
      setIsBallTrailEnabled,
      isDynamicBounceEnabled,
      setIsDynamicBounceEnabled,
      player1Name,
      player2Name,
      setPlayer1Name,
      setPlayer2Name,
      isLeaderboardVisible,
      setIsLeaderboardVisible,
      difficulty,
      difficultyConfig,
      changeDifficulty,
    }),
    [
      theme,
      isSettingsOpen,
      isDebugInfoVisible,
      isBallTrailEnabled,
      isDynamicBounceEnabled,
      player1Name,
      player2Name,
      isLeaderboardVisible,
      difficulty,
      difficultyConfig,
      changeDifficulty,
    ]
  );

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = (): IGameSettingsContextData => {
  const ctx = useContext(GameSettingsContext);
  if (!ctx) throw new Error("useGameSettings must be used within provider");
  return ctx;
};
