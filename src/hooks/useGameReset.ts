import { useCallback } from "react";
import { useDebouncedKeyPress } from "./useDebouncedKeyPress";

interface IUseGameResetParams {
  keysPressed: React.RefObject<Record<string, boolean>>;
  handlePaddlesReset: () => void;
  handleBallReset: () => void;
}

export const useGameReset = ({
  keysPressed,
  handlePaddlesReset,
  handleBallReset,
}: IUseGameResetParams) => {
  const handleResetGame = useCallback(() => {
    handlePaddlesReset();
    handleBallReset();
  }, [handlePaddlesReset, handleBallReset]);

  useDebouncedKeyPress(keysPressed, "r", handleResetGame, 400);

  return { handleResetGame };
};
