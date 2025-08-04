import { Bug } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";

interface IDebugInfoToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const DebugInfoToggle = ({
  checked,
  onChange,
}: IDebugInfoToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm flex items-center gap-1">
        <Bug size={14} className="mr-1" /> Debug
        <kbd className="ml-2 border px-1 text-xs rounded bg-white/10">
          {SHORTCUT_KEYS.DEBUG_INFO.toUpperCase()}
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
