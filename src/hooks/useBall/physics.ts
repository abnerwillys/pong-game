import type { PaddlesT } from "../../types";
import {
  BALL_RADIUS,
  PADDLE_OFFSET_X,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "../../constants/config";

const isPaddleCollision = (
  ballX: number,
  ballY: number,
  paddleX: number,
  paddleY: number,
  paddleWidth: number,
  paddleHeight: number
): boolean => {
  return (
    ballX >= paddleX &&
    ballX <= paddleX + paddleWidth &&
    ballY >= paddleY &&
    ballY <= paddleY + paddleHeight
  );
};

const getVerticalDeflection = (
  ballY: number,
  paddleY: number,
  paddleHeight: number,
  factor: number = 0.3
): number => {
  const relativeIntersectY = ballY - (paddleY + paddleHeight / 2);
  const normalized = relativeIntersectY / (paddleHeight / 2);
  return normalized * factor;
};

const reflectBallHorizontally = (
  paddleX: number,
  paddleWidth: number,
  isLeftSide: boolean
): number => {
  return isLeftSide ? paddleX + paddleWidth : paddleX - 1;
};

export const verifyWallCollision = (y: number, velocityY: number) => {
  if (y - BALL_RADIUS <= 0 || y + BALL_RADIUS >= CANVAS_HEIGHT) {
    velocityY *= -1;
  }
  return { y, velocityY };
};

export const verifyPaddlesCollision = (
  x: number,
  y: number,
  velocityX: number,
  velocityY: number,
  paddles: PaddlesT
) => {
  const leftPaddleX = PADDLE_OFFSET_X;
  const rightPaddleX = CANVAS_WIDTH - PADDLE_OFFSET_X - paddles.width;

  /* Left paddle collision */
  if (
    velocityX < 0 &&
    isPaddleCollision(
      x,
      y,
      leftPaddleX,
      paddles.leftY,
      paddles.width,
      paddles.height
    )
  ) {
    velocityX *= -1;
    x = reflectBallHorizontally(leftPaddleX, paddles.width, true);
    velocityY += getVerticalDeflection(y, paddles.leftY, paddles.height);
  }

  /* Right paddle collision */
  if (
    velocityX > 0 &&
    isPaddleCollision(
      x,
      y,
      rightPaddleX,
      paddles.rightY,
      paddles.width,
      paddles.height
    )
  ) {
    velocityX *= -1;
    x = reflectBallHorizontally(rightPaddleX, paddles.width, false);
    velocityY += getVerticalDeflection(y, paddles.rightY, paddles.height);
  }

  return { x, velocityX, velocityY };
};
