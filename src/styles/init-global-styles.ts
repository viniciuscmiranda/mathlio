import { globalCss, theme } from "styles";

export const initGlobalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontSize: "15px",
    fontFamily: theme.fonts.quicksand,

    "@xlg": { fontSize: "14px" },
    "@lg": { fontSize: "16px" },
    "@md": { fontSize: "14px" },
    "@sm": { fontSize: "10px" },
    "@xsm": { fontSize: "9px" },
  },

  "#root": {
    height: "100vh",
    width: "100%",
  },

  body: {
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    backgroundImage: `url("/images/bg.png")`,
    backgroundBlendMode: "multiply",
    fontSize: theme.fontSizes.md,
  },

  a: {
    textDecoration: "none",
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,

    "&:hover": {
      textDecoration: "underline",
    },
  },
});
