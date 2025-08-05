import { LOCALSTORAGE_DIFFICULTY_KEY } from "@/constants/keys";
import { DIFFICULTY_LEVELS, type DifficultyLevelT } from "@/constants/levels";
import { useCallback, useEffect, useState } from "react";

export const useDifficultyLevel = () => {
  const [difficulty, setDifficulty] = useState<DifficultyLevelT>("easy");

  useEffect(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_DIFFICULTY_KEY);
    if (saved && DIFFICULTY_LEVELS.includes(saved as DifficultyLevelT)) {
      setDifficulty(saved as DifficultyLevelT);
    }
  }, []);

  const changeDifficulty = useCallback((newLevel: DifficultyLevelT) => {
    setDifficulty(newLevel);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_DIFFICULTY_KEY, difficulty);
  }, [difficulty]);

  return { difficulty, changeDifficulty };
};
