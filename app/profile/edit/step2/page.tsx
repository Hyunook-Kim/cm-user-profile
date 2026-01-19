"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormNavigation } from "@/hooks/useFormNavigation";
import { saveStepData, getStepData } from "@/lib/api/profile";
import Header from "@/components/layout/Header";
import ProgressBar from "@/components/layout/ProgressBar";
import Title from "@/components/layout/Title";
import ContentFooter from "@/components/layout/ContentFooter";
import FooterNav from "@/components/layout/FooterNav";
import ExitConfirmModal from "@/components/common/ExitConfirmModal";
import Card from "@/components/form/Card";
import TextArea from "@/components/form/TextArea";
import { step2Schema, step2DefaultValues, Step2FormData } from "@/models/step2Form";

// Supabase 저장 함수
const saveToServer = async (data: Step2FormData) => {
  console.log("[Step2] 저장 시작:", data);
  const result = await saveStepData(2, data);
  console.log("[Step2] 저장 결과:", result);
  if (!result.success) {
    throw new Error(result.error);
  }
};

// 카드 설정 (라벨, 필드명, TextArea 높이)
const cardConfigs = [
  { label: "나를 한줄로 표현한다면?", field: "oneLiner" as const, height: 72 },
  { label: "신앙을 갖게 된 계기는 어떻게 되시나요?", field: "faithStory" as const, height: 150 },
  { label: "좋아하는 CCM / 성경구절은 무엇인가요?", field: "ccmVerse" as const, height: 192 },
  { label: "나에게 예수님이란 어떤 분이신가요?", field: "jesusToMe" as const, height: 150 },
  { label: "내 외모는 어떤 특징이 있어요.", field: "appearance" as const, height: 192 },
  { label: "휴일은 이렇게 보내요.", field: "holiday" as const, height: 480 },
  { label: "이성 친구가 생기면 하고 싶은 데이트는요.", field: "dateIdea" as const, height: 384 },
  { label: "이런 연인을 찾아요.", field: "idealType" as const, height: 312 },
];

export default function Step2Page() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const methods = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: step2DefaultValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  // 폼 네비게이션 (dirty check + 모달)
  const {
    showExitModal,
    setShowExitModal,
    exitTrigger,
    handleBack,
    handlePrev,
    handleNextWithCheck,
    closeModalAndNavigate,
  } = useFormNavigation({
    isDirty,
    prevUrl: "/profile/edit/step1",
    nextUrl: "/profile/edit/step3",
  });

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      console.log("[Step2] 데이터 로드 시작");
      const savedData = await getStepData<Step2FormData>(2);
      console.log("[Step2] 로드된 데이터:", savedData);
      if (savedData) {
        reset(savedData);
        console.log("[Step2] reset 완료");
      } else {
        console.log("[Step2] 저장된 데이터 없음");
      }
      setIsLoading(false);
    };
    loadData();
  }, [reset]);

  // 저장 (페이지 유지)
  const handleSave = async (data: Step2FormData) => {
    setIsSaving(true);
    try {
      await saveToServer(data);
      reset(data);
      console.log("저장 완료");
    } catch (error) {
      console.error("저장 실패:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // 모달: 저장 후 이동
  const handleSaveAndExit = async () => {
    if (exitTrigger === "next") {
      const isValid = await methods.trigger();
      if (!isValid) {
        console.error("유효성 검증 실패");
        return;
      }
    }

    const data = methods.getValues();
    setIsSaving(true);
    try {
      await saveToServer(data);
      reset(data);
      closeModalAndNavigate();
    } catch (error) {
      console.error("저장 실패:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // 모달: 저장하지 않고 이동
  const handleDiscardAndExit = () => {
    closeModalAndNavigate();
  };

  // 유효성 검증 실패 시
  const onValidationError = (errors: unknown) => {
    console.error("유효성 검증 실패:", errors);
  };

  return (
    <>
      <Header onBack={handleBack} />
      <ProgressBar step={2} totalSteps={7} />
      <main className="flex flex-col items-start gap-[18px] overflow-y-auto bg-gray-100 p-4 pb-[96px]">
        <FormProvider {...methods}>
          <Title title="나의 소개" step={2} subtitle="*모든 항목이 필수입니다." />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-0 self-stretch"
          >
            {cardConfigs.map((config) => (
              <Card key={config.field} label={config.label}>
                <Controller
                  name={config.field}
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      value={field.value}
                      onChange={field.onChange}
                      height={config.height}
                    />
                  )}
                />
              </Card>
            ))}
          </form>

          <ContentFooter />
        </FormProvider>
      </main>

      <FooterNav
        showPrev={true}
        onPrev={handlePrev}
        onSave={() => handleSubmit(handleSave, onValidationError)()}
        onNext={handleNextWithCheck}
        isSaving={isSaving}
      />

      <ExitConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onSave={handleSaveAndExit}
        onDiscard={handleDiscardAndExit}
        isSaving={isSaving}
      />
    </>
  );
}
