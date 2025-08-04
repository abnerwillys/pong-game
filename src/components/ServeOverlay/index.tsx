import { Button } from "@/components/ui/button";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";
import type { PlayerSideT } from "@/contexts/GameStatsContext";
import type { CountdownT, ServeLabelT } from "@/hooks/useServeController";
import NumberFlow from "@number-flow/react";
import { ArrowRightToLine } from "lucide-react";
import { ArrowLeftToLine } from "lucide-react";

interface IServeOverlayProps {
  visible: boolean;
  label: ServeLabelT;
  countdown: CountdownT;
  serveTo: PlayerSideT;
  onStart: () => void;
}

export const ServeOverlay = ({
  visible,
  label,
  countdown,
  serveTo,
  onStart,
}: IServeOverlayProps) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
      {countdown ? (
        <div className="text-white font-bold text-6xl drop-shadow-lg select-none">
          {typeof countdown === "number" ? (
            <NumberFlow value={countdown} />
          ) : (
            <div key={countdown} className="animate-scaleSpring">
              <span className="text-white text-7xl tracking-widest font-extrabold">
                {countdown}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className="animate-scaleSpring flex items-center text-white text-lg font-mono mb-1">
            {serveTo === "right" ? (
              <>
                <span>Serving:</span>
                <span className="ml-3 text-amber-500 font-bold">Player 1</span>
                <span className="ml-3">
                  <ArrowRightToLine size={28} />
                </span>
              </>
            ) : (
              <>
                <span>
                  <ArrowLeftToLine size={28} />
                </span>
                <span className="ml-3">Serving:</span>
                <span className="ml-3">Player 2</span>
              </>
            )}
          </p>

          <Button
            onClick={onStart}
            className="gap-2 p-6 bg-amber-700 hover:bg-amber-600 text-2xl tracking-wide font-['Orbitron'] transition-colors duration-200 ease-in-out cursor-pointer"
          >
            <span className="flex items-center gap-1">
              {label}
              <kbd className="border px-1 text-xs rounded bg-white/10">
                {SHORTCUT_KEYS.START_SERVE.toUpperCase()}
              </kbd>
            </span>
          </Button>
          <p className="text-white/80 text-xs">Ball is paused in center</p>
        </div>
      )}
    </div>
  );
};
