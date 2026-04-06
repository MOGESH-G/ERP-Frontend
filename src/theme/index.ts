import { createTheme } from "@mui/material/styles";
import { tokens } from "./tokens";

// Utility classes for consistent styling across MUI and Tailwind
export const textClasses = {
  header: {
    xl: "text-4xl font-bold text-textHeader",
    lg: "text-3xl font-bold text-textHeader",
    md: "text-2xl font-bold text-textHeader",
  },
  subHeader: {
    lg: "text-2xl font-semibold text-textSubHeader",
    md: "text-xl font-semibold text-textSubHeader",
    sm: "text-lg font-semibold text-textSubHeader",
  },
  body: {
    md: "text-base text-textBody",
    sm: "text-sm text-textBody",
  },
  info: {
    md: "text-sm text-textInfo",
    sm: "text-xs text-infoMuted",
  },
  warning: {
    md: "text-sm text-textWarning",
    sm: "text-xs text-warningMuted",
  },
  error: {
    md: "text-sm text-textError",
    sm: "text-xs text-errorMuted",
  },
  success: {
    md: "text-sm text-textSuccess",
    sm: "text-xs text-successMuted",
  },
};

// Layout classes using CSS variables for theme consistency
export const layoutClasses = {
  card: "p-4 rounded-lg bg-bgElevated shadow-md border border-borderSubtle",
  cardHeader: "mb-2 font-semibold text-lg text-textHeader",
  cardBody: "text-base text-textBody",
  cardFooter: "mt-4 flex justify-end gap-2",
  section: "w-full flex flex-col gap-4",
  row: "flex items-center gap-2",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  button: "px-4 py-2 rounded-md font-medium transition-colors",
  buttonPrimary:
    "bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  buttonSecondary:
    "bg-bgElevated text-textBody border border-borderDefault hover:bg-bgSubtle focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
};

export const createAppTheme = (mode: "light" | "dark") => {
  const t = tokens[mode];
  const root = document.documentElement;

  const set = (name: string, value: string) => {
    root.style.setProperty(name, value);
  };

  // 🎨 CSS VARIABLES (Tailwind & Custom Components)

  // BG
  set("--bg-base", t.bg.base);
  set("--bg-paper", t.bg.paper);
  set("--bg-elevated", t.bg.elevated);
  set("--bg-subtle", t.bg.subtle);
  set("--bg-inverse", t.bg.inverse);

  // Borders
  set("--border-default", t.border.default);
  set("--border-subtle", t.border.subtle);
  set("--border-strong", t.border.strong);
  set("--border-focus", t.border.focus);

  // Primary (Blue)
  set("--primary-50", t.primary[50]);
  set("--primary-100", t.primary[100]);
  set("--primary-500", t.primary[500]);
  set("--primary-600", t.primary[600]);
  set("--primary-700", t.primary[700]);
  set("--primary-contrast", t.primary.contrast);

  // Secondary (Gray)
  set("--secondary-100", t.secondary[100]);
  set("--secondary-300", t.secondary[300]);
  set("--secondary-500", t.secondary[500]);
  set("--secondary-700", t.secondary[700]);

  // Accent (Purple)
  set("--accent-300", t.accent[300]);
  set("--accent-500", t.accent[500]);
  set("--accent-700", t.accent[700]);
  set("--accent-muted", t.accent.muted);
  set("--accent-ghost", t.accent.ghost);

  // Text
  set("--text-header", t.text.header);
  set("--text-sub", t.text.subHeader);
  set("--text-body", t.text.body);
  set("--text-hint", t.text.hint);
  set("--text-info", t.text.info);
  set("--text-warning", t.text.warning);
  set("--text-error", t.text.error);
  set("--text-success", t.text.success);
  set("--text-inverse", t.text.inverse);

  // State colors
  set("--success-bg", t.state.successBg);
  set("--error-bg", t.state.errorBg);
  set("--warning-bg", t.state.warningBg);
  set("--info-bg", t.state.infoBg);

  // Action states
  set("--action-hover", t.action.hover);
  set("--action-active", t.action.active);
  set("--action-disabled", t.action.disabled);
  set("--action-disabled-bg", t.action.disabledBg);

  // 🌙 Tailwind / dark mode
  root.classList.toggle("dark", mode === "dark");

  // ================= MUI THEME =================
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
