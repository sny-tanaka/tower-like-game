# パフォーマンス計測手順 (perf-bench)

v1.3.7 大規模リファクタの効果を **客観計測** するためのハーネスと手順。 機能変更はゼロ。

## 1. `?debug=perf` で perf overlay を起動

URL に `?debug=perf` を付けるとブラウザ右上に半透明の overlay が出る。 表示項目:

| 項目 | 内容 |
|---|---|
| **FPS** | 直近 1 秒の `requestAnimationFrame` コール回数 (rolling window) |
| **HEAP** | Chrome 限定 (`performance.memory.usedJSHeapSize`)。 MB 単位 |
| **ENEMIES** | DOM 内の `[data-enemy-id]` 要素数 (= 描画中の敵 sprite 数) |

実装は [src/components/atoms/PerfOverlay/](../src/components/atoms/PerfOverlay/index.tsx)。 `?debug=perf` 無しでは null を返すので production への影響ゼロ。

### 起動例

- ローカル dev: `http://192.168.x.x:5173/tower-like-game/?debug=perf`
- 本番 (GitHub Pages): `https://sny-tanaka.github.io/tower-like-game/?debug=perf`

## 2. Chrome DevTools Performance での詳細計測

実機 + USB デバッグで以下を取る:

1. Chrome DevTools の Performance タブを開く
2. 「Record」 を 10 秒間。 ランは通常プレイ (T1 / T5 など)
3. 観察ポイント:
   - **Scripting** (黄): rAF tick / React reconciliation / BigNum 演算
   - **Rendering** (紫): layout 再計算
   - **Painting** (緑): DOM repaint, GPU compositor
   - **Total commits per frame**: React DevTools Profiler の Commits タブ
4. 各 phase 後に同条件で 1 回ずつ取って比較

### 主要な観察対象

- `useBattleLoop` の tick callback のセルフ時間 → ロジック負荷
- React `commitLayoutEffects` / `commitMutationEffects` の数 → render コスト
- `layout` の頻度と要素数 → DOM 描画コスト (敵 sprite の inline style 更新)
- GC (`MinorGC` / `MajorGC`) → heap allocation コスト

## 3. v1.3.7 各 Phase の目標値

| Phase | 目標 |
|---|---|
| **Phase 0 (今回)** | ベースライン取得。 fps が 60 上限で安定、 5 分プレイで heap が 60MB 以下に収まる程度 |
| **Phase 1 (EntityStore 導入)** | 機能変更なし。 同じ fps / heap を維持できれば OK |
| **Phase 2 (BattleField 直接 subscribe)** | Page の re-render が 1 ラン中 10 回以下 |
| **Phase 3 (mutable + CSS 変数 transform)** | scripting -30〜50%、 layout/paint ほぼゼロ |
| **Phase 4 (Page useStore 分散)** | Page render が 1 ラン中 5 回以下 |
| **Phase 5 (量子化)** | 実機 5 分プレイで端末温度が前 phase より体感低下 |

## 4. 実機ベンチ手順

スマホ (iOS / Android) で:

1. 端末温度を計測前に **安静状態** に戻す (5 分以上アプリ未起動)
2. ローカル dev に Wi-Fi 経由でアクセスし `?debug=perf` で起動
3. T5 などボリュームのある Tier を 5 分プレイ
4. 端末背面の温度を **手で触って** 体感で記録 (温度計があれば数値で)
5. perf overlay の FPS / HEAP の推移を記録
6. プレイ終了後、 Performance タブで profile を保存

各 phase 後に同手順で再測定して比較する。 体感とプロファイル両方で改善を確認できれば次 phase へ進む。

## 関連ドキュメント

- [design-docs/tower-like-game/10-component-architecture.md](../design-docs/tower-like-game/10-component-architecture.md) — UI コンポーネント階層
- [design-docs/tower-like-game/perf-refactor.md](../design-docs/tower-like-game/perf-refactor.md) — v1.3.7 リファクタ設計案
