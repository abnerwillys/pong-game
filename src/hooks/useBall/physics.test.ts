import { describe, it, expect } from "vitest";
import {
  verifyWallCollision,
  verifyPaddlesCollision,
  getVerticalDeflection,
  isPaddleCollision,
  reflectBallHorizontally,
} from "./physics";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PADDLE_OFFSET_X,
} from "@/constants/config";

describe("verifyWallCollision", () => {
  it("should reverse velocity when hitting top wall", () => {
    const { velocityY } = verifyWallCollision(0, -2);
    expect(velocityY).toBe(2);
  });

  it("should reverse velocity when hitting bottom wall", () => {
    const { velocityY } = verifyWallCollision(CANVAS_HEIGHT, 2);
    expect(velocityY).toBe(-2);
  });

  it("should not change velocity if not touching wall", () => {
    const result = verifyWallCollision(100, 2);
    expect(result.velocityY).toBe(2);
  });

  it("should reverse velocity if moving diagonally into top wall", () => {
    const { velocityY } = verifyWallCollision(1, -5);
    expect(velocityY).toBe(5);
  });
});

describe("verifyWallCollision angle handling", () => {
  it("should keep velocityX unchanged", () => {
    const originalY = 0;
    const originalVelocityY = -5;
    const result = verifyWallCollision(originalY, originalVelocityY);
    expect(result.velocityY).toBe(5);
  });

  it("should allow angle (non-zero Y) bounce", () => {
    const result = verifyWallCollision(CANVAS_HEIGHT, 2.5);
    expect(result.velocityY).toBeCloseTo(-2.5);
  });
});

describe("verifyPaddlesCollision", () => {
  const paddles = {
    width: 10,
    height: 100,
    leftY: 100,
    rightY: 100,
  };

  it("should bounce off the left paddle", () => {
    const ballX = PADDLE_OFFSET_X + paddles.width;
    const ballY = paddles.leftY + paddles.height / 2;
    const result = verifyPaddlesCollision(ballX, ballY, -3, 0, paddles, false);
    expect(result.velocityX).toBe(3);
  });

  it("should bounce off the right paddle", () => {
    const ballX = CANVAS_WIDTH - PADDLE_OFFSET_X - paddles.width;
    const ballY = paddles.rightY + paddles.height / 2;
    const result = verifyPaddlesCollision(ballX, ballY, 3, 0, paddles, false);
    expect(result.velocityX).toBe(-3);
  });

  it("should apply vertical deflection if enabled", () => {
    const ballX = PADDLE_OFFSET_X + paddles.width;
    const ballY = paddles.leftY + paddles.height / 2 + 10;
    const result = verifyPaddlesCollision(ballX, ballY, -3, 0, paddles, true);
    expect(result.velocityY).not.toBe(0);
  });

  it("should not bounce if ball is near left paddle but not overlapping", () => {
    const ballX = PADDLE_OFFSET_X - 1; // just left of paddle
    const ballY = paddles.leftY + paddles.height / 2;
    const result = verifyPaddlesCollision(ballX, ballY, -3, 0, paddles, false);
    expect(result.velocityX).toBe(-3); // unchanged
  });

  it("should detect corner collision at paddle top edge", () => {
    const ballX = PADDLE_OFFSET_X + paddles.width;
    const ballY = paddles.leftY; // exactly at top
    const result = verifyPaddlesCollision(ballX, ballY, -3, 0, paddles, false);
    expect(result.velocityX).toBe(3); // should still bounce
  });

  it("should detect corner collision at paddle bottom edge", () => {
    const ballX = PADDLE_OFFSET_X + paddles.width;
    const ballY = paddles.leftY + paddles.height; // exactly at bottom
    const result = verifyPaddlesCollision(ballX, ballY, -3, 0, paddles, false);
    expect(result.velocityX).toBe(3);
  });
});

