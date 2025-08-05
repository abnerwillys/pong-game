import { useCallback, useEffect, useState } from "react";
import { PADDLE_WIDTH, PADDLE_SPEED, CANVAS_HEIGHT } from "../constants/config";
import type { PaddlesT } from "../types";
import { CONTROL_KEYS } from "@/constants/shortcuts";
import { useInputTracker } from "@/contexts/InputTrackerContext";
import { useGameSettings } from "@/contexts/GameSettingsContext";

export const usePaddles = () => {
  const keysPressedRef = useInputTracker();
  const { difficultyConfig } = useGameSettings();

  const [paddles, setPaddles] = useState<PaddlesT>({
    leftY: (CANVAS_HEIGHT - difficultyConfig.paddleHeight) / 2,
    rightY: (CANVAS_HEIGHT - difficultyConfig.paddleHeight) / 2,
    width: PADDLE_WIDTH,
    height: difficultyConfig.paddleHeight,
  });

  useEffect(() => {
    setPaddles((prev) => ({
      ...prev,
      height: difficultyConfig.paddleHeight,
      leftY: (CANVAS_HEIGHT - difficultyConfig.paddleHeight) / 2,
      rightY: (CANVAS_HEIGHT - difficultyConfig.paddleHeight) / 2,
    }));
  }, [difficultyConfig.paddleHeight]);

  const handlePaddlesUpdate = useCallback(
    (delta: number) => {
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

        const maxY = CANVAS_HEIGHT - difficultyConfig.paddleHeight;

        return {
          ...prev,
          leftY: Math.max(0, Math.min(maxY, leftY)),
          rightY: Math.max(0, Math.min(maxY, rightY)),
        };
      });
    },
    [difficultyConfig.paddleHeight, keysPressedRef]
  );

  const handlePaddlesReset = useCallback(() => {
    setPaddles((prev) => ({
      ...prev,
      leftY: (CANVAS_HEIGHT - prev.height) / 2,
      rightY: (CANVAS_HEIGHT - prev.height) / 2,
    }));
  }, []);

  return { paddles, handlePaddlesUpdate, handlePaddlesReset };
};
