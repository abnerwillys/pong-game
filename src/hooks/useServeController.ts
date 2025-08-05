import { useCallback, useEffect, useRef, useState } from "react";
import { useGameStats, type PlayerSideT } from "@/contexts/GameStatsContext";

interface IUseServeControllerParams {
  pauseBall: () => void;
  resumeBall: () => void;
  handleBallReset: (serveTo?: PlayerSideT) => void;
}

export type ServeLabelT = "Start" | "Next Turn";
export type CountdownT = number | "GO!" | null;

export const useServeController = ({
  pauseBall,
  resumeBall,
  handleBallReset,
}: IUseServeControllerParams) => {
  const { isGameOver } = useGameStats();

  const [serveTo, setServeTo] = useState<PlayerSideT>("right");
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [label, setLabel] = useState<ServeLabelT>("Start");
  const [countdown, setCountdown] = useState<CountdownT>(null);
  const isCountingRef = useRef(false);

  /* Call on initial mount(or in future after the game ends) to present "Start" */
  const handleOpenForInitialStart = useCallback(() => {
    pauseBall();
    handleBallReset("right");
    setServeTo("right");
    setLabel("Start");
    setIsOverlayVisible(true);
  }, [handleBallReset, pauseBall]);

  /* Call after a score to present "Next Turn" */
  const handleOpenForNextTurn = useCallback(() => {
    const next: PlayerSideT = Math.random() < 0.5 ? "left" : "right";
    handleBallReset(next);
    setServeTo(next);
    setLabel("Next Turn");
    setIsOverlayVisible(true);
  }, [handleBallReset]);

  const handleBeginCountdown = useCallback(
    (overwriteGameOver = false) => {
      if (isGameOver && !overwriteGameOver) return;
      if (isCountingRef.current) return;
      isCountingRef.current = true;

      let n = 3;
      setCountdown(n);

      const intervalId = setInterval(() => {
        if (!isCountingRef.current) {
          clearInterval(intervalId);
          return;
        }

        n -= 1;
        if (n >= 1) {
          setCountdown(n);
        } else {
          setCountdown("GO!");
          clearInterval(intervalId);

          setTimeout(() => {
            setCountdown(null);
            isCountingRef.current = false;
            setIsOverlayVisible(false);
            resumeBall();
          }, 1200);
        }
      }, 800);
    },
    [isGameOver, resumeBall]
  );

  const handleBeginCountdownByShortcut = useCallback(
    (overwriteGameOver = false) => {
      if (isGameOver && !overwriteGameOver) return;
      if (!isOverlayVisible) return;
      handleBeginCountdown(overwriteGameOver);
    },
    [handleBeginCountdown, isGameOver, isOverlayVisible]
  );

  /* Ensure clearInterval runs also if component unmounts during countdown */
  useEffect(() => {
    return () => {
      isCountingRef.current = false;
    };
  }, []);

  return {
    isOverlayVisible,
    label,
    countdown,
    serveTo,
    handleBeginCountdown,
    handleBeginCountdownByShortcut,
    handleOpenForInitialStart,
    handleOpenForNextTurn,
  };
};
