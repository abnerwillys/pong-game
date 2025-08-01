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
  }, [ball]);

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
