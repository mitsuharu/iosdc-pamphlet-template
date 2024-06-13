# iosdc-pamphlet-template

iOSDC Japan に投稿するパンフレット記事のテンプレートです。作者が iOSDC Japan 2023 で投稿したものを元に作成しました。

## 環境

### 必須

- Node.js 20 以上
  - vivliostyle を利用するため
  - nodenv-aliases を使って設定しています
    - see: https://qiita.com/mitsuharu_e/items/d7005c52c9910ca0d366

### 任意

- VS Code
- Docker Desktop
  - 入稿データ作成に利用します
  - Makefile のコマンドを実行すると colima を利用します

## 執筆手順

### 初期設定

```shell
yarn
```

### 電子版のPDF作成

PDFを作成する。`output/output.pdf` に出力されます。

```shell
yarn pdf
```

PDFを開く。

```shell
yarn open
```

PDFの作成と開くを同時に行う。

```shell
yarn start
```

### 入稿データの作成

Docker で実行する（推奨）。`output/press.pdf` に出力されます。

```shell
yarn press
```

Docker ではなく、ローカル環境で実行する

```shell
yarn press-local
```

### Make

ローカル環境を利用せずに Docker (colima) で実行します

```text
run             pdfを生成して開く
pdf             pdfを生成する
press           プレス版のpdfを生成する
lint            textlintを実行する
open            pdfを開く
clean           生成ファイルをすべて削除
clean_pdf       pdf関係の生成物を削除
clean_docker    Docker関係の生成物を削除
```

## 文章校正

校正ツール [textlint](https://textlint.github.io/) を利用して、文章校正ができます。なお、この lint ツールの使用は任意です。書き方で悩んだ・校正したい場合など、必要に応じて導入してください。

### ルール

次のルールを導入しています。

- preset-ja-spacing
  - 日本語周りにおけるスペースの有無を決定する
- preset-ja-technical-writing
  - 技術文書向けの textlint ルールプリセット
- textlint-rule-spellcheck-tech-word
  - WEB+DB 用語統一ルールベースの単語チェック
  - （deprecated になっているので置き換えたい）
- Rules for TechBooster
  - TechBooster の [ルール](https://github.com/TechBooster/ReVIEW-Template/tree/master/prh-rules) を使用しています。
  - iOS に関するルールはほとんどないので適宜追加してください。

その他、スペルチェックのルール `textlint-rule-spellchecker` がありますが、エディターのスペルチェックと競合しやすいので、今回は追加していません。VS Code を利用している場合は、プラグイン [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) を追加すれば、スペルチェックが行われます。

### 実行

`./manuscripts/` 配下のファイルすべてに対して textlint を行う。

```shell
yarn lint 
```

特定のファイルに対して実行する。

```shell
yarn textlint ./manuscripts/hogehoge.md
```

VS Code を利用している場合は、プラグイン [vscode\-textlint](https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint) を追加すれば、ファイル保存時に自動実行されます。他のエディターをご利用の方は [ここ](https://textlint.github.io/docs/integrations.html) からそれぞれのプラグインを追加してください。

### 無効

あるファイルを textlint の対象から外したい場合は `.textlintignore` にそのファイルを追加してください。また、ファイル内の特定の文章に対してルールを無効にしたい場合は、次のように記述してください。

```text
<!-- textlint-disable -->
textlint を無効にしたい文章をここに書く
<!-- textlint-enable -->
```

## テーマ変更

- 現状は `"@vivliostyle/theme-techbook@^1.0.1"` をベースにして、`theme/custom_theme.css` で色やフォントサイズを修正してます
- フォントサイズなど簡単な変更は `./theme/style.css` を適宜修正する

### 参照

- [Vivliostyleの公式テーマをカスタマイズして、ゆめみ大技林 '22のテーマを作った](https://zenn.dev/macneko/articles/06aec138a357b9)
