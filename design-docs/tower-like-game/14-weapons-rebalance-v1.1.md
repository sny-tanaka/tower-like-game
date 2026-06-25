# 14. 武器バランス再設計 v1.1

本章は、v1.0.2 までの武器バランスを再設計し、4 武器それぞれに **明確なロール（最適場面）** を与える仕様変更をまとめる。
本書は [05-weapons.md](./05-weapons.md) の v1.1 改訂版差分仕様であり、実装完了後に 05 章本体へ反映する。

## 目的

- 4 武器がそれぞれ **特定の場面で唯一の最適解** になるよう数値を再設計する
- Lv スケールで「同時ヒット数」が伸びるとロールが崩壊しやすいため、ロールを保ったまま伸びる固有強化軸を各武器に 1 つだけ設定する
- 未使用 dead code（武器個別 CD 定数 4 個）を撤去する

## 設計方針

### ロール定義（最適場面）

| 武器 | 距離 | 単体 | 同時ヒット軸 | 最強となる場面 |
|---|---|---|---|---|
| **Laser** | 中（35%） | **最強** | pierce 固定 1 | 単体高 HP（35% 以内） |
| **Cutter** | 極近（14%） | 中 | 旋回 2 枚刃で 2 体同時 | Cutter 圏内に 2 体以上密集 |
| **Thunder** | 中（35%） | 低 | chainCount 固定 3（即時独立） | Cutter 圏外で 3 体散開 |
| **Cannon** | 遠（45%） | 中 | スプラッシュ（半円） | 遠方単体・遠方密集 |

差別化軸:
- **射程**: Cutter 14 < Laser/Thunder 35 < Cannon 45 で 3 段階
- **同時ヒット数**: Lv で増えない（固定）。各武器の同時ヒット仕様は形が違う（pierce 直線、blades 旋回、chainCount 個別落雷、splash 半円範囲）
- **武器固有 Lv 強化軸**: 「同時ヒット数」以外で 1 つ。各武器のロールを深化させる方向

## 通常攻撃 仕様（Lv 0 底値）

| 武器 | 射程% | AS | dmgMul | 単体 DPS | 同時ヒット |
|---|---|---|---|---|---|
| **Cutter** | 14 | 1.0 | 1.2 | 1.2 | blades 固定 2（2 枚刃が 180° 配置） |
| **Thunder** | 35 | 2.0 | 0.45 | 0.9 | chainCount 固定 3（独立落雷） |
| **Cannon** | 45 | 0.5 | 3.0 | 1.5 | splash 半径 30 px（後述の半円カット適用） |
| **Laser** | 35 | 2.5 | 0.8 | 2.0 | pierce 固定 1 |

### 共通 Lv スケール

| 要素 | 式 | 上限 |
|---|---|---|
| damageMul | `底値 × 1.02^Lv` | なし |
| attackPerSec | `底値 × (1 + 0.03×Lv)` | 10 attacks/sec |

### 武器固有 Lv 強化軸

各武器に 1 つだけ、ロールを深化させる強化軸を持つ。

| 武器 | 強化軸 | 式 | Lv 60 値 | 意図 |
|---|---|---|---|---|
| **Laser** | critMultiplier ボーナス | `+0.01 × Lv` | +0.6（base 1.5 → 2.1） | クリ依存の単体ピーク強化 |
| **Cutter** | Overdrive 持続秒 | `8 + 0.1 × Lv` | 14s | バーストの長期化 |
| **Thunder** | 攻撃時 HP 回復率 | `0.1% × Lv` | 6%（与ダメの 6% を回復） | サポート・タンク化（雷=電力供給の概念） |
| **Cannon** | splash 半径(px) | `30 + 0.5 × Lv` | 60 px | 巻き込み範囲の拡大 |

すべて加算式・単純数式で計算しやすい。

## 射程の管理

- v1.0.x までは `DEFAULT_RANGE = 30`（全武器共通）+ Cutter のみ `CUTTER_ORBIT_RANGE_PCT = 14` の上書き構成
- v1.1.0 では **武器別射程マップ** を 1 ヶ所に集約

