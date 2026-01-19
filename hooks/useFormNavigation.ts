"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

/** 모달을 트리거한 액션 타입 */
export type ExitTrigger = "back" | "prev" | "next" | null;

interface UseFormNavigationOptions {
  /**
   * react-hook-form의 formState.isDirty
   * 폼에 저장되지 않은 변경사항이 있는지 여부
   */
  isDirty: boolean;

  /**
   * 이전 버튼 클릭 시 이동할 URL
   * - Step 1: 사용 안 함 (showPrev=false)
   * - Step 2: "/profile/edit/step1"
   * - ...
   */
  prevUrl: string;

  /**
   * 다음 버튼 클릭 시 이동할 URL
   * - Step 1: "/profile/edit/step2"
   * - Step 2: "/profile/edit/step3"
   * - ...
   * - Step 7: 사용 안 함 (완료 페이지로 이동)
   */
  nextUrl: string;
}

interface UseFormNavigationReturn {
  /** ExitConfirmModal 표시 여부 */
  showExitModal: boolean;

  /** ExitConfirmModal 표시 여부 설정 */
  setShowExitModal: (show: boolean) => void;

  /** 모달을 트리거한 액션 (back, prev, next) */
  exitTrigger: ExitTrigger;

  /**
   * Header 뒤로가기 버튼 핸들러
   * - isDirty=true: 모달 표시, 이후 router.back() 실행
   * - isDirty=false: 바로 router.back() 실행
   */
  handleBack: () => void;

  /**
   * FooterNav 이전 버튼 핸들러
   * - isDirty=true: 모달 표시, 이후 prevUrl로 이동
   * - isDirty=false: 바로 prevUrl로 이동
   */
  handlePrev: () => void;

  /**
   * FooterNav 다음 버튼 핸들러 (dirty check 포함)
   * - isDirty=true: 모달 표시, 이후 nextUrl로 이동
   * - isDirty=false: 바로 nextUrl로 이동
   */
  handleNextWithCheck: () => void;

  /**
   * 모달 닫고 저장된 네비게이션 실행
   * handleSaveAndExit, handleDiscardAndExit에서 사용
   */
  closeModalAndNavigate: () => void;
}

/**
 * 폼 네비게이션 로직을 관리하는 커스텀 훅
 *
 * ## 사용 목적
 * - Header 뒤로가기, FooterNav 이전/다음 버튼의 dirty check 로직 통합
 * - ExitConfirmModal 상태 관리
 * - 7개 Step 페이지에서 동일한 패턴 재사용
 *
 * ## 사용 예시
 * ```tsx
 * const {
 *   showExitModal,
 *   setShowExitModal,
 *   exitTrigger,
 *   handleBack,
 *   handlePrev,
 *   handleNextWithCheck,
 *   closeModalAndNavigate,
 * } = useFormNavigation({
 *   isDirty,
 *   prevUrl: "/profile/edit/step1",
 *   nextUrl: "/profile/edit/step3",
 * });
 *
 * // 모달: 저장 후 이동
 * const handleSaveAndExit = async () => {
 *   // "다음"에서 트리거된 경우 유효성 검증 필요
 *   if (exitTrigger === "next") {
 *     const isValid = await methods.trigger();
 *     if (!isValid) return; // 검증 실패 시 모달 유지
 *   }
 *   await saveToServer(data);
 *   reset(data);
 *   closeModalAndNavigate();
 * };
 *
 * // 모달: 저장하지 않고 이동
 * const handleDiscardAndExit = () => {
 *   closeModalAndNavigate();
 * };
 * ```
 *
 * ## 트리거별 동작
 * | 트리거 | 이동 방식 | 저장 시 검증 |
 * |--------|----------|-------------|
 * | Header ← | router.back() | 불필요 |
 * | 이전 버튼 | router.push(prevUrl) | 불필요 |
 * | 다음 버튼 | router.push(nextUrl) | 필요 |
 */
export function useFormNavigation({
  isDirty,
  prevUrl,
  nextUrl,
}: UseFormNavigationOptions): UseFormNavigationReturn {
  const router = useRouter();

  // ExitConfirmModal 표시 여부
  const [showExitModal, setShowExitModal] = useState(false);

  // 모달 확인 후 실행할 네비게이션 함수
  const [exitNavigate, setExitNavigate] = useState<(() => void) | null>(null);

  // 모달을 트리거한 액션 (검증 여부 판단에 사용)
  const [exitTrigger, setExitTrigger] = useState<ExitTrigger>(null);

  /**
   * Header 뒤로가기 버튼 핸들러
   * 브라우저 히스토리 기반으로 이동 (어디서 왔든 그곳으로)
   */
  const handleBack = useCallback(() => {
    if (isDirty) {
      setExitTrigger("back");
      setExitNavigate(() => () => router.back());
      setShowExitModal(true);
    } else {
      router.back();
    }
  }, [isDirty, router]);

  /**
   * FooterNav 이전 버튼 핸들러
   * 항상 이전 스텝으로 이동 (Step 3 → Step 2)
   */
  const handlePrev = useCallback(() => {
    if (isDirty) {
      setExitTrigger("prev");
      setExitNavigate(() => () => router.push(prevUrl));
      setShowExitModal(true);
    } else {
      router.push(prevUrl);
    }
  }, [isDirty, prevUrl, router]);

  /**
   * FooterNav 다음 버튼 핸들러 (dirty check 포함)
   * isDirty일 때만 모달 표시, 아니면 바로 이동
   */
  const handleNextWithCheck = useCallback(() => {
    if (isDirty) {
      setExitTrigger("next");
      setExitNavigate(() => () => router.push(nextUrl));
      setShowExitModal(true);
    } else {
      router.push(nextUrl);
    }
  }, [isDirty, nextUrl, router]);

  /**
   * 모달 닫고 저장된 네비게이션 실행
   * - handleSaveAndExit: 저장 완료 후 호출
   * - handleDiscardAndExit: 바로 호출
   */
  const closeModalAndNavigate = useCallback(() => {
    setShowExitModal(false);
    setExitTrigger(null);
    exitNavigate?.();
  }, [exitNavigate]);

  return {
    showExitModal,
    setShowExitModal,
    exitTrigger,
    handleBack,
    handlePrev,
    handleNextWithCheck,
    closeModalAndNavigate,
  };
}
