# パフォーマンス計測手順 (perf-bench)

実機 (スマホ) で 1 ラン回すと端末が温まる発熱問題を、 **オフラインで原因切り分け**
するための計測ハーネスと手順。 v1.3.7 大規模リファクタの効果計測 → v1.3.8 で
発熱原因のさらなる絞り込みに活用。 機能変更はゼロ。

## 1. dev サーバ起動時に自動表示される PerfOverlay

`yarn dev` を起動するとブラウザ右上に半透明のオーバーレイが **自動で出る** (クエリ不要)。
production ビルド (`yarn build` 出力) では絶対に表示されない (= 描画コスト 0)。

### 表示項目

| 項目 | 意味 |
|---|---|
| **FPS** | 直近 1 秒の `requestAnimationFrame` コール回数 |
| **HEAP** | Chrome のみ (`performance.memory.usedJSHeapSize`)。 MB 単位 |
| **LOOP** | useBattleLoop tick の self time (avg ms / max ms)。 1 秒平均 |
| **BUDGET** | LOOP avg を targetFps の 1 frame budget で割った % (= CPU 占有率の目安) |
| **PROJ** | 表示中 projectile event 数 |
| **ENEMIES** | DOM 内 `[data-enemy-id]` 要素数 (= 表示中の敵 sprite) |
| **DOM** | `document.getElementsByTagName('*').length` — 全 DOM ノード数 |
| **LONG** | 直近 1 秒の long task (>= 50ms) 数。 `PerformanceObserver` 経由 |

実装: [src/components/atoms/PerfOverlay/](../src/components/atoms/PerfOverlay/index.tsx) /
[src/lib/perfBus.ts](../src/lib/perfBus.ts)。 表示制御は `import.meta.env.DEV` で
行うため、 vite が dev モードかどうかで自動切替。

### 発熱原因の切り分け早見表

| 症状 | 推定原因 |
|---|---|
| BUDGET > 60% / LOOP avg が targetFps 1 frame の半分以上 | JS ゲームループが支配的。 weaponDispatch / 状態異常 / spawn / collide のいずれか |
| BUDGET 低いのに FPS < targetFps | レンダリング/合成側 (GPU compositor / paint) が遅い |
| LONG > 0 / max ms が突出 | 1 フレーム内で重い同期処理 (BigNum 演算 / wave スポーン爆発) が走っている |
| ENEMIES / DOM が際限なく増える | 削除キュー (queueRemoval) が消費されていない可能性 |
| HEAP が単調増加 | リーク。 events ref / pendingRemovals / closure 参照を疑う |

### 起動例

- ローカル dev (PC): `http://localhost:5173/tower-like-game/`
- ローカル dev (スマホ): `http://<private IP>:5173/tower-like-game/`

## 2. dev サーバへの **自動ログ送信** (v1.3.8 追加)

PerfOverlay は 1 秒ごとに上記スナップショットを `navigator.sendBeacon('/__perf', JSON)`
で Vite dev サーバに送る。 サーバ側 plugin `perfLogCollector`
([vite.config.ts](../vite.config.ts) 内) が **リポジトリ直下** の `dev-perf-log.jsonl`
に追記する。

```jsonl
2026-06-28T12:34:56.789Z {"ts":1751108096789,"fps":58,"heapMb":"42.1","loopAvgMs":3.2,"loopMaxMs":11.4,"budgetPct":19.2,"projCount":18,"enemyCount":24,"domCount":612,"longTaskCount":0,"targetFps":60,"loopCount":58,"currentTier":5,"currentWave":12,"isRunActive":true,"isPaused":false,"screenSaverOpen":false}
```

- 各行の先頭は **dev サーバ受信時刻 (ISO 文字列)** — 解析側のタイムライン基準
- 各行の本文は ServerSnapshot (PerfOverlay → sendBeacon が組み立てた JSON)
- ファイルは `.gitignore` 済 — リポジトリには絶対入らない
- production には plugin が `apply: 'serve'` で除外されるため一切混入しない

### 解析手順 (Claude Code 担当者向け)

1. ユーザがスマホで `yarn dev` (Mac で `--host 0.0.0.0` 起動) を開き、 1 ラン回す
2. Mac 側に `dev-perf-log.jsonl` が蓄積される
3. Claude が `Read /Users/<user>/work/tower-like-game/dev-perf-log.jsonl` で全行を読む
4. 各秒の FPS / BUDGET / LOOP の推移、 long task の発生時刻、 enemy 数との相関を分析
5. 発熱原因 (JS bound / paint bound / GC bound) を確定して次の改善案を提示

## 3. (任意) Chrome DevTools Performance タブでの詳細プロファイル

`PerfOverlay` だけでは絞り込めない場合の補助手段。 実機 + USB デバッグで:

1. Chrome DevTools の Performance タブを開く
2. 「Record」 を 10 秒間。 ランは通常プレイ (T1 / T5 など)
3. 観察ポイント:
   - **Scripting** (黄): rAF tick / React reconciliation / BigNum 演算
   - **Rendering** (紫): layout 再計算
   - **Painting** (緑): DOM repaint, GPU compositor
4. 必要に応じて React DevTools Profiler の Commits タブで render 回数を確認

## 4. 実機ベンチ手順

1. 端末温度を計測前に **安静状態** に戻す (5 分以上アプリ未起動)
2. ローカル dev (`yarn dev --host 0.0.0.0`) に Wi-Fi 経由でアクセス
3. T5 などボリュームのある Tier を 5 分プレイ
4. 端末背面の温度を **手で触って** 体感で記録 (温度計があれば数値で)
5. PerfOverlay の数値推移を見る + Mac 側で `dev-perf-log.jsonl` を保存
6. プレイ終了後、 jsonl を解析者 (Claude) に渡す

## 関連ドキュメント

- [design-docs/tower-like-game/10-component-architecture.md](../design-docs/tower-like-game/10-component-architecture.md) — UI コンポーネント階層
- [design-docs/tower-like-game/perf-refactor.md](../design-docs/tower-like-game/perf-refactor.md) — v1.3.7 リファクタ設計案
