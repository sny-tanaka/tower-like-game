# THE TOWER ゲーム仕様メモ

[Tower Like Game](../../) の参考資料として、オマージュ元である **THE TOWER - Idol Tower Defence**
（TechTreeGames 製のスマートフォン向けタワーディフェンス）のゲーム仕様をまとめたものです。

- 本資料は個人的なリサーチノートであり、営利目的での流用ではありません。
- 出典: 非公式 wiki [https://w.atwiki.jp/the_tower/](https://w.atwiki.jp/the_tower/)
- 各章の見出しには `（wiki #ページID）` の形で出典ページを明記しています。
- 攻略・ビルドの最適解は意図的に省き、システムの**振る舞い**と**数値仕様**に専念しています。

## 章立て

| # | ファイル | 範囲 |
|---|---|---|
| 00 | [00-overview.md](00-overview.md) | ジャンル / コアループ / ラン と meta 進行 / 画面遷移 / 単位 |
| 01 | [01-battle-screen.md](01-battle-screen.md) | バトル画面 UI / 操作 / 敵スポーン仕様 / 速度・一時停止 |
| 02 | [02-economy.md](02-economy.md) | 通貨 13 種 / ストア / マイルストーン / 取り返しのつかない要素 |
| 03 | [03-meta-upgrades.md](03-meta-upgrades.md) | 研究所（ラボ） / ワークショップ / 究極の武器 (UW / UW+) |
| 04 | [04-cards-perks.md](04-cards-perks.md) | カード（取得・装着・マスタリー） / パーク（出現率・選択） |
| 05 | [05-modules.md](05-modules.md) | 4 部位モジュール / レアリティ進化 / ユニーク・汎用エフェクト |
| 06 | [06-bots-guardians.md](06-bots-guardians.md) | BOT 5 種 / ガーディアン能力体系 |
| 07 | [07-stats-and-towers.md](07-stats-and-towers.md) | 攻撃 / 防御 / ユーティリティの能力一覧と Tier 開放 |
| 08 | [08-modes-events.md](08-modes-events.md) | 通常 / トーナメント / イベント / ウィークリー & ギルド / 呪縛 |

## Tower Like Game 実装時の参照方針

- まず [00-overview.md](00-overview.md) でコアループとラン構造を把握する。
- ランの 1 周だけ動かす MVP を作る段階では 00 / 01 / 07 のみで足りる。
- meta 進行（永続強化）を入れる段階で 02 / 03 / 04 / 05 を参照する。
- BOT / ガーディアン / モード追加は 06 / 08 を参照する。
- 本資料はあくまで参考。Tower Like Game は同じ仕様を写すのではなく、
  **コアループの面白さを再現しつつ独自のメカニクスを足す**ことを目的とする。
