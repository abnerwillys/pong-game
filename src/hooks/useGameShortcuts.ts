import { useGameLoop } from "./useGameLoop";
import { useInputTracker } from "@/contexts/InputTrackerContext";
import { useGameSettings } from "@/contexts/GameSettingsContext";
import { SHORTCUT_KEYS, type ShortcutKeyT } from "@/constants/shortcuts";

type ShortcutEntryT = { key: ShortcutKeyT; action: () => void };

interface IUseGameShortcutsParams {
  handleResetGame: () => void;
}

export const useGameShortcuts = ({
  handleResetGame,
}: IUseGameShortcutsParams) => {
  const keysPressed = useInputTracker();
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
  ];

  useGameLoop(() => {
    /* Avoid toggles triggering when a text field (or other input) is focused for some reason. */
    if (document.activeElement?.tagName === "INPUT") return;

    for (const { key, action } of shortcutMap) {
      if (keysPressed.current[key]) {
        action();

        /* debounce it. It will trigger only once per frame */
        keysPressed.current[key] = false;
      }
    }
  });
};
