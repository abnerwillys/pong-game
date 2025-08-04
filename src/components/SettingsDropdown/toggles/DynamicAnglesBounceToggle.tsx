import { TriangleDashed } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";

interface IDynamicAnglesBounceToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const DynamicAnglesBounceToggle = ({
  checked,
  onChange,
}: IDynamicAnglesBounceToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm flex items-center gap-1">
        <TriangleDashed size={14} className="mr-1" /> Dynamic Angles Bounce
        <kbd className="ml-2 border px-1 text-xs rounded bg-white/10">
          {SHORTCUT_KEYS.DYNAMIC_BOUNCE.toUpperCase()}
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
