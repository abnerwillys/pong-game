import { useCallback } from "react";

interface IUseGameResetParams {
  handleOpenForInitialStart: () => void;
  handleBallReset: () => void;
  handlePaddlesReset: () => void;
  handleStatsReset: () => void;
}

export const useGameReset = ({
  handleOpenForInitialStart,
  handleBallReset,
  handlePaddlesReset,
  handleStatsReset,
}: IUseGameResetParams) => {
  const handleResetGame = useCallback(() => {
    handleOpenForInitialStart();
    handleBallReset();
    handlePaddlesReset();
    handleStatsReset();
  }, [
    handleOpenForInitialStart,
    handleBallReset,
    handlePaddlesReset,
    handleStatsReset,
  ]);

  return { handleResetGame };
};
