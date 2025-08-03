import { useRef, useState, useEffect } from "react";
import { useGameLoop } from "../../hooks/useGameLoop";

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [ball, setBall] = useState({
    x: 300,
    y: 200,
    vx: 0.3,
    vy: 0.2,
  });

  const [paddles, setPaddles] = useState({
    leftY: 150,
    rightY: 150,
    height: 80,
    width: 12,
    speed: 0.4, // px per ms
  });

  useGameLoop((delta) => {
    setBall((prev) => {
      const canvas = canvasRef.current;
      if (!canvas) return prev;

      let { x, y, vx, vy } = prev;
      x += vx * delta;
      y += vy * delta;

      // Bounce on edges
      if (x <= 0 || x >= canvas.width) vx *= -1;
      if (y <= 0 || y >= canvas.height) vy *= -1;

      return { x, y, vx, vy };
    });

    setPaddles((prev) => {
      const { height, speed } = prev;
      let { leftY, rightY } = prev;

      if (keysPressed.current["w"]) leftY -= speed * delta;
      if (keysPressed.current["s"]) leftY += speed * delta;

      if (keysPressed.current["ArrowUp"]) rightY -= speed * delta;
      if (keysPressed.current["ArrowDown"]) rightY += speed * delta;

      // Clamp to bounds (canvas height = 400)
      leftY = Math.max(0, Math.min(400 - height, leftY));
      rightY = Math.max(0, Math.min(400 - height, rightY));

      return { ...prev, leftY, rightY };
    });
  });

  // Render on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw left paddle
    ctx.fillStyle = "white";
    ctx.fillRect(20, paddles.leftY, paddles.width, paddles.height);

    // Draw right paddle
    ctx.fillRect(
      600 - 20 - paddles.width,
      paddles.rightY,
      paddles.width,
      paddles.height
    );
  }, [ball, paddles.height, paddles.leftY, paddles.rightY, paddles.width]);

  const keysPressed = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="bg-black border-4 border-white rounded"
      />
    </div>
  );
};