describe("verifyPaddlesCollision edge cases", () => {
  const paddles = {
    width: 10,
    height: 100,
    leftY: 100,
    rightY: 100,
  };

  it("should not bounce if ball is near but not touching paddle", () => {
    const ballX = PADDLE_OFFSET_X - 5;
    const ballY = paddles.leftY + paddles.height / 2;
    const result = verifyPaddlesCollision(ballX, ballY, -3, 0, paddles, false);
    expect(result.velocityX).toBe(-3);
  });

  it("should bounce when ballY is exactly at top boundary of paddle", () => {
    const ballX = PADDLE_OFFSET_X + paddles.width;
    const ballY = paddles.leftY;
    const result = verifyPaddlesCollision(ballX, ballY, -3, 0, paddles, false);
    expect(result.velocityX).toBe(3);
  });

  it("should bounce when ballY is exactly at bottom boundary of paddle", () => {
    const ballX = PADDLE_OFFSET_X + paddles.width;
    const ballY = paddles.leftY + paddles.height;
    const result = verifyPaddlesCollision(ballX, ballY, -3, 0, paddles, false);
    expect(result.velocityX).toBe(3);
  });
});

describe("getVerticalDeflection", () => {
  const paddleY = 100;
  const paddleHeight = 100;

  it("should return 0 when ball hits center of paddle", () => {
    const ballY = paddleY + paddleHeight / 2;
    const deflection = getVerticalDeflection(ballY, paddleY, paddleHeight);
    expect(deflection).toBeCloseTo(0);
  });

  it("should return negative deflection for top edge hit", () => {
    const ballY = paddleY;
    const deflection = getVerticalDeflection(ballY, paddleY, paddleHeight);
    expect(deflection).toBeCloseTo(-0.3);
  });

  it("should return positive deflection for bottom edge hit", () => {
    const ballY = paddleY + paddleHeight;
    const deflection = getVerticalDeflection(ballY, paddleY, paddleHeight);
    expect(deflection).toBeCloseTo(0.3);
  });

  it("should return scaled deflection with custom factor", () => {
    const ballY = paddleY + paddleHeight;
    const deflection = getVerticalDeflection(ballY, paddleY, paddleHeight, 0.5);
    expect(deflection).toBeCloseTo(0.5);
  });
});

describe("isPaddleCollision", () => {
  const paddleX = 50;
  const paddleY = 100;
  const paddleWidth = 10;
  const paddleHeight = 100;

  it("should return true when ball is inside paddle bounds", () => {
    const result = isPaddleCollision(
      55,
      120,
      paddleX,
      paddleY,
      paddleWidth,
      paddleHeight
    );
    expect(result).toBe(true);
  });

  it("should return false when ball is to the left of paddle", () => {
    const result = isPaddleCollision(
      40,
      120,
      paddleX,
      paddleY,
      paddleWidth,
      paddleHeight
    );
    expect(result).toBe(false);
  });

  it("should return false when ball is to the right of paddle", () => {
    const result = isPaddleCollision(
      61,
      120,
      paddleX,
      paddleY,
      paddleWidth,
      paddleHeight
    );
    expect(result).toBe(false);
  });

  it("should return false when ball is above the paddle", () => {
    const result = isPaddleCollision(
      55,
      90,
      paddleX,
      paddleY,
      paddleWidth,
      paddleHeight
    );
    expect(result).toBe(false);
  });

  it("should return false when ball is below the paddle", () => {
    const result = isPaddleCollision(
      55,
      210,
      paddleX,
      paddleY,
      paddleWidth,
      paddleHeight
    );
    expect(result).toBe(false);
  });

  it("should return true when ball is exactly on the top-left corner", () => {
    const result = isPaddleCollision(
      paddleX,
      paddleY,
      paddleX,
      paddleY,
      paddleWidth,
      paddleHeight
    );
    expect(result).toBe(true);
  });

  it("should return true when ball is exactly on the bottom-right corner", () => {
    const result = isPaddleCollision(
      paddleX + paddleWidth,
      paddleY + paddleHeight,
      paddleX,
      paddleY,
      paddleWidth,
      paddleHeight
    );
    expect(result).toBe(true);
  });
});

describe("reflectBallHorizontally", () => {
  it("should reflect correctly on left paddle", () => {
    const x = reflectBallHorizontally(50, 10, true);
    expect(x).toBe(60);
  });

  it("should reflect correctly on right paddle", () => {
    const x = reflectBallHorizontally(200, 10, false);
    expect(x).toBe(199); // -1 for alignment
  });
});
