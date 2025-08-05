import { useInputTracker } from "@/contexts/InputTrackerContext";
import type { BallT, PaddlesT } from "../../types";
import { useGameSettings } from "@/contexts/GameSettingsContext";

interface IDebugBoxProps {
  ball: BallT;
  paddles: PaddlesT;
  deltaTime: number;
}
export const DebugBox = ({ ball, paddles, deltaTime }: IDebugBoxProps) => {
  const keysPressedRef = useInputTracker();
  const { difficulty, isBallTrailEnabled, isDynamicBounceEnabled } =
    useGameSettings();

  const fps = deltaTime > 0 ? (1 / deltaTime).toFixed(1) : "∞";

  return (
    <div className="w-full mt-4 text-sm bg-black/80 text-white p-4 rounded shadow-md font-mono">
      <h3 className="text-white font-bold mb-2">🔧 Debug Info</h3>

      <div className="flex flex-wrap gap-10">
        <div>
          <div>🎾 Ball:</div>
          <div className="ml-2">x: {ball.x.toFixed(1)}</div>
          <div className="ml-2">y: {ball.y.toFixed(1)}</div>
          <div className="ml-2">vx: {ball.velocityX.toFixed(2)}</div>
          <div className="ml-2">vy: {ball.velocityY.toFixed(2)}</div>
        </div>

        <div>
          <div>🧱 Paddles:</div>
          <div className="ml-2">Left Y: {paddles.leftY.toFixed(1)}</div>
          <div className="ml-2">Right Y: {paddles.rightY.toFixed(1)}</div>
        </div>

        <div>
          <div>⚙️ Game Settings:</div>
          <div className="ml-2">Difficulty: {difficulty}</div>
          <div className="ml-2">
            Ball Trail: {isBallTrailEnabled ? "On" : "Off"}
          </div>
          <div className="ml-2">
            Dynamic Bounce: {isDynamicBounceEnabled ? "On" : "Off"}
          </div>
        </div>

        <div>
          <div>⏱️ Timing:</div>
          <div className="ml-2">Delta: {(deltaTime * 1000).toFixed(2)} ms</div>
          <div className="ml-2">FPS: {fps}</div>
        </div>

        <div>
          <div>⌨️ Keys Pressed:</div>
          <div className="ml-2 break-all">
            {Object.entries(keysPressedRef.current ?? {})
              .filter(([, v]) => v)
              .map(([k]) => `'${k}'`)
              .join(", ") || "None"}
          </div>
        </div>
      </div>
    </div>
  );
};
