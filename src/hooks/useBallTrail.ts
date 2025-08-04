import { useCallback, useEffect, useRef } from "react";
import type { BallT } from "@/types";

const TRAIL_LENGTH = 20;

export const useBallTrail = (ball: BallT, isEnabled: boolean) => {
  const ballTrailRef = useRef<BallT[]>([]);

  const handleBallTrailReset = useCallback(() => {
    ballTrailRef.current = [];
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      ballTrailRef.current = [];
      return;
    }

    const { x, y } = ball;
    ballTrailRef.current.push({ x, y, velocityX: 0, velocityY: 0 });

    if (ballTrailRef.current.length > TRAIL_LENGTH) {
      ballTrailRef.current.shift(); // Remove oldest
    }
  }, [ball, isEnabled]);

  return { ballTrailRef, handleBallTrailReset };
};
