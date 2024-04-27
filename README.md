iosdc-2023-pamphlet
==

iOSDC 2023 に投稿するパンフレット記事です。


## 執筆

※ Docker 未対応です

### 初期設定

```shell
yarn
```

### PDF作成

```shell
yarn pdf
```

## 文章校正

校正ツール [textlint](https://textlint.github.io/) を利用して、文章校正ができます。なお、この lint ツールの使用は任意です。書き方で悩んだ・校正したい場合など、必要に応じて導入してください。

### ルール

次のルールを導入しています。

* preset-ja-spacing
  * 日本語周りにおけるスペースの有無を決定する
* preset-ja-technical-writing
  * 技術文書向けの textlint ルールプリセット
* textlint-rule-spellcheck-tech-word
  * WEB+DB 用語統一ルールベースの単語チェック
  * （deprecated になっているので置き換えたい）
* Rules for TechBooster
  * TechBooster の [ルール](https://github.com/TechBooster/ReVIEW-Template/tree/master/prh-rules) を使用しています。
  * iOS に関するルールはほとんどないので適宜追加してください。

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

- `./theme/my-theme-techbook/scss` 内の `.scss` ファイルを更新する。
- 変更したら `yarn build-theme` でビルドする

### 参照

- [Vivliostyleの公式テーマをカスタマイズして、ゆめみ大技林 '22のテーマを作った](https://zenn.dev/macneko/articles/06aec138a357b9)