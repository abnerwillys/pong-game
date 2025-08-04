import { useInputTracker } from "@/contexts/InputTrackerContext";
import type { BallT, PaddlesT } from "../../types";

interface IDebugBoxProps {
  ball: BallT;
  paddles: PaddlesT;
  deltaTime: number;
}

export const DebugBox = ({ ball, paddles, deltaTime }: IDebugBoxProps) => {
  const keysPressed = useInputTracker();

  const fps = deltaTime > 0 ? (1 / deltaTime).toFixed(1) : "∞";

  return (
    <div className="absolute top-4 left-4 text-sm bg-black/80 text-white p-4 rounded shadow-md font-mono max-w-xs">
      <h3 className="text-white font-bold mb-2">🔧 Debug Info</h3>

      <div className="mb-2">
        <div>⌨️ Keys Pressed:</div>
        <div className="ml-2 break-all">
          {Object.entries(keysPressed)
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(", ") || "None"}
        </div>
      </div>

      <div className="mb-2">
        <div>🎾 Ball:</div>
        <div className="ml-2">x: {ball.x.toFixed(1)}</div>
        <div className="ml-2">y: {ball.y.toFixed(1)}</div>
        <div className="ml-2">vx: {ball.velocityX.toFixed(2)}</div>
        <div className="ml-2">vy: {ball.velocityY.toFixed(2)}</div>
      </div>

      <div className="mb-2">
        <div>🧱 Paddles:</div>
        <div className="ml-2">Left Y: {paddles.leftY.toFixed(1)}</div>
        <div className="ml-2">Right Y: {paddles.rightY.toFixed(1)}</div>
      </div>

      <div className="mb-2">
        <div>⏱️ Timing:</div>
        <div className="ml-2">Delta: {(deltaTime * 1000).toFixed(2)} ms</div>
        <div className="ml-2">FPS: {fps}</div>
      </div>
    </div>
  );
};
