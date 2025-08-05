import { useCallback, useEffect, useRef } from "react";
import type { BallT } from "@/types";
import { useGameSettings } from "@/contexts/GameSettingsContext";

export const useBallTrail = (ball: BallT, isEnabled: boolean) => {
  const { theme } = useGameSettings();
  const ballTrailRef = useRef<BallT[]>([]);
  const frameCountRef = useRef(0);

  const handleBallTrailReset = useCallback(() => {
    ballTrailRef.current = [];
    frameCountRef.current = 0;
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      ballTrailRef.current = [];
      return;
    }

    const { x, y } = ball;
    const spacing = theme.trail.spacing;
    const maxLength = theme.trail.length;

    frameCountRef.current += 1;

    if (frameCountRef.current >= spacing) {
      ballTrailRef.current.push({ x, y, velocityX: 0, velocityY: 0 });
      frameCountRef.current = 0;
    }

    if (ballTrailRef.current.length > maxLength) {
      ballTrailRef.current.shift(); /* Remove oldest */
    }
  }, [ball, isEnabled, theme.trail.length, theme.trail.spacing]);

  return { ballTrailRef, handleBallTrailReset };
};
