import { isUserTyping } from "@/utils/isUserTyping";
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
  const keysPressedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUserTyping()) return;
      keysPressedRef.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressedRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <InputTrackerContext.Provider value={keysPressedRef}>
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
