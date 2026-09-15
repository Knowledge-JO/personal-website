import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next 16 ships a flat config, so it is spread directly.
// Routing it through @eslint/eslintrc's FlatCompat is the legacy path and
// throws "Converting circular structure to JSON" under ESLint 10.
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [".next/**", "node_modules/**", "out/**"],
  },
];

export default eslintConfig;
