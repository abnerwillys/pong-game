import { useGameStats } from "@/contexts/GameStatsContext";
import NumberFlow from "@number-flow/react";

export const GameScore = () => {
  const { score } = useGameStats();

  return (
    <div className="flex justify-center items-center text-white text-3xl font-bold mb-4">
      <span className="mr-3">
        <NumberFlow value={score.left} />
      </span>
      <span className="mr-8">🏓</span>
      <span className="mr-8">x</span>
      <span className="mr-3">🏓</span>
      <span>
        <NumberFlow value={score.right} />
      </span>
    </div>
  );
};
