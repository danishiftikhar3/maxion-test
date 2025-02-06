module.exports = {
  parser: "@typescript-eslint/parser",

  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:no-array-reduce/recommended",
  ],
  eslintIgnore: ["jest.config.js", "pnpm-lock.yaml", "yarn-lock.yaml", "package-lock.json"],

  plugins: ["@typescript-eslint", "import"],

  rules: {
    // General
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/quotes": 0,
    // Import
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
      },
    ],
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },

  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
};
