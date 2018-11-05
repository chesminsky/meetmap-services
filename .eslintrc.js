module.exports = {
  "env": {
    "node": true,
    "browser": true
  },
  "extends": ["google"],
  "parserOptions": {
    "ecmaVersion": 6,
  },
  "rules": {
    "max-len": 0,
    "require-jsdoc": 0,
    "no-undef": 2
  },
  "globals": {
    "$": true,
    "io": true,
    "M": true
  }
};