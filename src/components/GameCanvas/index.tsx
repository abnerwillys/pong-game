import { useEffect, useRef, useState } from "react";
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
import { useServeController } from "@/hooks/useServeController";
import { ServeOverlay } from "../ServeOverlay";

export const GameCanvas = () => {
  const { incrementScore } = useGameStats();
  const { isDebugInfoVisible } = useGameSettings();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [deltaTime, setDeltaTime] = useState(0);

  const { paddles, handlePaddlesUpdate, handlePaddlesReset } = usePaddles();

  const { ball, handleBallUpdate, handleBallReset, pauseBall, resumeBall } =
    useBall({
      canvasRef,
      paddles,
      onScore: (side) => {
        incrementScore(side);
        /* useBall already paused & centered toward conceding side. */
        handleOpenForNextTurn();
      },
    });

  const {
    isOverlayVisible,
    label,
    countdown,
    handleBeginCountdown,
    handleBeginCountdownByShortcut,
    handleOpenForInitialStart,
    handleOpenForNextTurn,
  } = useServeController({ pauseBall, resumeBall, handleBallReset });

  const { handleResetGame } = useGameReset({
    handlePaddlesReset,
    handleBallReset,
  });

  useEffect(() => {
    /* On first render: ServeOverlay opens with 'Start', ball paused & centered */
    handleOpenForInitialStart();
  }, [handleOpenForInitialStart]);

  useGameLoop((delta) => {
    setDeltaTime(delta);
    handlePaddlesUpdate(delta);
    handleBallUpdate(delta);
  });

  useCanvasRenderer({ canvasRef, ball, paddles });
  useGameShortcuts({ handleResetGame, handleBeginCountdownByShortcut });

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

        <ServeOverlay
          visible={isOverlayVisible}
          label={label}
          countdown={countdown}
          onStart={handleBeginCountdown}
        />

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
