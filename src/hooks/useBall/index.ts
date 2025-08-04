import { useCallback, useEffect, useRef, useState } from "react";
import type { BallT, PaddlesT } from "@/types";
import {
  BALL_INITIAL_SPEED_X,
  BALL_INITIAL_SPEED_Y,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "@/constants/config";
import { verifyPaddlesCollision, verifyWallCollision } from "./physics";
import { useGameSettings } from "@/contexts/GameSettingsContext";
import type { PlayerSideT } from "@/contexts/GameStatsContext";

interface IUseBallParams {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  paddles: PaddlesT;
  onScore: (side: PlayerSideT) => void;
}

const resetBallState = (serveTo: PlayerSideT): BallT => ({
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2,
  velocityX: serveTo === "left" ? -BALL_INITIAL_SPEED_X : BALL_INITIAL_SPEED_X,
  velocityY: BALL_INITIAL_SPEED_Y,
});

const serveTowardConcedingSide = (scorer: PlayerSideT): PlayerSideT =>
  scorer === "right" ? "left" : "right";

export const useBall = ({ canvasRef, paddles, onScore }: IUseBallParams) => {
  const { isDynamicBounceEnabled } = useGameSettings();

  const [ball, setBall] = useState<BallT>(resetBallState("right"));

  const isPausedRef = useRef(false);
  const hasScoredRef = useRef(false);
  const scoredSideRef = useRef<PlayerSideT | null>(null);

  const pauseBall = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resumeBall = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const handleBallReset = useCallback((serveTo: PlayerSideT = "right") => {
    hasScoredRef.current = false;
    scoredSideRef.current = null;
    setBall(resetBallState(serveTo));
  }, []);

  const handleBallUpdate = useCallback(
    (delta: number) => {
      if (isPausedRef.current) return;

      setBall((prevBall) => {
        const canvas = canvasRef.current;
        if (!canvas) return prevBall;

        let { x, y, velocityX, velocityY } = prevBall;

        x += velocityX * delta;
        y += velocityY * delta;

        ({ y, velocityY } = verifyWallCollision(y, velocityY));
        ({ x, velocityX, velocityY } = verifyPaddlesCollision(
          x,
          y,
          velocityX,
          velocityY,
          paddles,
          isDynamicBounceEnabled
        ));

        if (!hasScoredRef.current) {
          if (x < 0) {
            hasScoredRef.current = true;
            scoredSideRef.current = "right";
          } else if (x > CANVAS_WIDTH) {
            hasScoredRef.current = true;
            scoredSideRef.current = "left";
          }
        }

        return { x, y, velocityX, velocityY };
      });
    },
    [canvasRef, isDynamicBounceEnabled, paddles]
  );

  /* Run once per score */
  useEffect(() => {
    if (hasScoredRef.current && scoredSideRef.current) {
      const scoringSide = scoredSideRef.current;

      /* Clear flags first so this effect doesn't re-run.
       * Otherwise, it will bug increasing score infinitely.
       */
      hasScoredRef.current = false;
      scoredSideRef.current = null;

      /* Pause + center ball (serve toward conceding side). */
      pauseBall();
      handleBallReset(serveTowardConcedingSide(scoringSide));

      /* Notify outside world. */
      onScore(scoringSide);
    }
  }, [onScore, pauseBall, handleBallReset]);

  return {
    ball,
    handleBallUpdate,
    handleBallReset,
    pauseBall,
    resumeBall,
  };
};
