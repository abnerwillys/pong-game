// src/hooks/useGameLoop.ts

import { useEffect, useRef } from "react";

export const useGameLoop = (callback: (delta: number) => void) => {
  const requestRef = useRef<number>(null);
  const previousTimeRef = useRef<number>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current != null) {
        const delta = time - previousTimeRef.current;
        callback(delta);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [callback]);
};
