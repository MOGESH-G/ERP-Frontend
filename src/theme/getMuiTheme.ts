import { createTheme } from "@mui/material/styles";
import { tokens } from "./tokens";

export const getMuiTheme = (mode: "light" | "dark") => {
  const t = tokens[mode];

  return createTheme({
    palette: {
      mode,

      primary: {
        main: t.primary[500],
        light: t.primary[100],
        dark: t.primary[700],
        contrastText: t.primary.contrast,
      },

      secondary: {
        main: t.secondary[500],
        light: t.secondary[300],
        dark: t.secondary[700],
        contrastText: t.text.inverse,
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
            backgroundColor: "var(--primary-500)",
            color: "var(--primary-contrast)",
            "&:hover": {
              backgroundColor: "var(--primary-600)",
            },
          },
          containedSecondary: {
            backgroundColor: "var(--secondary-500)",
            color: "var(--text-inverse)",
            "&:hover": {
              backgroundColor: "var(--secondary-700)",
            },
          },
          outlinedPrimary: {
            borderColor: "var(--primary-500)",
            color: "var(--primary-500)",
            "&:hover": {
              backgroundColor: "var(--primary-50)",
            },
          },
          outlinedSecondary: {
            borderColor: "var(--secondary-500)",
            color: "var(--secondary-500)",
            "&:hover": {
              backgroundColor: "var(--secondary-100)",
            },
          },
        },
      },
    },
  });
};