```ts
export const WEAPON_RANGE_PCT: Record<WeaponType, number> = {
  cutter: 14,
  laser: 35,
  thunder: 35,
  cannon: 45,
};
```

- `useBattleLoop` の敵 in-range フィルタは `WEAPON_RANGE_PCT[currentWeapon]` を参照
- `BattleField` の索敵円の半径も同じマップから引く

## Cutter blades 仕様変更

旧仕様 `simultaneousHits = floor(1 + 0.05 × Lv)` を撤去し、`blades` 統一仕様に変更:

- `CutterStats.simultaneousHits` 廃止
- `CutterStats.blades` 追加（Lv 0 で **固定 2**、Lv で増えない）
- `cutterNormalAttack` は stats.blades を参照（旋回弧上の最大 blades 体までヒット）
- `CutterOrbitFx` の `blades` prop も stats.blades から渡し、描画と当たり判定を同期

「2 枚刃が 180° で配置される → x=60 と x=40 を同時に攻撃可能」という性質を Lv で揺らさず固定する。

## Cannon splash 半円カット仕様

着弾点の splash 範囲をマシン背面側でカットすることで、Cutter との密着時の差別化を成立させる:

- マシン位置 `(mx, my) = (50, 50)` 固定
- 着弾点 `(bx, by)`、敵 `(ex, ey)`
- splash 判定:
  - 距離: `dist((bx,by), (ex,ey)) ≤ splashRadius`
  - 半円カット: `(ex - mx)×(bx - mx) + (ey - my)×(by - my) > 0`（マシン→着弾点ベクトルと、マシン→敵ベクトルの内積が正）
- 両条件を満たす敵のみダメ対象

例: マシン x=50、x=60 へ砲撃 → x>50 にいる敵だけが splash 対象、x<50 はマシン背面なのでカット。

この仕様は **通常攻撃と Volley アクティブ両方に適用** する。

## Thunder 攻撃時 HP 回復仕様

新メカニック「ライフスティール」を追加:

- `ThunderStats.hpLifestealPct = 0.001 × Lv`（Lv 1 で 0.1%、Lv 100 で 10%）
- thunderNormalAttack / thunderPlasmaDischarge の **総ダメージ合計 × lifestealPct** を `machineHp` に加算
- 上限は `machineMaxHp`
- 上限なし（Lv 1000 で 100% lifesteal もありうるが、超合金コストカーブから現実的にはそこまで上げない）

実装:
- 武器ダメ計算後、合計ダメを useBattleLoop で集計
- thunder の場合のみ `machineHp = min(machineMaxHp, machineHp + totalDmg × lifestealPct)`

## アクティブスキル仕様

| アクティブ | v1.0.x | v1.1.0 |
|---|---|---|
| **Cutter Overdrive** | 持続 8s, AS×3 | 持続 `(8 + 0.1×Lv)s`, **AS×3 + dmgMul×3**（DPS 倍率 9） |
| **Laser Mega Beam** | 幅 6%, ×10, 貫通無限 | **幅 12%, ×50**, 貫通無限 |
| **Cannon Volley** | 5 発, ×20, splash×3 | 5 発, **×10**, splash×3, **半円カット適用** |
| **Thunder Plasma** | 7 体連鎖, ×15, ×0.9 減衰 | **全体攻撃（射程無限・連鎖廃止）, ×10** |

### CD 共通化

- v0.2.0 で既に `DEFAULT_ACTIVE_MAX_SEC = 60s` 共通化済み
- 各武器の `*CdSec` 定数（`VOLLEY_CD_SEC = 25`, `CUTTER_OVERDRIVE_CD_SEC = 35`, `LASER_MEGA_CD_SEC = 20`, `THUNDER_PLASMA_CD_SEC = 30`）は dead code → **撤去**

## Lv 60 DPS シミュレーション（検算）

共通スケール倍率: `damageMul ×3.281 (= 1.02^60)`、`AS ×2.8 (= 1+0.03×60)`、DPS 倍率 ×9.187。
machine.critRate 想定 0.2、machine.critMultiplier 基底 1.5 として計算。

