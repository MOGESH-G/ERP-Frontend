# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Theme Configuration

This project uses a unified theme system that works with both Material-UI (MUI) and Tailwind CSS, supporting light and dark modes.

### Architecture

The theme system follows a strict hierarchy to ensure consistency:

1. **Source of Truth**: `src/theme/colors.ts`
   - Defines `LIGHT` and `DARK` color palettes
   - All colors are defined here first

2. **CSS Variables**: Generated dynamically by `applyTheme()`
   - Applied to `:root` element on theme switch
   - Referenced by Tailwind configuration

3. **Tailwind Config**: `tailwind.config.ts`
   - References CSS variables (e.g., `var(--bgPaper)`)
   - Generates utility classes automatically

4. **MUI Theme**: `createAppTheme()`
   - Uses color values directly from `colors.ts`
   - Provides semantic tokens for MUI components

### Available Colors

All colors are defined in both light and dark variants:

**Backgrounds**: `bgBase`, `bgPaper`, `bgElevated`, `bgSubtle`  
**Borders**: `borderDefault`, `borderSubtle`, `borderFocus`  
**Amber Palette**: `amber300`, `amber400`, `amber500`, `amber700`, `amberMuted`, `amberGhost`  
**Text Colors**: `textHeader`, `textSubHeader`, `textBody`, `textHint`  
**Feedback Colors**: `textSuccess`, `textError`, `textWarning`, `textInfo`  
**Muted Backgrounds**: `successMuted`, `errorMuted`, `warningMuted`, `infoMuted`

### Usage

#### Using Tailwind Classes

```tsx
<div className="bg-bgPaper text-textHeader border border-borderDefault">Content</div>
```

#### Using the Theme Hook

```tsx
import { useTheme } from "./hooks/useTheme";

const MyComponent = () => {
  const { mode, toggle, isDark } = useTheme();

  return <button onClick={toggle}>Switch to {isDark ? "Light" : "Dark"} Mode</button>;
};
```

#### Using MUI Theme

```tsx
import { useTheme } from "@mui/material";

const MyComponent = () => {
  const theme = useTheme();

  return <div style={{ color: theme.palette.custom.textHeader }}>MUI styled content</div>;
};
```

#### Using Theme Utilities

```tsx
import { textClasses, layoutClasses } from "./theme";

<div className={layoutClasses.card}>
  <h2 className={textClasses.header.md}>Title</h2>
  <p className={textClasses.body.md}>Content</p>
</div>;
```

### Adding New Colors

1. Add the color to both `LIGHT` and `DARK` objects in `colors.ts`
2. The system will automatically generate CSS variables and make them available in Tailwind

### Validation

The theme system includes built-in validation (`src/theme/validation.ts`) that ensures:

- LIGHT and DARK palettes have identical structure
- All Tailwind-referenced colors exist in the source
- Consistency across the entire theme system

### Files

- `src/theme/colors.ts` - Color definitions (source of truth)
- `src/theme/index.ts` - Theme creation and utilities
- `src/theme/typography.ts` - MUI typography configuration
- `src/theme/layout.ts` - Layout utility classes
- `src/theme/validation.ts` - Theme system validation
- `src/hooks/useTheme.ts` - React hook for theme management
- `tailwind.config.ts` - Tailwind configuration
- `src/index.css` - Global styles (CSS variables set dynamically)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

