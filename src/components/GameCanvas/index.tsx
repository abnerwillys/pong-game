import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useGameStats } from "@/contexts/GameStatsContext";
import { useGameSettings } from "@/contexts/GameSettingsContext";

import { useBall } from "@/hooks/useBall";
import { usePaddles } from "@/hooks/usePaddles";
import { useGameLoop } from "@/hooks/useGameLoop";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/constants/config";
import { useCanvasRenderer } from "@/hooks/useCanvasRenderer";
import { useGameReset } from "@/hooks/useGameReset";
import { useGameShortcuts } from "@/hooks/useGameShortcuts";
import { useServeController } from "@/hooks/useServeController";
import { useBallTrail } from "@/hooks/useBallTrail";

import { GameScore } from "../GameScore";
import { DebugBox } from "../DebugBox";
import { ResetButton } from "../ResetButton";
import { SettingsDropdown } from "../SettingsDropdown";
import { ServeOverlay } from "../ServeOverlay";
import { PlayerNameInputs } from "../PlayerNameInputs";
import { LeaderboardButton } from "../LeaderboardButton";
import { DifficultyLevelsSelector } from "../DifficultyLevelsSelector";

export const GameCanvas = () => {
  const { handleScoreIncrement, handleStatsReset } = useGameStats();
  const { isDebugInfoVisible, isBallTrailEnabled, theme } = useGameSettings();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [deltaTime, setDeltaTime] = useState(0);

  const { paddles, handlePaddlesUpdate, handlePaddlesReset } = usePaddles();

  const { ball, handleBallUpdate, handleBallReset, pauseBall, resumeBall } =
    useBall({
      canvasRef,
      paddles,
      onScore: (side) => {
        handleScoreIncrement(side);
        /* useBall already paused & centered toward conceding side. */
        handleOpenForNextTurn();
        handleBallTrailReset();
      },
    });

  const { ballTrailRef, handleBallTrailReset } = useBallTrail(
    ball,
    isBallTrailEnabled
  );

  const {
    isOverlayVisible,
    label,
    countdown,
    serveTo,
    handleBeginCountdown,
    handleBeginCountdownByShortcut,
    handleOpenForInitialStart,
    handleOpenForNextTurn,
  } = useServeController({ pauseBall, resumeBall, handleBallReset });

  const { handleResetGame } = useGameReset({
    handleOpenForInitialStart,
    handleBallReset: (...args) => {
      /* Certify that clear trail only if ball resets. */
      handleBallTrailReset();
      handleBallReset(...args);
    },
    handlePaddlesReset,
    handleStatsReset,
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

  useCanvasRenderer({ canvasRef, ball, ballTrailRef, paddles });
  useGameShortcuts({ handleResetGame, handleBeginCountdownByShortcut });

  const overlayStyles: CSSProperties = {
    width: CANVAS_WIDTH + theme.table.borderWidth + theme.table.paddingBorder,
    height: CANVAS_HEIGHT + theme.table.borderWidth + theme.table.paddingBorder,
    boxSizing: "content-box",
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative w-full max-w-[900px] h-full flex flex-col justify-center items-center">
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <DifficultyLevelsSelector />
          <ResetButton onClick={handleResetGame} />
          <SettingsDropdown />
        </div>

        {isDebugInfoVisible && (
          <DebugBox ball={ball} paddles={paddles} deltaTime={deltaTime} />
        )}

        <GameScore />
        <PlayerNameInputs />
        <div className="my-3">
          <LeaderboardButton />
        </div>

        <div className="relative" style={overlayStyles}>
          <ServeOverlay
            visible={isOverlayVisible}
            label={label}
            countdown={countdown}
            serveTo={serveTo}
            onStart={handleBeginCountdown}
          />

          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{
              backgroundColor: theme.table.background,
              border: `${theme.table.borderWidth}px solid ${theme.table.borderColor}`,
              borderRadius: "0.2rem",
              boxShadow: `0 0 2px ${theme.table.paddingBorder}px ${theme.table.background}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
