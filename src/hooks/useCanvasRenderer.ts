import { useEffect } from "react";
import type { BallT, PaddlesT } from "../types";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDLE_OFFSET_X,
  BALL_RADIUS,
} from "../constants/config";

interface IUseCanvasRendererParams {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  ball: BallT;
  paddles: PaddlesT;
}

export const useCanvasRenderer = ({
  canvasRef,
  ball,
  paddles,
}: IUseCanvasRendererParams) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Clear canvas */
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    /* Draw ball */
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    /* Draw paddles */
    ctx.fillStyle = "white";
    ctx.fillRect(PADDLE_OFFSET_X, paddles.leftY, paddles.width, paddles.height);
    ctx.fillRect(
      CANVAS_WIDTH - PADDLE_OFFSET_X - paddles.width,
      paddles.rightY,
      paddles.width,
      paddles.height
    );
  }, [ball, canvasRef, paddles]);
};
