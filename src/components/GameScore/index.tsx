import { useGameStats } from "@/contexts/GameStatsContext";
import NumberFlow from "@number-flow/react";

export const GameScore = () => {
  const { score } = useGameStats();

  return (
    <div className="mb-4 select-none">
      <div className="bg-amber-600 text-black rounded-lg px-24 py-6 flex flex-col items-center shadow-md border border-amber-700">
        <div className="flex justify-center items-center text-5xl font-bold ">
          <span className="mr-1">
            <NumberFlow value={score.left} />
          </span>
          <span className="mx-3">🏓</span>
          <span className="mx-8 text-4xl">x</span>
          <span className="mr-6">🏓</span>
          <span>
            <NumberFlow value={score.right} />
          </span>
        </div>

        <div className="mt-2 text-sm text-white font-mono flex flex-col gap-2 items-center leading-tight">
          <p>
            <span>Player 1 (Left):</span>
            <kbd className="ml-3 mr-3 px-1 border rounded bg-black/30">W</kbd>
            <span>/</span>
            <kbd className="ml-3 px-1 border rounded bg-black/30">S</kbd>
          </p>
          <p>
            <span>Player 2 (Right):</span>
            <kbd className="ml-3 mr-3 px-1 border rounded bg-black/30">↑</kbd>
            <span>/</span>
            <kbd className="ml-3 px-1 border rounded bg-black/30">↓</kbd>
          </p>
        </div>
      </div>
    </div>
  );
};
