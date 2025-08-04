import { Volleyball } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";

interface IBallTrailToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const BallTrailToggle = ({
  checked,
  onChange,
}: IBallTrailToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm flex items-center gap-1">
        <Volleyball size={14} className="mr-1" /> Ball Trail
        <kbd className="ml-2 border px-1 text-xs rounded bg-white/10">
          {SHORTCUT_KEYS.BALL_TRAIL.toUpperCase()}
        </kbd>
      </span>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="cursor-pointer"
      />
    </div>
  );
};
