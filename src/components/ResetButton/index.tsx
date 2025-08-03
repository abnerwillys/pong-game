import { RefreshCw } from "lucide-react";

interface IResetButtonProps {
  onClick: () => void;
}

export const ResetButton = ({ onClick }: IResetButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md cursor-pointer"
    >
      <RefreshCw size={18} />
      <span className="text-sm font-medium">
        Reset
        <kbd className="ml-2 border px-1 text-xs rounded bg-white/10">R</kbd>
      </span>
    </button>
  );
};
