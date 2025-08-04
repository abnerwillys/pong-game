import { useCallback } from "react";

interface IUseGameResetParams {
  handleOpenForInitialStart: () => void;
  handleBallReset: () => void;
  handlePaddlesReset: () => void;
  handleScoreReset: () => void;
}

export const useGameReset = ({
  handleOpenForInitialStart,
  handleBallReset,
  handlePaddlesReset,
  handleScoreReset,
}: IUseGameResetParams) => {
  const handleResetGame = useCallback(() => {
    handleOpenForInitialStart();
    handleBallReset();
    handlePaddlesReset();
    handleScoreReset();
  }, [
    handleOpenForInitialStart,
    handleBallReset,
    handlePaddlesReset,
    handleScoreReset,
  ]);

  return { handleResetGame };
};
