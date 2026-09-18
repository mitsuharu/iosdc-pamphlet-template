# iosdc-pamphlet-template

iOSDC Japan に投稿するパンフレット記事のテンプレートです。作者が iOSDC Japan 2023 で投稿したものを元に作成しました。

## 利用実績

iOSDC Japan 2023

- 参照：[2023に寄稿したパンフレット記事](https://speakerdeck.com/mitsuharu/redux-saga-for-swift-contributed-to-iosdc-2023-pamphlet)

iOSDC Japan 2024

- 現在設定されている組版です
- 2023 版を元に、フォントサイズと余白を調整しました
- 参照：[2024に寄稿したパンフレット記事](https://speakerdeck.com/mitsuharu/iosdc-2024-pamphlet)

色について

- 色の見た目は印刷の都合上、紙版と電子版で異なります
- 実際の色味は紙のパンフレットを確認してください
- 素人判断ですが、色（主にコードブロックの色）は問題ないと思っています

## 環境

- macOS Tahoe 26.5.1 で確認しました

### 必須（ローカルでビルドする場合）

- Node.js 24 以上
  - vivliostyle を利用するためです
- 作者は nodenv-aliases を使って設定しています
  - see: [nodenv\-aliases を使って node\-version の管理を簡単にしよう](https://qiita.com/mitsuharu_e/items/d7005c52c9910ca0d366)
- Yarn v4
  - `corepack enable` で corepack を有効にしてください

### 任意

- Visual Studio Code
  - ファイル保存で textlint が走るので便利（推奨）
- Docker Desktop
  - 入稿データ作成に利用します
  - Makefile のコマンドを実行すると colima を利用します

## 設定

原稿ごとの調整は `theme/styles/styles.css` で行います。

テーマは Vivliostyle Themes v3 系なので、素の CSS プロパティを書くのではなく
`--vs-*` 変数を設定するのが基本です。使える変数は
[theme\-base のドキュメント](https://github.com/vivliostyle/themes/tree/main/packages/%40vivliostyle/theme-base#readme)にあります。
一度ビルドすると `.vivliostyle/themes/node_modules/@vivliostyle/theme-base/dist/css-variables.json`
に一覧が展開されるので、そちらを見ても確認できます。

段組は `--vs-columns` をお好みで設定してください。

```css
:root {
  /* 段組の設定 1 or 2 */
  --vs-columns: 1;
}
```

文字まわりは `@media print` の中で設定しています。

```css
@media print {
  :root {
    /* フォントの基本サイズ */
    --vs-font-size: 10pt;

    /* 行送り */
    --vs-line-height: 1.8;
  }

  /* ソースコードの文字サイズ。100% ならば本文と同じ大きさになります */
  code[class*="language-"],
  pre[class*="language-"] {
    font-size: 100%;
  }
}
```

行送り（`--vs-line-height`）を変えても、段落や見出しの間隔は変わりません。
間隔はテーマ側で固定してあるので、行の詰まり具合だけが変わります。

2段組にて、画像を幅一杯に表示したい場合は次のタグを利用してください。

```html
<figure class="column-top">
  <img src="./images/bubble-sort.png">
  <figcaption>キャプション</figcaption>
</figure>
```

その他、CSS は `theme/styles/styles.css` で適宜定義して利用してください。

## 執筆手順（ローカル）

### 初期設定

Yarn を利用される方は、corepack を有効にしてください。

```shell
corepack enable
```

環境構築

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

ローカル環境で実行する  （Docker Desktop が無い場合は make press の方が推奨です）

```shell
yarn press-local
```

## 執筆手順（Docker）

- ローカル環境に Node や Docker Desktop を入れたく無い人向け
- Docker (colima) 上でビルドします
  - Docker Desktop は不要です

### Make コマンド

- make hogehoge で完結します

|コマンド|内容|
|:--|:--|
| make run | pdfを生成して開く |
| make pdf | pdfを生成する |
| make press | プレス版のpdfを生成する |
| make lint | textlintを実行する |
| make open | pdfを開く |
| make clean | 生成ファイルをすべて削除 |
| make clean_pdf | pdf関係の生成物を削除 |
| make clean_docker | Docker関係の生成物を削除 |

## 文章校正

校正ツール [textlint](https://textlint.github.io/) を利用して、文章校正ができます。なお、この lint ツールの使用は任意です。書き方で悩んだ・校正したい場合など、必要に応じて導入してください。

最終的な文章の表現は書き手が決めるものなので、**textlint は CI では実行していません**。手元で必要に応じて使ってください。

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

#### 既知の制限

`.textlintrc.json` で `@textlint-ja/preset-ai-writing` の `ai-tech-writing-guideline` に `severity: "info"`（サジェスト扱い）を指定していますが、**現在は効かず error のまま報告されます**。textlint 15.8.0 では、プリセットの中のルールに対する `severity` が適用されないためです（トップレベルのルールでは効きます）。

うるさく感じる場合は、次のように無効にしてください。

```json
"@textlint-ja/preset-ai-writing": {
  "ai-tech-writing-guideline": false
}
```

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

VS Code を利用している場合は、プラグイン [textlint](https://marketplace.visualstudio.com/items?itemName=3w36zj6.textlint) を追加すれば、ファイル保存時に自動実行されます（`.vscode/extensions.json` で推奨しています）。他のエディターをご利用の方は [ここ](https://textlint.github.io/docs/integrations.html) からそれぞれのプラグインを追加してください。

### 無効

あるファイルを textlint の対象から外したい場合は `.textlintignore` にそのファイルを追加してください。また、ファイル内の特定の文章に対してルールを無効にしたい場合は、次のように記述してください。

```text
<!-- textlint-disable -->
textlint を無効にしたい文章をここに書く
<!-- textlint-enable -->
```

### textlint MCP

- 「現在のファイルをtextlint MCPを使って、見つかったテキストの問題を説明してください」などでAIアシスタントに校正を依頼してください
- 詳細は https://efcl.info/2025/06/10/textlint-mcp/ を参照してください

## テーマ変更

利用しているテーマは次の2つです。どちらも `vivliostyle.config.js` でバージョンを固定しています。

- [@mitsuharu/vivliostyle\-theme\-iosdc\-pamphlet](https://www.npmjs.com/package/@mitsuharu/vivliostyle-theme-iosdc-pamphlet)
  - 組版の本体です。標準テーマの `@vivliostyle/theme-techbook` をベースにしています
  - 拙作なので、PR など歓迎です
- [@mitsuharu/vivliostyle\-theme\-noto\-sans\-jp](https://www.npmjs.com/package/@mitsuharu/vivliostyle-theme-noto-sans-jp)
  - フォントを Noto Sans JP / Noto Sans Mono に固定します
  - フォントファイルを同梱しているので、日本語フォントが入っていない環境（GitHub Actions の runner など）でも文字化けしません

フォントサイズなど簡単な変更は、テーマを差し替えずに `./theme/styles/styles.css` で調整してください（[設定](#設定)を参照）。

### Vivliostyle CLI のバージョン

テーマは `theme.css` からパッケージ名で `@import` しているため、**`@vivliostyle/cli` 11.3.0 以降**が必要です。それより前のバージョンでは、テーマが当たらないまま PDF ができてしまいます。

CLI のバージョンは2か所にあり、**両方を揃える**必要があります。

| ファイル | 用途 |
| :--- | :--- |
| `package.json` の `devDependencies` | `yarn pdf` など npm 側のビルド |
| `Makefile` の `VIVLIOSTYLE_CLI_IMAGE_TAG` | `make press` など Docker 側のビルド |

ずれていると CI（`Check`）で落ちます。Dependabot が CLI を更新したときは、`Update Makefile for Vivliostyle CLI` ワークフローが Makefile 側も自動で合わせます。

## このテンプレート自体のリリース

> [!NOTE]
> ここはテンプレートの管理者向けの手順です。原稿を書く人には関係ありません。

テンプレート自体のバージョンを GitHub Release として残せます。
原稿リポジトリ側の「納品 PDF を出すリリース」とはタグが分かれています。

| | タグ | ワークフロー |
| :--- | :--- | :--- |
| テンプレート自体のリリース | `1.2.3` | `Release Template` |
| 納品 PDF のリリース | `初版`、`2版3刷` など | `Publish and Release PDF` |

手順は次のとおりです。

1. `package.json` の `version` を上げる PR を作ってマージする
2. Actions から `Release Template` を手動実行し、同じバージョンを入力する
   （または `1.2.3` のタグを push する）

ワークフローが、バージョンの検証、サンプル原稿のビルド、タグの作成、
リリースの作成までを行います。リリースにはサンプル PDF が添付されます。

## CI

GitHub Actions で次を実行しています。

| ワークフロー | 実行タイミング | 内容 |
| :--- | :--- | :--- |
| `Check` | `main` への push / PR | biome の整形・リント、CLI バージョンの一致確認 |
| `Build and Attach PDF on Pull-Request` | PR | PDF をビルドして PR に添付する |
| `Check npm packages by AikidoSec Safe Chain` | 依存関係を変える PR | 悪意ある npm パッケージが混ざっていないか検査する |
| `Update Makefile for Vivliostyle CLI` | Dependabot の PR | Makefile の CLI バージョンを package.json に合わせる |
| `Publish and Release PDF` | `初版` などのタグ push | 納品用の PDF を作ってリリースする |
| `Release Template` | `1.2.3` のタグ push / 手動実行 | テンプレート自体をリリースする（管理者向け） |

GitHub Actions はサプライチェーン対策のためコミット SHA で固定し、`# vX.Y.Z` のコメントを添えています。更新は Dependabot に任せています。

## セキュリティ対策

ローカルおよび CI で、[@aikidosec/safe-chain](https://github.com/AikidoSec/safe-chain) を利用して、npm パッケージの安全性を確認できます。

### ローカル環境

[@aikidosec/safe-chain](https://github.com/AikidoSec/safe-chain) の README にしたがって、ローカル環境にインストールしてください。なお、Docker を利用される場合は、安全確認したパッケージがインストールされるので原則的に対応不要です。

### CI での確認

package.json またはロックファイルの変更を含む PR が作成されたら、GitHub Actions でパッケージが確認されます。

Actions で利用する `@aikidosec/safe-chain` は、バージョンを固定したうえで、インストーラーの SHA256 を検証してから実行しています。更新するときは、それ自身の安全性を確認した後に `.github/workflows/aikidosec-safe-chain.yml` の `env` を2つとも書き換えてください。

```yaml
env:
  AIKIDO_SAFE_CHAIN_VERSION: '1.5.20'
  AIKIDO_SAFE_CHAIN_INSTALLER_SHA256: '0ad25efe15d1fa56105157a454d647223e78eb0c53d1f85e3d10afcd722e7bfd'
```

チェックサムは次で確認できます。

```shell
curl -fsSL "https://github.com/AikidoSec/safe-chain/releases/download/<バージョン>/install-safe-chain.sh" | shasum -a 256
```

### 公開直後のパッケージを入れない

`.yarnrc.yml` の `npmMinimalAgeGate` を `3d` にしています。乗っ取られたアカウントから悪意あるバージョンが公開されることがあるため、**公開から3日経っていないバージョンはインストールしません**。

自分たちで公開しているテーマ（`@mitsuharu/*`）は、公開直後に取り込みたいので対象外にしています。マルウェアの検査自体は有効のままです。

### 参照

- [Vivliostyleの公式テーマをカスタマイズして、ゆめみ大技林 '22のテーマを作った](https://zenn.dev/macneko/articles/06aec138a357b9)
