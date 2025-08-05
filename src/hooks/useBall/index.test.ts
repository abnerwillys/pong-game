import { renderHook, act } from "@testing-library/react";
import { useBall } from ".";
import type { RefObject } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/constants/config";
import * as physics from "./physics";

const canvasRef: RefObject<HTMLCanvasElement> = {
  current: document.createElement("canvas"),
};

const paddles = {
  width: 10,
  height: 100,
  leftY: 200,
  rightY: 200,
};

let dynamicBounce = false;
const difficultyConfig = { ballSpeedX: 10, ballSpeedY: 5 };

vi.mock("@/contexts/GameSettingsContext", () => ({
  useGameSettings: () => ({
    isDynamicBounceEnabled: dynamicBounce,
    difficultyConfig,
  }),
}));

describe("useBall", () => {
  beforeEach(() => {
    dynamicBounce = false;
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes ball at center serving right", () => {
    const onScore = vi.fn();
    const { result } = renderHook(() =>
      useBall({ canvasRef, paddles, onScore })
    );

    expect(result.current.ball).toEqual({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      velocityX: difficultyConfig.ballSpeedX,
      velocityY: 0,
    });
  });

  it("resets ball to serve left or right", () => {
    const onScore = vi.fn();
    const { result } = renderHook(() =>
      useBall({ canvasRef, paddles, onScore })
    );

    act(() => {
      result.current.handleBallReset("left");
    });
    expect(result.current.ball.velocityX).toBe(
      -difficultyConfig.ballSpeedX
    );

    act(() => {
      result.current.handleBallReset("right");
    });
    expect(result.current.ball.velocityX).toBe(
      difficultyConfig.ballSpeedX
    );
  });

  it("pauses and resumes movement", () => {
    const onScore = vi.fn();
    const { result } = renderHook(() =>
      useBall({ canvasRef, paddles, onScore })
    );

    const startX = result.current.ball.x;

    act(() => {
      result.current.pauseBall();
      result.current.handleBallUpdate(1);
    });
    expect(result.current.ball.x).toBe(startX);

    act(() => {
      result.current.resumeBall();
      result.current.handleBallUpdate(1);
    });
    expect(result.current.ball.x).toBeGreaterThan(startX);
  });

  it("detects scoring on left boundary and stops updating", () => {
    const onScore = vi.fn();
    const { result } = renderHook(() =>
      useBall({ canvasRef, paddles, onScore })
    );

    act(() => {
      result.current.handleBallReset("left");
      result.current.handleBallUpdate(60);
    });
    expect(result.current.ball.x).toBeLessThan(0);
    const scoredX = result.current.ball.x;

    act(() => {
      result.current.handleBallUpdate(1);
    });
    expect(result.current.ball.x).toBe(scoredX);
  });

  it("detects scoring on right boundary and stops updating", () => {
    const onScore = vi.fn();
    const { result } = renderHook(() =>
      useBall({ canvasRef, paddles, onScore })
    );

    act(() => {
      result.current.handleBallReset("right");
      result.current.handleBallUpdate(60);
    });
    expect(result.current.ball.x).toBeGreaterThan(CANVAS_WIDTH);
    const scoredX = result.current.ball.x;

    act(() => {
      result.current.handleBallUpdate(1);
    });
    expect(result.current.ball.x).toBe(scoredX);
  });

  it("passes dynamic bounce flag to physics", () => {
    const onScore = vi.fn();
    const spy = vi.spyOn(physics, "verifyPaddlesCollision");
    const { result } = renderHook(() =>
      useBall({ canvasRef, paddles, onScore })
    );

    act(() => {
      result.current.handleBallUpdate(1);
    });
    expect(spy).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      paddles,
      false
    );

    spy.mockClear();
    dynamicBounce = true;
    const { result: result2 } = renderHook(() =>
      useBall({ canvasRef, paddles, onScore })
    );
    act(() => {
      result2.current.handleBallUpdate(1);
    });
    expect(spy).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      paddles,
      true
    );
  });
});
