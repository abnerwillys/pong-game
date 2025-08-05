export const DIFFICULTY_LEVELS = ["easy", "medium", "hard"] as const;

export type DifficultyLevelT = (typeof DIFFICULTY_LEVELS)[number];

export const DIFFICULTY_CONFIG: Record<
  DifficultyLevelT,
  {
    paddleHeight: number;
    ballSpeedX: number;
    ballSpeedY: number;
    multiBall: boolean;
  }
> = {
  easy: {
    paddleHeight: 120,
    ballSpeedX: 0.55,
    ballSpeedY: 0.3,
    multiBall: false,
  },
  medium: {
    paddleHeight: 100,
    ballSpeedX: 0.75,
    ballSpeedY: 0.4,
    multiBall: false,
  },
  hard: {
    paddleHeight: 80,
    ballSpeedX: 0.85,
    ballSpeedY: 0.45,
    multiBall: true /* For future */,
  },
};
