/**
 * BigNum の JSON シリアライズ形式。
 * 各要素は 0〜999 の整数。digits[0] が最下位 3 桁。
 * 0 は空配列 [] で表現。
 */
export type BigNumJSON = number[];
