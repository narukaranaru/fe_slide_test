module.exports = {
  // ルールの継承をするところ.
  extends: ['gnavi'],

  // プラグインの指定.reactなどの特殊なjsを検証するときに使います
  // plugins: ['react', 'prettier'],

  // 構文解析するツールの宣言。宣言しないとデフォルトになる。
  // parser: 'babel-eslint',

  // 環境の設定。ここでチェックするJSはブラウザで使うことを前提とするよ、という宣言。
  env: {
    browser: true,
    jquery: true,
  },
  rules: {
    // ここにルールを書く
    "class-methods-use-this": "off",
    "semi": 0
  },
}