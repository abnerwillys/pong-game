import { useState } from "react";
import {
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_SPEED,
  CANVAS_HEIGHT,
} from "../constants/config";
import type { PaddlesT } from "../types";

interface IUsePaddlesParams {
  keysPressed: React.RefObject<Record<string, boolean>>;
}

export const usePaddles = ({ keysPressed }: IUsePaddlesParams) => {
  const [paddles, setPaddles] = useState<PaddlesT>({
    leftY: 150,
    rightY: 150,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
  });

  const handlePaddlesUpdate = (delta: number) => {
    setPaddles((prev) => {
      let { leftY, rightY } = prev;

      if (keysPressed.current["w"]) leftY -= PADDLE_SPEED * delta;
      if (keysPressed.current["s"]) leftY += PADDLE_SPEED * delta;

      if (keysPressed.current["ArrowUp"]) rightY -= PADDLE_SPEED * delta;
      if (keysPressed.current["ArrowDown"]) rightY += PADDLE_SPEED * delta;

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
