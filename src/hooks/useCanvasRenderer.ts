import { useEffect } from "react";
import type { BallT, PaddlesT } from "@/types";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDLE_OFFSET_X,
  BALL_RADIUS,
} from "@/constants/config";
import type { GameThemeT } from "@/constants/theme";
import { useGameSettings } from "@/contexts/GameSettingsContext";

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
  const { theme } = useGameSettings();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    renderNet(ctx, theme);
    renderTableMidLine(ctx, theme);
    renderBallTrail(ctx, ballTrailRef, theme);
    renderBall(ctx, ball, theme);
    renderPaddles(ctx, paddles, theme);
  }, [ball, canvasRef, paddles, ballTrailRef, theme]);
};

const renderNet = (ctx: CanvasRenderingContext2D, theme: GameThemeT) => {
  const netX = CANVAS_WIDTH / 2;
  const segmentHeight = theme.net.segmentHeight;
  const segmentSpacing = theme.net.segmentSpacing;
  const netWidth = theme.net.width;

  ctx.fillStyle = theme.net.color;

  for (let y = 0; y < CANVAS_HEIGHT; y += segmentHeight + segmentSpacing) {
    ctx.fillRect(netX - netWidth / 2, y, netWidth, segmentHeight);
  }
};

const renderTableMidLine = (
  ctx: CanvasRenderingContext2D,
  theme: GameThemeT
) => {
  const midY = CANVAS_HEIGHT / 2;

  ctx.strokeStyle = theme.centerLine.color;
  ctx.lineWidth = theme.centerLine.width;

  ctx.beginPath();
  ctx.moveTo(0, midY);
  ctx.lineTo(CANVAS_WIDTH, midY);
  ctx.stroke();
};

const renderBall = (
  ctx: CanvasRenderingContext2D,
  ball: BallT,
  theme: GameThemeT
) => {
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = theme.ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  /* Reset shadow so it doesn't affect other elements */
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
};

const renderBallTrail = (
  ctx: CanvasRenderingContext2D,
  trailRef: React.RefObject<BallT[]> | undefined,
  theme: GameThemeT
) => {
  if (!trailRef?.current?.length) return;

  const opacity = theme.trail.opacity ?? 0.4;

  trailRef.current.forEach((pos, index) => {
    const alpha = (index + 1) / trailRef.current.length;
    ctx.globalAlpha = alpha * opacity;
    ctx.fillStyle = theme.ball.color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1; /* Reset after to avoid affect other elements */
  });
};

const renderPaddles = (
  ctx: CanvasRenderingContext2D,
  paddles: PaddlesT,
  theme: GameThemeT
) => {
  const radius = theme.paddles.borderRadius;

  const drawRoundedRectWithBorder = (
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string,
    borderColor: string
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  /* Left paddle */
  drawRoundedRectWithBorder(
    PADDLE_OFFSET_X,
    paddles.leftY,
    paddles.width,
    paddles.height,
    theme.paddles.left.fillColor,
    theme.paddles.left.borderColor
  );

  /* Right paddle */
  drawRoundedRectWithBorder(
    CANVAS_WIDTH - PADDLE_OFFSET_X - paddles.width,
    paddles.rightY,
    paddles.width,
    paddles.height,
    theme.paddles.right.fillColor,
    theme.paddles.right.borderColor
  );
};
