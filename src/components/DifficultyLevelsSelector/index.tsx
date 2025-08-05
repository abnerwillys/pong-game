import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DIFFICULTY_LEVELS, type DifficultyLevelT } from "@/constants/levels";
import { useGameSettings } from "@/contexts/GameSettingsContext";

export const DifficultyLevelsSelector = () => {
  const { difficulty, changeDifficulty, theme } = useGameSettings();

  return (
    <div className="flex flex-col items-start text-white gap-2">
      <span className="text-xs text-white/70 uppercase tracking-wide">
        Difficulty / Level
      </span>

      <ToggleGroup
        type="single"
        value={difficulty}
        onValueChange={(value) => {
          if (value) changeDifficulty(value as DifficultyLevelT);
        }}
        className="rounded-md border border-white/20 overflow-hidden"
      >
        {DIFFICULTY_LEVELS.map((level) => {
          const isActive = level === difficulty;
          return (
            <ToggleGroupItem
              key={level}
              value={level}
              style={
                isActive
                  ? {
                      backgroundColor: theme.ball.color,
                      color: "white",
                    }
                  : undefined
              }
              className={`capitalize px-4 py-1 cursor-pointer text-sm transition-colors
                ${
                  !isActive
                    ? "bg-white text-black hover:bg-gray-100 hover:text-black"
                    : ""
                }
              `}
            >
              {level}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
};
