# 既存Astro運営サイトへの移植解説書

## 1. 前提
本実装は Astro + React コンポーネントとして構築済みであり、既存Astroサイトにページ単位または埋め込み単位で移植可能。

## 2. 移植パターン

### パターンA: ページ統合
既存サイトの `src/pages/` に `audit.astro` を追加し、`App` コンポーネントを client:load で読み込む。

### パターンB: 記事内埋め込み
MDXまたはAstroページ内で `<App client:visible />` を使用し、描画負荷を軽減。

### パターンC: iframe埋め込み
本機能のみ別デプロイして、既存ブログへ iframe 埋め込み。
- 推奨最小サイズ: 960x540
- モバイル時は2カラム崩し

## 3. 手順
1. 依存追加
   - `@astrojs/react`, `react`, `react-dom`, `zustand`, `zod`, `json-logic-js`
2. `astro.config.mjs` に `react()` integration 追加
3. `src/components`, `src/engine`, `src/data`, `src/stores`, `src/types`, `src/styles` をコピー
4. `tsconfig.json` の path alias（`@/*`）を反映
5. `src/pages/index.astro` 相当を既存ルーティングへ統合

## 4. データ運用
- 現状は `src/data/cases/*.json` の静的同梱。
- 将来CMS化する場合は、読み込み層（caseLoader.ts）を API fetch に差し替えれば、UI/エンジンは流用可能。

## 5. 注意点
- 既存スタイルとの衝突回避のため、必要に応じて CSS scope 化を推奨。
- `client:load` は初回負荷が高め。記事埋め込みは `client:visible` 推奨。
- SSR不要部分はクライアント島として分離する。

## 6. 移植チェックリスト
- [ ] `npm run build` が成功する
- [ ] 判定3ボタンが動作する
- [ ] 案件遷移が可能
- [ ] 960px未満レスポンシブが崩れない
- [ ] 既存サイトテーマと視認性が両立
