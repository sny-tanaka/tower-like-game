# コンポーネント設計ガイド

本リポジトリの UI は **Atomic Design** の階層でコンポーネント単位に構築する。
画面を 1 枚静的に作ることは禁止。Atom → Molecule → Organism → Page の順で合成する。

詳細仕様: [`design-docs/tower-like-game/10-component-architecture.md`](../../design-docs/tower-like-game/10-component-architecture.md) / [`13-design-handoff.md`](../../design-docs/tower-like-game/13-design-handoff.md)

---

## 1. 階層の役割

| 階層 | ディレクトリ | 役割 |
|---|---|---|
| **Atom** | `atoms/` | これ以上分解しない最小 UI Primitive。状態を持たず、props だけで制御する。 |
| **Molecule** | `molecules/` | 複数 Atom を組み合わせた 1 機能単位。状態は基本的に外から渡す。 |
| **Organism** | `organisms/` | 複数 Molecule の塊。1 つのドメイン機能を担い、Zustand store からデータを引いてよい。 |
| **Fx** | `fx/` | CSS アニメーション・演出を 1 つだけ閉じ込めたエフェクトコンポーネント。詳細は後述。 |

> Page (`src/pages/<Screen>/`) はここには置かない。Organism を配置するだけの薄いレイヤー。

---

## 2. コンポーネント追加手順

### 2-1. 階層の選択

新規 UI を追加する前に、**既存の Atom / Molecule で組めないか必ず確認する**。
該当するものがなければ、最小単位を Atom として切り出してから上位層に合成する。

### 2-2. ディレクトリとファイル構成

該当階層のディレクトリ配下に `PascalCase` 名でフォルダを作り、以下の 4 ファイル構成で置く。

```
src/components/atoms/Button/
  index.tsx           ← コンポーネント本体 + props 型定義
  style.module.scss   ← スタイル（デザイントークンは var(--*) 経由）
  index.stories.tsx   ← Storybook ストーリー
  index.test.tsx      ← 単体テスト（ロジックがある場合）
```

### 2-3. props 型の命名

props 型は `<Name>Props` という名前で、同ファイル内に定義して export する。

```tsx
// index.tsx
export type ButtonProps = {
  label: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({ label, variant, disabled, onClick }: ButtonProps) => { ... };
```

---

## 3. import 規約

- **色・余白・タイポグラフィは必ず `var(--*)` トークン経由**で指定する。
- SCSS ファイルに色コード・px 値を直書きすることは禁止。
- デザイントークンの定義は `src/styles/` 配下の CSS カスタムプロパティ / SCSS 変数を参照。

```scss
/* OK */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-md);
  font-size: var(--font-size-body);
}

/* NG — 値の直書き禁止 */
.button {
  background-color: #00e5ff;
  padding: 12px;
}
```

---

## 4. アニメーション規約

- **`@keyframes` / `animation:` は `fx/` 内のコンポーネントにのみ書く**。
  Atom / Molecule / Organism の SCSS には絶対に書かない。
- **例外**: コンポーネント固有のスライド / フェード（Sheet / Overlay / ConfirmDialog / Toast / TabBar / AppShell など）は当該コンポーネント内に持ってよい（`13-design-handoff.md` 参照）。

### Fx コンポーネントのルール

- 命名は末尾 `Fx`（例: `DamagePopFx`, `LevelUpFx`, `ScreenShakeFx`）。
- **マウント = 再生開始、アンマウント = 停止**。Fx 内に「再生中フラグ」は持たない。
- 再生し直す場合は親が `key` を変えて **再マウント**する。
- 完了通知は `onDone` props として `onAnimationEnd` / `onTransitionEnd` で伝える。
- `prefers-reduced-motion` を Fx 内で考慮すること。
- 新規作成前に `src/components/fx/` に同種のものがないか確認し、props で吸収できる場合は既存を再利用する。

---

## 5. Storybook

| 階層 | ストーリー要否 |
|---|---|
| Atom | **必須**（全 props バリアント + disabled + edge case）|
| Molecule | **必須**（主要状態を網羅）|
| Organism | 主要状態のみ（複雑な store モックが必要な場合は省略可）|
| Fx | 可能な範囲で追加（アニメーション確認用）|

ストーリーファイルは各コンポーネントフォルダ内の `index.stories.tsx` に配置する。

---

## 6. 参照ドキュメント

- コンポーネント役割・props 一覧: [`design-docs/tower-like-game/10-component-architecture.md`](../../design-docs/tower-like-game/10-component-architecture.md)
- デザインハンドオフ・実装規約: [`design-docs/tower-like-game/13-design-handoff.md`](../../design-docs/tower-like-game/13-design-handoff.md)
