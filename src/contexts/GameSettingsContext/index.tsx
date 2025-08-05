import { INITIAL_GAME_THEME, type GameThemeT } from "@/constants/theme";
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
}

const GameSettingsContext = createContext<IGameSettingsContextData | null>(
  null
);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [isBallTrailEnabled, setIsBallTrailEnabled] = useState(true);
  const [isDynamicBounceEnabled, setIsDynamicBounceEnabled] = useState(true);
  const [isDebugInfoVisible, setIsDebugInfoVisible] = useState(false);

  const theme = INITIAL_GAME_THEME;

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
    }),
    [
      theme,
      isBallTrailEnabled,
      isDebugInfoVisible,
      isDynamicBounceEnabled,
      isSettingsOpen,
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
