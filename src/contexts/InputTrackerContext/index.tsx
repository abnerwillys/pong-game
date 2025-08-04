import {
  createContext,
  useContext,
  useRef,
  useEffect,
  type ReactNode,
  type RefObject,
} from "react";

const InputTrackerContext = createContext<RefObject<
  Record<string, boolean>
> | null>(null);

export const InputTrackerProvider = ({ children }: { children: ReactNode }) => {
  const keysPressed = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <InputTrackerContext.Provider value={keysPressed}>
      {children}
    </InputTrackerContext.Provider>
  );
};

export const useInputTracker = () => {
  const ctx = useContext(InputTrackerContext);
  if (!ctx)
    throw new Error("useInputTracker must be used within InputTrackerProvider");
  return ctx;
};
