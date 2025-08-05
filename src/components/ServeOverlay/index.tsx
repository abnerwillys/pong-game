import { Button } from "@/components/ui/button";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";
import { useGameSettings } from "@/contexts/GameSettingsContext";
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
  const { theme } = useGameSettings();
  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 rounded">
      {countdown ? (
        <div className="mb-auto mt-20 text-white font-bold text-8xl drop-shadow-lg select-none">
          {typeof countdown === "number" ? (
            <NumberFlow value={countdown} />
          ) : (
            <div key={countdown} className="animate-scaleSpring">
              <span
                className=" text-8xl tracking-widest font-extrabold"
                style={{ color: theme.ball.color }}
              >
                {countdown}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 pointer-events-auto">
          <p className="animate-scaleSpring flex items-center text-white text-3xl font-mono mb-3">
            {serveTo === "right" ? (
              <>
                <span>Serving:</span>
                <span className="ml-3" style={{ color: theme.ball.color }}>
                  Player 1
                </span>
                <span className="ml-3">
                  <ArrowRightToLine size={36} color={theme.ball.color} />
                </span>
              </>
            ) : (
              <>
                <span>
                  <ArrowLeftToLine size={36} color={theme.ball.color} />
                </span>
                <span className="ml-3">Serving:</span>
                <span className="ml-3" style={{ color: theme.ball.color }}>
                  Player 2
                </span>
              </>
            )}
          </p>

          <Button
            onClick={onStart}
            className="p-8 bg-amber-700 hover:bg-amber-600 text-4xl tracking-wide transition-colors duration-200 ease-in-out cursor-pointer"
          >
            <span className="flex items-center gap-1">
              {label}
              <kbd className="ml-3 border px-1 text-xs rounded bg-white/10">
                {SHORTCUT_KEYS.START_SERVE.toUpperCase()}
              </kbd>
            </span>
          </Button>
          <p className="text-white text-lg font-light">
            Ball is paused in center
          </p>
        </div>
      )}
    </div>
  );
};
