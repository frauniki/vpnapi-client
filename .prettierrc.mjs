/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  importOrder: ["^@\\w", "", "^@/", "", "^[./]"],
  importOrderParserPlugins: ["typescript"],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};

export default config;
