# skilltrans-fe_201902_test

## 開発手順
```
$ git clone http://gitlab102.gnavi.co.jp/skilltrans-fe/skilltrans-fe_201902_test.git
```
```
$ npm i
```
```
$ npm run dev
```

## ディレクトリ構成

### mater, develop, feature, release
```
├── (dist) - ビルド済みファイルディレクトリ
├── src - 作業フォルダ
│   ├── css - CSS
│   ├── ejs - HTML
│   ├── img - 画像
│   ├── js - JS
│   ├── sample - サンプル画像など
│   ├── sprite - CSSスプライト用画像
│   └── styleguide - スタイルガイド
├── (tmp) - 中間生成物ディレクトリ
├── .eslintignore - ESLint対象外ファイル定義
├── .eslintrc - ESLint設定ファイル
├── .gitignore - Git管理対象外ファイル定義
├── .stylelintignore - stylelint対象外ファイル定義
├── .stylelintrc - stylelint設定ファイル
├── aigis_config.yml - スタイルガイド設定ファイル
├── gulpfile.js - タスク設定ファイル
├── package.json - パッケージ一覧
├── README.md - このドキュメント
└── spritesmith.txt - spritesmith設定ファイル
```
