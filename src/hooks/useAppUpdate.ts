import { useCallback, useEffect, useRef, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

// 新しいビルドが見つかったときの状態と、ユーザーが能動的に更新確認を
// トリガーする手段、そしてその結果の通知トーストの表示状態をまとめて扱うフック。
//
// useRegisterSW は内部状態が 1 つの SW 登録に紐づくため、複数箇所で呼ぶと
// 多重登録になりかねない。アプリ全体で 1 度だけマウントするようにする。

export type AppUpdateBanner =
  // 新しいビルドが利用可能 (自動チェック / 手動チェックどちらの結果でも同じ)。
  | { kind: 'has-update' }
  // 直前の手動チェックで新しいビルドが見つからなかった旨を一定時間だけ表示。
  | { kind: 'up-to-date' }
  | null;

export interface UseAppUpdateResult {
  banner: AppUpdateBanner;
  // タイトル画面の「更新を確認」ボタンから呼ぶ。
  // すでに needRefresh=true なら何もしない（バナーが既に出ている）。
  checkForUpdate: () => Promise<void>;
  // チェック中フラグ。連打防止 / ボタンの spinner 表示用。
  isChecking: boolean;
  // 更新可能になった時に呼ぶ（バナー上の「更新」ボタンから）。
  applyUpdate: () => void;
}

// 「最新です」トーストの表示時間。
const UP_TO_DATE_TOAST_MS = 2500;
// registration.update() を投げてから needRefresh が立つかどうかを待つ時間。
// SW のチェック → 比較 → installing → installed 遷移までのレイテンシ吸収。
const UPDATE_CHECK_SETTLE_MS = 1500;

export function useAppUpdate(): UseAppUpdateResult {
  // registration はあとから手動チェックで使うため ref に保持する。
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW: (_url, registration) => {
      registrationRef.current = registration ?? null;
    },
  });

  const [isChecking, setIsChecking] = useState(false);
  const [showUpToDateToast, setShowUpToDateToast] = useState(false);
  const upToDateTimerRef = useRef<number | null>(null);

  // checkForUpdate の最後で needRefresh の最新値を読みたいので、
  // state とは別に ref でも追跡する（クロージャの古い値で誤判定するのを防ぐ）。
  const needRefreshRef = useRef(needRefresh);
  useEffect(() => {
    needRefreshRef.current = needRefresh;
  }, [needRefresh]);

  const checkForUpdate = useCallback(async () => {
    if (isChecking) return;
    if (needRefreshRef.current) {
      // 既に更新ありバナーが出ているので二重表示を避ける。
      return;
    }
    setIsChecking(true);
    setShowUpToDateToast(false);
    try {
      const reg = registrationRef.current;
      if (reg) {
        await reg.update();
      }
      // SW の installing → installed → useRegisterSW 内の needRefresh=true まで
      // 1 イベントループで完結しないため、少し待ってから判定する。
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, UPDATE_CHECK_SETTLE_MS);
      });
    } catch {
      // SW 未登録 (dev モードや非対応ブラウザ) はそのまま「最新」扱いにする。
    }
    setIsChecking(false);
    // この時点で needRefresh が true なら has-update バナーが出るので
    // up-to-date トーストは出さない。
    if (!needRefreshRef.current) {
      setShowUpToDateToast(true);
      if (upToDateTimerRef.current !== null) {
        window.clearTimeout(upToDateTimerRef.current);
      }
      upToDateTimerRef.current = window.setTimeout(() => {
        setShowUpToDateToast(false);
        upToDateTimerRef.current = null;
      }, UP_TO_DATE_TOAST_MS);
    }
  }, [isChecking]);

  const applyUpdate = useCallback(() => {
    void updateServiceWorker(true);
  }, [updateServiceWorker]);

  // バナー優先度: has-update > up-to-date。
  const banner: AppUpdateBanner = needRefresh
    ? { kind: 'has-update' }
    : showUpToDateToast
      ? { kind: 'up-to-date' }
      : null;

  return { banner, checkForUpdate, isChecking, applyUpdate };
}
