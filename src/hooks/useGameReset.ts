import { useCallback } from "react";

interface IUseGameResetParams {
  handleOpenForInitialStart: () => void;
  handlePaddlesReset: () => void;
  handleBallReset: () => void;
  handleScoreReset: () => void;
}

export const useGameReset = ({
  handleOpenForInitialStart,
  handlePaddlesReset,
  handleBallReset,
  handleScoreReset,
}: IUseGameResetParams) => {
  const handleResetGame = useCallback(() => {
    handleOpenForInitialStart();
    handlePaddlesReset();
    handleBallReset();
    handleScoreReset();
  }, [
    handleOpenForInitialStart,
    handlePaddlesReset,
    handleBallReset,
    handleScoreReset,
  ]);

  return { handleResetGame };
};
