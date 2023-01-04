import { createStitches } from "@stitches/react";
import { GAME_ROW_LENGTH } from "constants/game";

export const { theme, styled, css, keyframes, globalCss } = createStitches({
  prefix: "mathlio",
  theme: {
    colors: {
      // blue: "#3177ad",
      // darkBlue: "#24689c",
      // yellow: "#f5f5f5",
      // orange: "#cc963f",
      // darkOrange: "#b5812f",
      // text: "$darkOrange",
      // green: "#169873",
      // darkGreen: "#0c7d5d",
      // white: "#fff",
      // overlay: "rgba(0,0,0,.3)",
      // stroke: "#e5e5e5",
      // lightGray: "#f5f5f5",
      // background: "$yellow",
      text: "#111",
      background: "#f5f5f5",
    },

    fontSizes: {
      sm: ".7rem",
      md: "1rem",
      lg: "1.5rem",
      xlg: "2rem",
    },

    fontWeights: {
      bold: "bold",
    },

    fonts: {
      quicksand: "'Quicksand', sans-serif",
    },

    sizes: {
      letterSize: "4rem",
      letterSpacing: ".5rem",
      rowWidth: `calc(($sizes$letterSize * ${GAME_ROW_LENGTH}) + ($sizes$letterSpacing * ${
        GAME_ROW_LENGTH + 2
      }))`,
    },

    space: {
      0: ".5em",
      1: "1em",
      2: "2em",
    },

    radii: {
      1: ".5rem",
    },

    zIndices: {
      toast: 9999,
      modal: 9998,
    },
  },

  media: {
    xsm: "370px",
    sm: "500px",
    md: "640px",
    lg: "920px",
    xlg: "1380px",
  },
});
