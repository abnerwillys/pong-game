import { useGameLoop } from "./useGameLoop";
import { useInputTracker } from "@/contexts/InputTrackerContext";
import { useGameSettings } from "@/contexts/GameSettingsContext";
import { SHORTCUT_KEYS, type ShortcutKeyT } from "@/constants/shortcuts";
import { useGameStats } from "@/contexts/GameStatsContext";

/** Avoid toggles triggering when a text field (or other input) is focused for some reason. */
const preventKeyEvents = () => {
  return (
    document.activeElement &&
    document.activeElement instanceof HTMLElement &&
    document.activeElement.isContentEditable
  );
};

type ShortcutEntryT = { key: ShortcutKeyT; action: () => void };

interface IUseGameShortcutsParams {
  handleResetGame: () => void;
  handleBeginCountdownByShortcut: () => void;
}

export const useGameShortcuts = ({
  handleResetGame,
  handleBeginCountdownByShortcut,
}: IUseGameShortcutsParams) => {
  const keysPressed = useInputTracker();
  const { isGameOver, handleStatsReset } = useGameStats();
  const {
    setIsSettingsOpen,
    setIsDebugInfoVisible,
    setIsBallTrailEnabled,
    setIsDynamicBounceEnabled,
  } = useGameSettings();

  const shortcutMap: ShortcutEntryT[] = [
    { key: SHORTCUT_KEYS.RESET, action: () => handleResetGame() },
    {
      key: SHORTCUT_KEYS.SETTINGS,
      action: () => setIsSettingsOpen((prev) => !prev),
    },
    {
      key: SHORTCUT_KEYS.BALL_TRAIL,
      action: () => setIsBallTrailEnabled((prev) => !prev),
    },
    {
      key: SHORTCUT_KEYS.DYNAMIC_BOUNCE,
      action: () => setIsDynamicBounceEnabled((prev) => !prev),
    },
    {
      key: SHORTCUT_KEYS.DEBUG_INFO,
      action: () => setIsDebugInfoVisible((prev) => !prev),
    },
    {
      key: SHORTCUT_KEYS.START_PLAY_AGAIN,
      action: () => {
        if (isGameOver) {
          handleStatsReset();
        }
        handleBeginCountdownByShortcut();
      },
    },
  ];

  useGameLoop(() => {
    if (preventKeyEvents()) return;

    for (const { key, action } of shortcutMap) {
      if (keysPressed.current[key]) {
        action();

        /* debounce it. It will trigger only once per frame */
        keysPressed.current[key] = false;
      }
    }
  });
};
