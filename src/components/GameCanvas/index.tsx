import { useRef, useState } from "react";
import { useBall } from "@/hooks/useBall";
import { usePaddles } from "@/hooks/usePaddles";
import { useGameLoop } from "@/hooks/useGameLoop";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/constants/config";
import { useCanvasRenderer } from "@/hooks/useCanvasRenderer";
import { useGameReset } from "@/hooks/useGameReset";
import { DebugBox } from "../DebugBox";
import { ResetButton } from "../ResetButton";
import { SettingsDropdown } from "../SettingsDropdown";
import { useGameSettings } from "@/contexts/GameSettingsContext";
import { useGameShortcuts } from "@/hooks/useGameShortcuts";
import { GameScore } from "../GameScore";
import { useGameStats } from "@/contexts/GameStatsContext";

export const GameCanvas = () => {
  const { incrementScore } = useGameStats();
  const { isDebugInfoVisible } = useGameSettings();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [deltaTime, setDeltaTime] = useState(0);

  const { paddles, handlePaddlesUpdate, handlePaddlesReset } = usePaddles();

  const { ball, handleBallUpdate, handleBallReset, resumeBall } = useBall({
    canvasRef,
    paddles,
    onScore: (side) => {
      incrementScore(side);
      /* Pause & center already done inside useBall effect. */
      setTimeout(() => {
        resumeBall(); /* after 3s countdown UI */
      }, 3000);
    },
  });

  const { handleResetGame } = useGameReset({
    handlePaddlesReset,
    handleBallReset,
  });

  useGameLoop((delta) => {
    setDeltaTime(delta);
    handlePaddlesUpdate(delta);
    handleBallUpdate(delta);
  });

  useCanvasRenderer({ canvasRef, ball, paddles });
  useGameShortcuts({ handleResetGame });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative w-full max-w-[900px] h-full flex flex-col justify-center items-center">
        <GameScore />

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <ResetButton onClick={handleResetGame} />
          <SettingsDropdown />
        </div>

        {isDebugInfoVisible && (
          <DebugBox ball={ball} paddles={paddles} deltaTime={deltaTime} />
        )}

        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="mt-16 bg-black border-4 border-white rounded"
        />
      </div>
    </div>
  );
};
