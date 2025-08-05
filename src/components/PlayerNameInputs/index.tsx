import { useGameSettings } from "@/contexts/GameSettingsContext";
import { Pencil } from "lucide-react";

interface IInputWithIconProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon = ({ value, onChange }: IInputWithIconProps) => {
  return (
    <div className="relative w-32">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full rounded px-2 py-1 bg-white text-black text-center pr-6"
      />
      <div
        className="pointer-events-none absolute top-0 right-0 translate-x-1/2 -translate-y-1/2
                   h-5 w-5 bg-amber-600 text-white rounded-full flex items-center justify-center shadow"
        title="Editable name"
      >
        <Pencil size={10} />
      </div>
    </div>
  );
};

export const PlayerNameInputs = () => {
  const { player1Name, player2Name, setPlayer1Name, setPlayer2Name } =
    useGameSettings();

  return (
    <div className="my-2 flex flex-col items-center">
      <div className="flex items-center gap-4 px-2">
        <InputWithIcon
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
        />
        <span className="text-white text-lg">vs</span>
        <InputWithIcon
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
        />
      </div>
      <span
        className="text-sm text-white italic mt-1 text-center"
        style={{ letterSpacing: 0.3 }}
      >
        Edit names to save on leaderboard
      </span>
    </div>
  );
};
