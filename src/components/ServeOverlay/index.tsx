import { Button } from "@/components/ui/button";
import { SHORTCUT_KEYS } from "@/constants/shortcuts";
import type { CountdownT, ServeLabelT } from "@/hooks/useServeController";
import NumberFlow from "@number-flow/react";

interface IServeOverlayProps {
  visible: boolean;
  label: ServeLabelT;
  countdown: CountdownT;
  onStart: () => void;
}

export const ServeOverlay = ({
  visible,
  label,
  countdown,
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
