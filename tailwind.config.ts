import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        // Backgrounds
        bgBase: "var(--bgBase)",
        bgPaper: "var(--bgPaper)",
        bgElevated: "var(--bgElevated)",
        bgSubtle: "var(--bgSubtle)",

        // Borders
        borderDefault: "var(--borderDefault)",
        borderSubtle: "var(--borderSubtle)",
        borderFocus: "var(--borderFocus)",

        // Amber palette
        amber300: "var(--amber300)",
        amber400: "var(--amber400)",
        amber500: "var(--amber500)",
        amber700: "var(--amber700)",
        amberMuted: "var(--amberMuted)",
        amberGhost: "var(--amberGhost)",

        // Muted / feedback
        textHint: "var(--textHint)",
        textSuccessMuted: "var(--successMuted)",
        textErrorMuted: "var(--errorMuted)",
        textWarningMuted: "var(--warningMuted)",
        textInfoMuted: "var(--infoMuted)",

        // Semantic text
        textHeader: "var(--textHeader)",
        textSubHeader: "var(--textSubHeader)",
        textBody: "var(--textBody)",
        textInfo: "var(--textInfo)",
        textWarning: "var(--textWarning)",
        textError: "var(--textError)",
        textSuccess: "var(--textSuccess)",
      },
    },
  },

  plugins: [],
};

export default config;
