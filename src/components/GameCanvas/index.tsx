import { useRef } from "react";
import { useBall } from "../../hooks/useBall";
import { usePaddles } from "../../hooks/usePaddles";
import { useGameLoop } from "../../hooks/useGameLoop";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../constants/config";
import { useCanvasRenderer } from "../../hooks/useCanvasRenderer";
import { ResetButton } from "../ResetButton";
import { useInputTracker } from "../../hooks/useInputTracker";
import { useGameReset } from "../../hooks/useGameReset";

export const GameCanvas = () => {
  const keysPressed = useInputTracker();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { paddles, handlePaddlesUpdate, handlePaddlesReset } = usePaddles({
    keysPressed,
  });

  const { ball, handleBallUpdate, handleBallReset } = useBall({
    canvasRef,
    paddles,
  });

  useGameLoop((delta) => {
    handlePaddlesUpdate(delta);
    handleBallUpdate(delta);
  });

  useCanvasRenderer({ canvasRef, ball, paddles });

  const { handleResetGame } = useGameReset({
    keysPressed,
    handlePaddlesReset,
    handleBallReset,
  });

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
        </div>
      </div>
    </div>
  );
};
