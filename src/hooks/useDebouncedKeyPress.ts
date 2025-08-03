import { useEffect, useRef } from "react";

export const useDebouncedKeyPress = (
  keysPressed: React.RefObject<Record<string, boolean>>,
  key: string,
  callback: () => void,
  delay = 300
) => {
  const lastPress = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const isKeyPressed = keysPressed.current[key];

    if (isKeyPressed && now - lastPress.current > delay) {
      callback();
      lastPress.current = now;
    }
  }, [keysPressed, key, callback, delay]);
};
