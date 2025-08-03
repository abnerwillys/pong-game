import { useState } from "react";
import type { BallT, PaddlesT } from "../../types";
import {
  BALL_INITIAL_SPEED_X,
  BALL_INITIAL_SPEED_Y,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "../../constants/config";
import { verifyPaddlesCollision, verifyWallCollision } from "./physics";

interface IUseBallParams {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  paddles: PaddlesT;
}

export const useBall = ({ canvasRef, paddles }: IUseBallParams) => {
  const [ball, setBall] = useState<BallT>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    velocityX: BALL_INITIAL_SPEED_X,
    velocityY: BALL_INITIAL_SPEED_Y,
  });

  const handleBallUpdate = (delta: number) => {
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
        paddles
      ));

      return { x, y, velocityX, velocityY };
    });
  };

  return { ball, handleBallUpdate };
};
