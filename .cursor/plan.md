# 作業手順チェックリスト

## 1. ファイル準備
- [x] `source.html` をコピーして `index.html` を作成する。
- [x] 空の `style.css` を作成する。
- [x] 空の `main.js` を作成する。
- [x] 空の `background.js` を作成する。
- [x] 空の `themes.json` を作成する。
- [x] ルートディレクトリに `.gitignore` ファイルを作成し、一般的な除外ルール（例: `.DS_Store`, `node_modules/`) を追加する。

## 2. HTML リファクタリング (`index.html`)
- [x] `index.html` を開き、`<style>` タグ全体を削除する。
- [x] `<head>` 内に `<link rel="stylesheet" href="style.css">` を追加する。
- [x] `<body>` タグの末尾にあるインライン `<script>` タグ全体を削除する。
- [x] 削除した場所にスクリプト読み込みタグ (`p5.js`, `background.js`, `main.js` の順) を追加する。

## 3. CSS 抽出 (`style.css`)
- [x] `source.html` の `<style>` タグの中身を `style.css` に貼り付ける。

## 4. テーマデータ作成 (`themes.json`)
- [x] `source.html` の `themesByCategory` データをコピーする。
- [x] コピーしたデータを `themes.json` に貼り付け、有効なJSON形式に修正する。

## 5. JavaScript 抽出・リファクタリング

### `background.js` の作成
- [x] `source.html` から p5.js 関連コードをコピーし `background.js` に貼り付ける。
- [x] グローバルスコープにあることを確認する。

### `main.js` の修正
- [x] `source.html` からテーマ生成ロジックと初期化コードをコピーし `main.js` に貼り付ける。
- [x] `themesByCategory` 定義を削除する。
- [x] `themesData` 変数を定義する (`let themesData = {};`)。
- [x] `themes.json` を `fetch` で読み込む `loadThemes` async 関数を追加する。
- [x] コード全体を IIFE で囲む。
- [x] DOM 要素取得を `DOMContentLoaded` イベントリスナー内に移動する。
- [x] `DOMContentLoaded` イベントリスナーを `async` に変更する。
- [x] `DOMContentLoaded` 内で `await loadThemes();` を呼び出す。
- [x] データ読み込み後に `populateCategories()` とイベントリスナー設定を行う（要データ存在確認）。
- [x] `populateCategories` と `generateTheme` 内で `themesData` を参照するように変更する。
- [x] （オプション）リンターエラーを修正する。

## 6. 動作確認
- [x] ローカルで `index.html` をブラウザで開く。
- [x] カテゴリ選択、テーマ生成、背景アニメーションが正しく動作するか確認する。
- [x] 開発者ツールコンソールで `themes.json` の読み込みログを確認し、エラーがないか確認する。

## 7. Git リポジトリ準備とプッシュ
- [x] （未実行の場合）`git init` を実行する。
- [x] `git add .` または変更のあったファイル (`index.html`, `style.css`, `main.js`, `background.js`, `themes.json`, `.gitignore`, `.cursor/design.md`, `.cursor/plan.md` など) をステージングする。
- [x] `git commit -m "Refactor: Extract themes to themes.json"` (または適切なメッセージ) でコミットする。
- [x] （未実行の場合）GitHub リモートリポジトリを設定する (`git remote add origin ...`)。
- [x] （未実行の場合）ブランチ名を `main` に変更する (`git branch -M main`)。
- [x] `git push origin main` でプッシュする。

## 8. GitHub Pages デプロイ
- [x] （初回デプロイの場合）GitHub リポジトリ設定で Pages を有効にする。
- [x] （更新の場合）プッシュによる自動再デプロイを待つか、手動でトリガーする。

## 9. デプロイ確認
- [x] GitHub Pages の URL にアクセスする。
- [x] デプロイされた Web ページが正しく表示され、動作するか確認する。

