import { useGameLoop } from "./useGameLoop";
import { useInputTracker } from "@/contexts/InputTrackerContext";
import { useGameSettings } from "@/contexts/GameSettingsContext";
import { SHORTCUT_KEYS, type ShortcutKeyT } from "@/constants/shortcuts";
import { useGameStats } from "@/contexts/GameStatsContext";
import { isUserTyping } from "@/utils/isUserTyping";
import { useCallback, useMemo } from "react";
import { DIFFICULTY_LEVELS } from "@/constants/levels";

type ShortcutEntryT = {
  key: ShortcutKeyT;
  action: () => void;
  prevent?: boolean;
};

interface IUseGameShortcutsParams {
  handleResetGame: () => void;
  handleBeginCountdownByShortcut: (overwriteGameOver?: boolean) => void;
}

export const useGameShortcuts = ({
  handleResetGame,
  handleBeginCountdownByShortcut,
}: IUseGameShortcutsParams) => {
  const keysPressedRef = useInputTracker();
  const { isGameOver, handleStatsReset } = useGameStats();
  const {
    isLeaderboardVisible,
    setIsSettingsOpen,
    setIsDebugInfoVisible,
    setIsBallTrailEnabled,
    setIsDynamicBounceEnabled,
    setIsLeaderboardVisible,
    difficulty,
    changeDifficulty,
  } = useGameSettings();

  const handleCycleDifficulty = useCallback(() => {
    const currentIndex = DIFFICULTY_LEVELS.indexOf(difficulty);
    const nextIndex = (currentIndex + 1) % DIFFICULTY_LEVELS.length;
    changeDifficulty(DIFFICULTY_LEVELS[nextIndex]);
  }, [changeDifficulty, difficulty]);

  const shortcutMap: ShortcutEntryT[] = useMemo(
    () => [
      {
        key: SHORTCUT_KEYS.RESET,
        action: () => handleResetGame(),
        prevent: isLeaderboardVisible || isGameOver,
      },
      {
        key: SHORTCUT_KEYS.SETTINGS,
        action: () => setIsSettingsOpen((prev) => !prev),
        prevent: isLeaderboardVisible || isGameOver,
      },
      {
        key: SHORTCUT_KEYS.BALL_TRAIL,
        action: () => setIsBallTrailEnabled((prev) => !prev),
        prevent: isLeaderboardVisible || isGameOver,
      },
      {
        key: SHORTCUT_KEYS.DYNAMIC_BOUNCE,
        action: () => setIsDynamicBounceEnabled((prev) => !prev),
        prevent: isLeaderboardVisible || isGameOver,
      },
      {
        key: SHORTCUT_KEYS.DEBUG_INFO,
        action: () => setIsDebugInfoVisible((prev) => !prev),
        prevent: isLeaderboardVisible || isGameOver,
      },
      {
        key: SHORTCUT_KEYS.START_PLAY_AGAIN,
        action: () => {
          if (isGameOver) {
            handleStatsReset();
          }
          handleBeginCountdownByShortcut(true);
          setIsLeaderboardVisible(false);
        },
        prevent: isLeaderboardVisible,
      },
      {
        key: SHORTCUT_KEYS.LEADERBOARD,
        action: () => setIsLeaderboardVisible((prev) => !prev),
      },
      {
        key: SHORTCUT_KEYS.DIFFICULTY_CYCLE,
        action: handleCycleDifficulty,
        prevent: isLeaderboardVisible || isGameOver,
      },
    ],
    [
      handleBeginCountdownByShortcut,
      handleCycleDifficulty,
      handleResetGame,
      handleStatsReset,
      isGameOver,
      isLeaderboardVisible,
      setIsBallTrailEnabled,
      setIsDebugInfoVisible,
      setIsDynamicBounceEnabled,
      setIsLeaderboardVisible,
      setIsSettingsOpen,
    ]
  );

  useGameLoop(() => {
    if (isUserTyping()) return;

    for (const { key, action, prevent } of shortcutMap) {
      if (prevent) continue;

      if (keysPressedRef.current[key]) {
        action();
        /* debounce it. It will trigger only once per frame */
        keysPressedRef.current[key] = false;
      }
    }
  });
};
