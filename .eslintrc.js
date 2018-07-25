module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "es6": true
  },
  rules: {
    "import/no-commonjs": ["error", { allowRequire: true }],
    "import/prefer-default-export": 0,

    "eslint/experimentalDecorators": 0,
    "no-nested-ternary": 0,
    "function-paren-newline": 0,
    "func-names": 0,
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-console": 0,
    "prefer-template": "warn",
    "eol-last": ["error", "always"],
    "quote-props": ["error", "as-needed"],
    "indent": ["error", 2, {
      "SwitchCase": 1,
      "MemberExpression": 1
    }],
    "no-plusplus": 0,
    "no-mixed-operators": ["error", {
      "allowSamePrecedence": true
    }],
    "no-new": 0,
    "no-unused-expressions": 0,
  }
}
