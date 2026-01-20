"use client";

import { useState, useEffect } from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
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
import InputCardTextArea from "@/components/form/InputCardTextArea";
import {
  step4Schema,
  step4DefaultValues,
  Step4FormData,
} from "@/models/step4Form";

// Supabase 저장 함수
const saveToServer = async (data: Step4FormData) => {
  console.log("[Step4] 저장 시작:", data);
  const result = await saveStepData(4, data);
  console.log("[Step4] 저장 결과:", result);
  if (!result.success) {
    throw new Error(result.error);
  }
};

// 카드 설정 (라벨, 필드명, TextArea 높이)
// 피그마 스펙: docs/figma_specs/4_관심사항/body_screen.png 참조
const cardConfigs = [
  {
    label:
      "교회/선교 단체에서 섬겼던 역할 및 활동과 느낀점이 있다면 소개해주세요.",
    field: "churchRole" as const,
    height: 216,
  },
  {
    label: "본인의 평소 신앙생활을 소개해주세요.",
    field: "faithLife" as const,
    height: 216,
  },
  {
    label: "스스로가 가장 매력적이라 느끼는 순간은?",
    field: "attractiveMoment" as const,
    height: 192,
  },
  {
    label: "친구들이 말하는 본인은 어떤 사람인가요?",
    field: "question4" as const,
    height: 192,
  },
  {
    label: "인생에서 가장 중요하게 생각하는 가치는 무엇인가요?",
    field: "question5" as const,
    height: 168,
  },
  {
    label: "현재 일하고 있는 곳의 좋은 점을 말씀해주세요.",
    field: "question6" as const,
    height: 168,
  },
  {
    label: "평소 취미나 스트레스를 푸는 방법이 있다면?",
    field: "question7" as const,
    height: 150,
  },
  {
    label: "본인만의 자산 관리 방법은?",
    field: "question8" as const,
    height: 150,
  },
  {
    label: "연인과 갈등이 있을 때 극복방법은?",
    field: "question9" as const,
    height: 192,
  },
  {
    label: "내가 생각하는 행복한 가정이나 연애는?",
    field: "question10" as const,
    height: 150,
  },
  {
    label: "내가 바라는 연인의 거, 기도제목은?",
    field: "question11" as const,
    height: 192,
  },
];

export default function Step4Page() {
  const [isSaving, setIsSaving] = useState(false);

  const methods = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: step4DefaultValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  // 동적 질문 카드 배열 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicQuestions",
  });

  // 질문 추가하기
  const handleAddQuestion = () => {
    append({ title: "", content: "" });
  };

  // 추가 질문 초기화 (동적 카드 모두 삭제)
  const handleResetQuestions = () => {
    // 모든 동적 카드 삭제 (인덱스 역순으로 삭제)
    for (let i = fields.length - 1; i >= 0; i--) {
      remove(i);
    }
  };

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
    // TODO: step3(사진업로드) 개발 후 "/profile/edit/step3"으로 변경
    prevUrl: "/profile/edit/step2",
    nextUrl: "/profile/edit/step5",
  });

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      console.log("[Step4] 데이터 로드 시작");
      const savedData = await getStepData<Step4FormData>(4);
      console.log("[Step4] 로드된 데이터:", savedData);
      if (savedData) {
        reset(savedData);
        console.log("[Step4] reset 완료");
      } else {
        console.log("[Step4] 저장된 데이터 없음");
      }
    };
    loadData();
  }, [reset]);

  // 저장 (페이지 유지)
  const handleSave = async (data: Step4FormData) => {
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
      <ProgressBar step={4} totalSteps={7} />
      <main className="flex flex-col items-start gap-[18px] overflow-y-auto bg-gray-100 p-4 pb-[96px]">
        <FormProvider {...methods}>
          <Title
            title="매력어필"
            step={4}
            subtitle="*모든 항목이 필수입니다."
          />

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
                    <InputCardTextArea
                      value={field.value}
                      onChange={field.onChange}
                      height={config.height}
                    />
                  )}
                />
              </Card>
            ))}

            {/* 동적 질문 카드 (사용자가 추가한 질문들) */}
            {/* 피그마 스펙: titleHeight=72px, contentHeight=48px */}
            {fields.map((field, index) => (
              <DynamicQuestionCard
                key={field.id}
                control={control}
                index={index}
                titleHeight={72}
                contentHeight={48}
              />
            ))}

            {/* 동적 질문 관리 버튼 그룹 */}
            <div className="flex w-full gap-0">
              <button
                type="button"
                onClick={handleResetQuestions}
                className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg border border-gray-100 bg-white px-3 py-2"
              >
                <img
                  src="/icons/basic/refresh-line.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="text-[14px] font-extralight leading-[20px] text-gray-800">
                  추가 질문 초기화
                </span>
              </button>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg border border-gray-100 bg-white px-3 py-2"
              >
                <img
                  src="/icons/basic/add-line.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="text-[14px] font-extralight leading-[20px] text-gray-800">
                  질문 추가하기
                </span>
              </button>
            </div>
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
        variant="middle"
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

// 동적 질문 카드 컴포넌트 (사용자 추가 질문용)
// 정적 카드와 동일한 TextArea 컴포넌트 재사용
interface DynamicQuestionCardProps {
  control: ReturnType<typeof useForm<Step4FormData>>["control"];
  index: number;
  titleHeight: number;
  contentHeight: number;
  disabled?: boolean;
}

function DynamicQuestionCard({
  control,
  index,
  titleHeight,
  contentHeight,
  disabled = false,
}: DynamicQuestionCardProps) {
  return (
    <div className="flex flex-col gap-3 self-stretch rounded-lg border border-gray-100 bg-white p-6">
      {/* 제목 입력 (삭제 아이콘 없음) */}
      <Controller
        name={`dynamicQuestions.${index}.title`}
        control={control}
        render={({ field }) => (
          <InputCardTextArea
            value={field.value || ""}
            onChange={field.onChange}
            placeholder="스스로를 어필할 수 있는 셀프 질문 및 답변을 적어보세요."
            disabled={disabled}
            height={titleHeight}
            showClearIcon={false}
          />
        )}
      />

      {/* 내용 입력 (삭제 아이콘 있음 - TextArea 컴포넌트 재사용) */}
      <Controller
        name={`dynamicQuestions.${index}.content`}
        control={control}
        render={({ field }) => (
          <InputCardTextArea
            value={field.value || ""}
            onChange={field.onChange}
            placeholder="답변을 작성해주세요."
            disabled={disabled}
            height={contentHeight}
            showClearIcon={true}
          />
        )}
      />
    </div>
  );
}
