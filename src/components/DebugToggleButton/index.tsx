import { Bug } from "lucide-react";

interface IDebugToggleButtonProps {
  onClick: () => void;
  isActive: boolean;
}

export const DebugToggleButton = ({
  onClick,
  isActive,
}: IDebugToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded shadow-md 
      ${
        isActive ? "bg-green-600" : "bg-gray-700"
      } hover:bg-opacity-80 text-white`}
    >
      <Bug size={18} />
      <span className="text-sm font-medium">
        Debug
        <kbd className="ml-2 border px-1 text-xs rounded bg-white/10">D</kbd>
      </span>
    </button>
  );
};
