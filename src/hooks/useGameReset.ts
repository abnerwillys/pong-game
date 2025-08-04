import { useCallback } from "react";

interface IUseGameResetParams {
  handlePaddlesReset: () => void;
  handleBallReset: () => void;
}

export const useGameReset = ({
  handlePaddlesReset,
  handleBallReset,
}: IUseGameResetParams) => {
  const handleResetGame = useCallback(() => {
    handlePaddlesReset();
    handleBallReset();
  }, [handlePaddlesReset, handleBallReset]);

  return { handleResetGame };
};
