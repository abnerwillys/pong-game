import { useState } from "react";
import {
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_SPEED,
  CANVAS_HEIGHT,
} from "../constants/config";
import type { PaddlesT } from "../types";
import { CONTROL_KEYS } from "@/constants/shortcuts";
import { useInputTracker } from "@/contexts/InputTrackerContext";

export const usePaddles = () => {
  const keysPressedRef = useInputTracker();

  const [paddles, setPaddles] = useState<PaddlesT>({
    leftY: 150,
    rightY: 150,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
  });

  const handlePaddlesUpdate = (delta: number) => {
    setPaddles((prev) => {
      let { leftY, rightY } = prev;

      if (keysPressedRef.current[CONTROL_KEYS.LEFT_UP])
        leftY -= PADDLE_SPEED * delta;
      if (keysPressedRef.current[CONTROL_KEYS.LEFT_DOWN])
        leftY += PADDLE_SPEED * delta;

      if (keysPressedRef.current[CONTROL_KEYS.RIGHT_UP])
        rightY -= PADDLE_SPEED * delta;
      if (keysPressedRef.current[CONTROL_KEYS.RIGHT_DOWN])
        rightY += PADDLE_SPEED * delta;

      leftY = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, leftY));
      rightY = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, rightY));

      return { ...prev, leftY, rightY };
    });
  };

  const handlePaddlesReset = () => {
    setPaddles((prev) => ({
      ...prev,
      leftY: (CANVAS_HEIGHT - prev.height) / 2,
      rightY: (CANVAS_HEIGHT - prev.height) / 2,
    }));
  };

  return { paddles, handlePaddlesUpdate, handlePaddlesReset };
};
