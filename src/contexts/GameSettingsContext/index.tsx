import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";

interface IGameSettingsContextData {
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
  const [isDebugInfoVisible, setIsDebugInfoVisible] = useState(false);
  const [isBallTrailEnabled, setIsBallTrailEnabled] = useState(false);
  const [isDynamicBounceEnabled, setIsDynamicBounceEnabled] = useState(true);

  const value = useMemo(
    () => ({
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
