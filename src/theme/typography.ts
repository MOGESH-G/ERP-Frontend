import { type Theme } from "@mui/material/styles";

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
