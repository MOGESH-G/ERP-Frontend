import { tokens } from "./tokens";

export const applyThemeVariables = (mode: "light" | "dark") => {
  const t = tokens[mode];
  const root = document.documentElement;

  const set = (name: string, value: string) => {
    root.style.setProperty(name, value);
  };

  // ================= BACKGROUNDS =================
  set("--bg-base", t.bg.base);
  set("--bg-paper", t.bg.paper);
  set("--bg-elevated", t.bg.elevated);
  set("--bg-subtle", t.bg.subtle);
  set("--bg-inverse", t.bg.inverse);

  // ================= BORDERS =================
  set("--border-default", t.border.default);
  set("--border-subtle", t.border.subtle);
  set("--border-strong", t.border.strong);
  set("--border-focus", t.border.focus);

  // ================= PRIMARY (Blue) =================
  set("--primary-50", t.primary[50]);
  set("--primary-100", t.primary[100]);
  set("--primary-300", t.primary[300]);
  set("--primary-500", t.primary[500]);
  set("--primary-600", t.primary[600]);
  set("--primary-700", t.primary[700]);
  set("--primary-contrast", t.primary.contrast);

  // ================= SECONDARY (Gray) =================
  set("--secondary-100", t.secondary[100]);
  set("--secondary-300", t.secondary[300]);
  set("--secondary-500", t.secondary[500]);
  set("--secondary-700", t.secondary[700]);

  // ================= ACCENT (Purple) =================
  set("--accent-300", t.accent[300]);
  set("--accent-500", t.accent[500]);
  set("--accent-700", t.accent[700]);
  set("--accent-muted", t.accent.muted);
  set("--accent-ghost", t.accent.ghost);

  // ================= TEXT =================
  set("--text-header", t.text.header);
  set("--text-sub", t.text.subHeader);
  set("--text-body", t.text.body);
  set("--text-hint", t.text.hint);
  set("--text-info", t.text.info);
  set("--text-warning", t.text.warning);
  set("--text-error", t.text.error);
  set("--text-success", t.text.success);
  set("--text-inverse", t.text.inverse);

  // ================= STATE =================
  set("--success-bg", t.state.successBg);
  set("--error-bg", t.state.errorBg);
  set("--warning-bg", t.state.warningBg);
  set("--info-bg", t.state.infoBg);

  // ================= ACTION STATES =================
  set("--action-hover", t.action.hover);
  set("--action-active", t.action.active);
  set("--action-disabled", t.action.disabled);
  set("--action-disabled-bg", t.action.disabledBg);

  // Dark mode class
  root.classList.toggle("dark", mode === "dark");
};
