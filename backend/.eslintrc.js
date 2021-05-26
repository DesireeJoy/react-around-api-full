module.exports = {
  env: {
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb",

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ["react"],
  rules: {},
};
