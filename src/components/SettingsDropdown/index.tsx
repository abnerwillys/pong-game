import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGameSettings } from "@/contexts/GameSettingsContext";
import {
  BallTrailToggle,
  DebugInfoToggle,
  DynamicAnglesBounceToggle,
} from "./toggles";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";

export const SettingsDropdown = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    isDebugInfoVisible,
    setIsDebugInfoVisible,
    isBallTrailEnabled,
    setIsBallTrailEnabled,
    isDynamicBounceEnabled,
    setIsDynamicBounceEnabled,
  } = useGameSettings();

  return (
    <DropdownMenu open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 cursor-pointer  pointer-events-auto"
        >
          <Settings size={18} />
          <span className="text-sm font-medium">
            Settings
            <kbd className="ml-2 border px-1 text-xs rounded bg-white/10">
              {SHORTCUT_KEYS.SETTINGS.toUpperCase()}
            </kbd>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 p-2 space-y-2"
        side="bottom"
        align="end"
      >
        <BallTrailToggle
          checked={isBallTrailEnabled}
          onChange={setIsBallTrailEnabled}
        />
        <DynamicAnglesBounceToggle
          checked={isDynamicBounceEnabled}
          onChange={setIsDynamicBounceEnabled}
        />
        <DebugInfoToggle
          checked={isDebugInfoVisible}
          onChange={setIsDebugInfoVisible}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
