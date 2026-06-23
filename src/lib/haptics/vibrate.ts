// 責務: vibrationEnabled gate + iOS Safari 非対応ガード + try/catch
import { useStore } from '@/store/index';

export function vibrate(pattern: number | number[]): void {
  const { vibrationEnabled } = useStore.getState();
  if (!vibrationEnabled) return;
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // 一部ブラウザで例外が飛ぶ場合があるためサイレントに握り潰す
  }
}
