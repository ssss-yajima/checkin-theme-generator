# デザイン案

## 1. 目的
`source.html` をリファクタリングし、保守性と拡張性を向上させ、GitHub Pages で公開可能な構成にする。リポジトリは軽量に保つ。

## 2. ファイル構成
```
.
├── index.html      # アプリケーションのメインHTMLファイル
├── style.css       # カスタムスタイルシート
├── main.js         # テーマ生成ロジック、DOM操作、イベントリスナー
├── background.js   # p5.js 背景アニメーション
├── themes.json     # テーマデータ (JSON形式)
├── .cursor/
│   ├── design.md   # このファイル
│   └── plan.md     # 作業手順
└── .gitignore      # Gitの無視ファイル
```
-   `p5.js` と `Tailwind CSS` は引き続きCDNを利用し、リポジトリサイズを軽量に保つ。

## 3. HTML (`index.html`)
-   `source.html` の基本的な構造を維持する。
-   `<style>` タグの内容を `style.css` に分離し、`<link rel="stylesheet" href="style.css">` で読み込む。
-   `<script>` タグの内容を `main.js` と `background.js` に分離する。
-   `<body>` タグの末尾で、p5.js CDN の後に `<script src="background.js"></script>`、続けて `<script src="main.js"></script>` を読み込む。
    -   p5.js のCDN読み込みスクリプトの後に配置する。
-   CDNリンク（p5.js, Tailwind CSS, Google Fonts）は `<head>` 内に保持する。

## 4. CSS (`style.css`)
-   `source.html` の `<style>` タグの内容をそのまま移行する。
-   Tailwind CSS でカバーできない、または上書きが必要なカスタムスタイルのみを記述する。

## 5. JavaScript (`main.js` と `background.js`)

### `main.js` (テーマ生成ロジック、DOM操作)
-   `source.html` の `<script>` 内から、テーマ生成に関連する部分（`populateCategories` 関数、`generateTheme` 関数など）を移行する。
-   `themes.json` からテーマデータを非同期 (`fetch`) で読み込む。
-   DOM 要素の取得 (`getElementById`) とイベントリスナーの設定 (`addEventListener`) をこのファイルで行う。
    ```javascript
    (function() {
      // 'use strict';

      // --- 定数定義 ---
      const themesByCategory = { /* ... */ };

      // --- DOM要素取得 ---
      // DOMContentLoadedを待ってから取得するのが安全
      let themeDisplay, generateBtn, categorySelect;

      // --- 関数定義 ---
      function populateCategories() {
        // categorySelect を使用
        /* ... */
      }
      function generateTheme() {
        // categorySelect, themeDisplay を使用
        /* ... */
      }

      // --- 初期化処理 ---
      document.addEventListener('DOMContentLoaded', async () => {
        themeDisplay = document.getElementById('themeDisplay');
        generateBtn = document.getElementById('generateBtn');
        categorySelect = document.getElementById('categorySelect');

        if (!themeDisplay || !generateBtn || !categorySelect) {
          console.error("必要なDOM要素が見つかりません。");
          return;
        }

        // テーマデータを非同期で読み込む
        await loadThemes();

        // データ読み込み後にカテゴリ生成とイベントリスナー設定
        if (Object.keys(themesData).length > 0) {
            populateCategories();
            themeDisplay.textContent = "カテゴリを選んで「テーマを決定！」ボタンを押してね！";
            generateBtn.addEventListener('click', generateTheme);
        } else {
            // エラー処理
        }
      });

    })();
    ```

### `background.js` (p5.js スケッチ)
-   `source.html` の `<script>` 内から、p5.js の背景アニメーションに関する部分 (`particles` 配列、`Particle` クラス、`setup`, `draw`, `windowResized` 関数) を移行する。
-   p5.js がグローバル関数 (`setup`, `draw`, `windowResized`) を認識できるように、これらはグローバルスコープに定義する（IIFE で囲まない）。
    ```javascript
    // --- p5.js Sketch Logic ---
    let particles = [];
    let canvas; // Define canvas variable

    // p5.jsによってグローバルスコープから呼び出される関数
    function setup() {
        canvas = createCanvas(windowWidth, windowHeight);
        canvas.parent('p5Canvas'); // index.htmlに <div id="p5Canvas"></div> が必要
        canvas.style('display', 'block');

        // ... setup 関数の残りの処理 ...
        for (let i = 0; i < 60; i++) {
            particles.push(new Particle());
        }
        colorMode(HSB, 360, 100, 100, 100);
        noStroke();
    }

    function draw() {
        // ... draw 関数の内容 ...
        background(210, 10, 15, 5);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].display();
            if (particles[i].isOffScreen()) {
                particles.splice(i, 1);
                particles.push(new Particle());
            }
        }
    }

    class Particle {
        // ... Particle クラスの内容 ...
        constructor() {
            this.pos = createVector(random(width), random(height));
            this.vel = createVector(random(-0.3, 0.3), random(0.5, 1.5) * (random() > 0.5 ? 1 : -1));
            this.size = random(5, 30);
            this.baseHue = random(180, 280);
            this.hue = this.baseHue + random(-20, 20);
            this.saturation = random(50, 90);
            this.brightness = random(80, 100);
            this.alpha = random(20, 70);
        }

        update() {
            this.pos.add(this.vel);
            this.pos.x += sin(frameCount * 0.02 + this.pos.y * 0.05) * 0.3;
            this.hue = (this.baseHue + this.pos.y * 0.05) % 360;
        }

        display() {
            fill(this.hue, this.saturation, this.brightness, this.alpha);
            ellipse(this.pos.x, this.pos.y, this.size, this.size);
        }

        isOffScreen() {
            return (
                this.pos.x < -this.size ||
                this.pos.x > width + this.size ||
                this.pos.y < -this.size ||
                this.pos.y > height + this.size
            );
        }
    }

    function windowResized() {
        // ... windowResized 関数の内容 ...
        resizeCanvas(windowWidth, windowHeight);
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push(new Particle());
        }
    }
    ```

### `themes.json` (テーマデータ)
-   テーマのカテゴリとそのカテゴリに属する質問リストをJSON形式で格納する。
-   キーがカテゴリ名（文字列）、値が質問リスト（文字列の配列）。
    ```json
    {
      "カテゴリ名1": [
        "質問1",
        "質問2"
      ],
      "カテゴリ名2": [
        "質問3",
        "質問4"
      ]
      // ... 他のカテゴリ
    }
    ```

## 6. GitHub Pages デプロイ
-   リポジトリのルートに `index.html` を配置する。
-   GitHub リポジトリの設定で、`main` ブランチのルートディレクトリからデプロイするように構成する。 
