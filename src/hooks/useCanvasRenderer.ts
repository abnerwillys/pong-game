import { useEffect } from "react";
import type { BallT, PaddlesT } from "@/types";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDLE_OFFSET_X,
  BALL_RADIUS,
} from "@/constants/config";

interface IUseCanvasRendererParams {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  ball: BallT;
  ballTrailRef?: React.RefObject<BallT[]>;
  paddles: PaddlesT;
}

export const useCanvasRenderer = ({
  canvasRef,
  ball,
  paddles,
  ballTrailRef,
}: IUseCanvasRendererParams) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    /* Ball */
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    /* Ball trail effect */
    if (ballTrailRef?.current?.length) {
      ballTrailRef.current.forEach((pos, index) => {
        const alpha = (index + 1) / ballTrailRef.current.length;
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    /* Paddles */
    ctx.fillStyle = "white";
    ctx.fillRect(PADDLE_OFFSET_X, paddles.leftY, paddles.width, paddles.height);
    ctx.fillRect(
      CANVAS_WIDTH - PADDLE_OFFSET_X - paddles.width,
      paddles.rightY,
      paddles.width,
      paddles.height
    );
  }, [ball, canvasRef, paddles, ballTrailRef]);
};
