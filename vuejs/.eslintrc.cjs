/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },

  rules: {
    "no-unused-vars": "off",
    "vue/no-mutating-props": "off",
    "no-prototype-builtins": "off",
    "no-extra-boolean-cast": "off",
    "multiline-ternary": ["error", "never"],
  },
};
