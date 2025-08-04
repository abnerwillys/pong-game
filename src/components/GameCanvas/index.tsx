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

export const GameCanvas = () => {
  const { isDebugInfoVisible } = useGameSettings();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [deltaTime, setDeltaTime] = useState(0);

  const { paddles, handlePaddlesUpdate, handlePaddlesReset } = usePaddles();

  const { ball, handleBallUpdate, handleBallReset } = useBall({
    canvasRef,
    paddles,
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
      <div className="relative w-full max-w-[900px] h-full flex justify-center items-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="bg-black border-4 border-white rounded"
        />

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <ResetButton onClick={handleResetGame} />
          <SettingsDropdown />
        </div>

        {isDebugInfoVisible && (
          <DebugBox ball={ball} paddles={paddles} deltaTime={deltaTime} />
        )}
      </div>
    </div>
  );
};
