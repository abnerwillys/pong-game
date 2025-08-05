export const INITIAL_GAME_THEME = {
  table: {
    background: "#165437",
    borderWidth: 2,
    borderColor: "white",
    paddingBorder: 3,
  },
  ball: {
    color: "#FF4D00",
  },
  trail: {
    length: 20,
    spacing: 2,
    opacity: 0.5 /* fade strength */,
  },
  paddles: {
    left: {
      fillColor: "red",
      borderColor: "black",
    },
    right: {
      fillColor: "black",
      borderColor: "white",
    },
    borderRadius: 4,
  },
  net: {
    color: "#aaa",
    width: 4,
    segmentHeight: 10,
    segmentSpacing: 8,
  },
  centerLine: {
    color: "white" /* same as table border */,
    width: 2,
  },
};

export type GameThemeT = typeof INITIAL_GAME_THEME;
