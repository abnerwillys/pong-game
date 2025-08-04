import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";

interface IResetButtonProps {
  onClick: () => void;
}

export const ResetButton = ({ onClick }: IResetButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
    >
      <RefreshCw size={18} />
      <span className="text-sm font-medium">
        Reset
        <kbd className="ml-2 border px-1 text-xs rounded bg-white/10">
          {SHORTCUT_KEYS.RESET.toUpperCase()}
        </kbd>
      </span>
    </Button>
  );
};
