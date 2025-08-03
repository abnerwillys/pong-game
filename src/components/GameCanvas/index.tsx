import { useRef } from "react";
import { useBall } from "../../hooks/useBall";
import { usePaddles } from "../../hooks/usePaddles";
import { useGameLoop } from "../../hooks/useGameLoop";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../constants/config";
import { useCanvasRenderer } from "../../hooks/useCanvasRenderer";

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { paddles, handlePaddlesUpdate } = usePaddles();
  const { ball, handleBallUpdate } = useBall({ canvasRef, paddles });

  useGameLoop((delta) => {
    handlePaddlesUpdate(delta);
    handleBallUpdate(delta);
  });

  useCanvasRenderer({ canvasRef, ball, paddles });

  return (
    <div className="flex justify-center items-center h-full">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="bg-black border-4 border-white rounded"
      />
    </div>
  );
};
