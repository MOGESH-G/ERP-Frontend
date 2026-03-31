import { createTheme, type ThemeOptions, type Theme } from "@mui/material/styles";
import { DARK, LIGHT } from "./colors";

// Semantic text classes (Tailwind-like)
export const textClasses = (theme: Theme) => ({
  header: {
    xl: `text-4xl font-bold text-[${theme.palette.custom.textHeader}]`,
    lg: `text-3xl font-bold text-[${theme.palette.custom.textHeader}]`,
    md: `text-2xl font-bold text-[${theme.palette.custom.textHeader}]`,
  },
  subHeader: {
    lg: `text-2xl font-semibold text-[${theme.palette.custom.textSubHeader}]`,
    md: `text-xl font-semibold text-[${theme.palette.custom.textSubHeader}]`,
    sm: `text-lg font-semibold text-[${theme.palette.custom.textSubHeader}]`,
  },
  body: {
    md: `text-base text-[${theme.palette.custom.textBody}]`,
    sm: `text-sm text-[${theme.palette.custom.textBody}]`,
  },
  info: {
    md: `text-sm text-[${theme.palette.custom.textInfo}]`,
    sm: `text-xs text-[${theme.palette.custom.infoMuted}]`,
  },
  warning: {
    md: `text-sm text-[${theme.palette.custom.textWarning}]`,
    sm: `text-xs text-[${theme.palette.custom.warningMuted}]`,
  },
  error: {
    md: `text-sm text-[${theme.palette.custom.textError}]`,
    sm: `text-xs text-[${theme.palette.custom.errorMuted}]`,
  },
  success: {
    md: `text-sm text-[${theme.palette.custom.textSuccess}]`,
    sm: `text-xs text-[${theme.palette.custom.successMuted}]`,
  },
});

// Layout classes
export const layoutClasses = {
  card: "p-4 rounded-lg bg-bgElevated shadow-md",
  cardHeader: "mb-2 font-semibold text-lg",
  cardBody: "text-base text-textBody",
  cardFooter: "mt-4 flex justify-end gap-2",
  section: "w-full flex flex-col gap-4",
  row: "flex items-center gap-2",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
};

export const createAppTheme = (mode: "light" | "dark") => {
  const RAW = mode === "dark" ? DARK : LIGHT;

  const themeOptions: ThemeOptions = {
    palette: {
      mode,

      primary: {
        main: RAW.amber500,
        light: RAW.amber400,
        dark: RAW.amber700,
        contrastText: RAW.bgBase,
      },

      secondary: {
        main: RAW.amber300,
      },

      background: {
        default: RAW.bgBase,
        paper: RAW.bgPaper,
      },

      text: {
        primary: RAW.textBody,
        secondary: RAW.textSubHeader,
        disabled: RAW.textHint,
      },

      success: { main: RAW.textSuccess },
      error: { main: RAW.textError },
      warning: { main: RAW.textWarning },
      info: { main: RAW.textInfo },

      divider: RAW.borderDefault,

      custom: { ...RAW },
    },

    typography: {
      fontFamily: "'Fraunces', 'Segoe UI', system-ui, sans-serif",
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    shape: {
      borderRadius: 8,
    },
  };

  return createTheme(themeOptions);
};