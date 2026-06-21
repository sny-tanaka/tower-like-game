#!/bin/bash

# .node-version ファイルが存在するか確認
if [ ! -f .node-version ]; then
  echo ".node-version ファイルが見つかりません。"
  exit 1
fi

# .node-version ファイルから指定された Node.js バージョンを読み取る
desired_version=$(cat .node-version)
desired_major="${desired_version%%.*}"

# 実際の Node.js バージョンを取得
current_version=$(node --version | cut -c 2-)
current_major="${current_version%%.*}"

# メジャーバージョンが一致するか確認（パッチ違いは許容）
if [ "$desired_major" != "$current_major" ]; then
  echo "エラー: Node.js のメジャーバージョンが一致しません。"
  echo "指定 (.node-version): $desired_version"
  echo "現在 (node --version): $current_version"
  exit 1
fi

echo "Node Version Check OK ($current_version, expects major $desired_major)"
