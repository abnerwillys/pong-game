/*
 * All shortcuts keys are registered in lowercase,
 * therefore the mappings here should also follow this pattern.
 */

export const CONTROL_KEYS = {
  LEFT_UP: "w",
  LEFT_DOWN: "s",
  RIGHT_UP: "arrowup",
  RIGHT_DOWN: "arrowdown",
} as const;

export const SHORTCUT_KEYS = {
  RESET: "r",
  SETTINGS: "z",
  BALL_TRAIL: "t",
  DYNAMIC_BOUNCE: "b",
  DEBUG_INFO: "d",
  START_PLAY_AGAIN: "enter",
  LEADERBOARD: "l",
} as const;

export type ShortcutKeyT = (typeof SHORTCUT_KEYS)[keyof typeof SHORTCUT_KEYS];
