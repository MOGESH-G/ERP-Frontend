import { createTheme } from "@mui/material/styles";
import { tokens } from "./tokens";

export const getMuiTheme = (mode: "light" | "dark") => {
  const t = tokens[mode];

  return createTheme({
    palette: {
      mode,

      primary: {
        main: t.amber[500],
      },

      background: {
        default: t.bg.base,
        paper: t.bg.paper,
      },

      text: {
        primary: t.text.body,
        secondary: t.text.subHeader,
      },

      divider: t.border.default,
    },

    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--bg-paper)",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--bg-elevated)",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: "var(--amber-500)",
            color: "var(--bg-base)",
            "&:hover": {
              backgroundColor: "var(--amber-400)",
            },
          },
        },
      },
    },
  });
};
