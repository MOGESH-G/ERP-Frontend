import { tokens } from "./tokens";

export const applyThemeVariables = (mode: "light" | "dark") => {
  const t = tokens[mode];
  const root = document.documentElement;
  console.log(t);

  const set = (name: string, value: string) => {
    root.style.setProperty(name, value);
  };

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

  // Dark mode class
  root.classList.toggle("dark", mode === "dark");
};