| シナリオ | Cutter | Thunder | Cannon | Laser | 最強 |
|---|---|---|---|---|---|
| 単体 | 11.0 | 8.27 | 13.8 | **22.4** | Laser |
| 2 体（Cutter 範囲内） | **35.3** | 16.5 | 27.6 / 13.8（背面 1 体カット時） | 22.4 | Cutter |
| 3 体（Cutter 範囲内、blades=2 上限） | 35.3 | 24.8 | 41.4 / 27.6（背面カット時） | 22.4 | Cannon or Cutter（配置次第） |
| 3 体散開（Cutter 圏外） | — | **24.8** | 13.8〜41.4 | 22.4 | Thunder |
| 5 体密集（前方） | — | 24.8（上限） | **69.0** | 22.4 | Cannon |
| 遠方単体（35-45%） | — | — | **13.8**（唯一届く） | — | Cannon |

- Cutter は密着 2 体ロール、Cannon は半円カットで密着時に 1 体しか巻き込めない → 密着 2 体で Cutter 優位
- 3 体散開は Cutter 圏外、Cannon の splash 巻き込みが期待しにくい、Thunder の独立 3 体が刺さる
- 遠方は Cannon の独擅場

## 旧仕様からの差分サマリ

| 項目 | v1.0.x | v1.1.0 |
|---|---|---|
| Cutter AS 底値 | 2.5 | **1.0**（描画見やすさ優先） |
| Cutter damageMul 底値 | 1.2 | 維持 |
| Cutter simultaneousHits | `floor(1 + 0.05×Lv)` | **廃止** → `blades` 固定 2 |
| Cutter 旋回半径 Lv スケール | `+0.5/Lv` | **撤去**（固有強化軸は Overdrive 持続に変更） |
| Thunder AS 底値 | 2.5 | **2.0** |
| Thunder damageMul 底値 | 0.18 | **0.45** |
| Thunder lifesteal | なし | **0.1%/Lv 追加** |
| Cannon damageMul 底値 | 2.0 | **3.0** |
| Cannon splash | 全周 | **半円（マシン背面カット）** |
| Laser damageMul 底値 | 0.4 | **0.8** |
| Laser pierce | `floor(1 + 0.1×Lv)` | **固定 1** |
| Laser critMultiplier ボーナス | なし | **+0.01/Lv 追加** |
| 全武器 射程 | 30%（Cutter 14% のみ別） | 14/35/35/45 武器別マップ |
| アクティブ Cutter Overdrive | AS×3 | **AS×3 + dmgMul×3**、持続 `8 + 0.1×Lv` |
| アクティブ Laser Mega Beam | 幅 6%, ×10 | **幅 12%, ×50** |
| アクティブ Cannon Volley | ×20 | **×10**（+ 半円カット） |
| アクティブ Thunder Plasma | 7 体連鎖 ×15, ×0.9 減衰 | **全体攻撃 ×10**、連鎖廃止 |
| 各武器 `*CdSec` 定数 | dead code | **撤去** |

## 実装スコープと完了基準

1. 数値変更が全武器のテストで反映され `yarn test` 緑
2. 型チェック `yarn build:nobump` 緑
3. lint `yarn lint` 緑
4. 実機（or Storybook）で 4 武器の通常攻撃 + アクティブの動作確認
5. `yarn build`（bump あり）で `docs/` 更新、PR 作成

詳細は GitHub Issue（実装タスク分解）参照。

## 関連ファイル

- 既存仕様: [05-weapons.md](./05-weapons.md)
- 計算式: [03-machine.md](./03-machine.md) `MachineStats.critRate / critMultiplier`
- 実装本体: `src/game/weapons/{cannon,cutter,laser,thunder}.ts`
- 戦闘ループ: `src/hooks/useBattleLoop.ts`
- 描画: `src/components/fx/CutterOrbitFx/index.tsx`、`src/components/organisms/BattleField/index.tsx`
