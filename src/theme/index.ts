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
    "bg-amber-500 text-white hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
  buttonSecondary:
    "bg-bgElevated text-textBody border border-borderDefault hover:bg-bgSubtle focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
};

type Mode = "light" | "dark";

export const createAppTheme = (mode: Mode) => {
  const t = tokens[mode];
  const root = document.documentElement;

  const set = (name: string, value: string) => {
    root.style.setProperty(name, value);
  };

  // 🎨 CSS VARIABLES (Tailwind uses this)

  // BG
  set("--bg-base", t.bg.base);
  set("--bg-paper", t.bg.paper);
  set("--bg-elevated", t.bg.elevated);
  set("--bg-subtle", t.bg.subtle);

  // Borders
  set("--border-default", t.border.default);
  set("--border-subtle", t.border.subtle);
  set("--border-focus", t.border.focus);

  // Amber
  set("--amber-300", t.amber[300]);
  set("--amber-400", t.amber[400]);
  set("--amber-500", t.amber[500]);
  set("--amber-700", t.amber[700]);
  set("--amber-muted", t.amber.muted);
  set("--amber-ghost", t.amber.ghost);

  // Text
  set("--text-header", t.text.header);
  set("--text-sub", t.text.subHeader);
  set("--text-body", t.text.body);
  set("--text-hint", t.text.hint);
  set("--text-info", t.text.info);
  set("--text-warning", t.text.warning);
  set("--text-error", t.text.error);
  set("--text-success", t.text.success);

  // State
  set("--success-muted", t.state.successMuted);
  set("--error-muted", t.state.errorMuted);
  set("--warning-muted", t.state.warningMuted);
  set("--info-muted", t.state.infoMuted);

  // 🌙 Tailwind dark mode
  root.classList.toggle("dark", mode === "dark");

  return createTheme({
    palette: {
      mode,

      primary: {
        main: t.amber[500], // ✅ REAL VALUE
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
            backgroundColor: "var(--amber-500)", // ✅ CSS var OK here
            "&:hover": {
              backgroundColor: "var(--amber-400)",
            },
          },
        },
      },
    },
  });
};
