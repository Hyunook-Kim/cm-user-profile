"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormNavigation } from "@/hooks/useFormNavigation";
import { saveStepData, getStepData } from "@/lib/api/profile";
import Image from "next/image";
import Header from "@/components/layout/Header";
import ProgressBar from "@/components/layout/ProgressBar";
import Title from "@/components/layout/Title";
import ContentFooter from "@/components/layout/ContentFooter";
import FooterNav from "@/components/layout/FooterNav";
import ExitConfirmModal from "@/components/common/ExitConfirmModal";
import RadioGroup from "@/components/form/RadioGroup";
import {
  step7Schema,
  step7DefaultValues,
  Step7FormData,
  loveLanguageOptions,
} from "@/models/step7Form";
import SectionTitle from "@/components/ui/SectionTitle";

// Supabase 저장 함수
const saveToServer = async (data: Step7FormData) => {
  console.log("[Step7] 저장 시작:", data);
  const result = await saveStepData(7, data);
  console.log("[Step7] 저장 결과:", result);
  if (!result.success) {
    throw new Error(result.error);
  }
};

// 메인화면 추천 옵션
const mainRecommendationOptions = [
  { value: "want", label: "원한다" },
  { value: "notWant", label: "원하지 않는다" },
];

// 같은 교회 소개 옵션
const sameChurchOptions = [
  { value: "want", label: "원한다" },
  { value: "notWant", label: "원하지 않는다" },
];

// 메인화면 추천 설명 텍스트
const mainRecommendationDescriptions: Record<
  string,
  { text: string; color: string }
> = {
  want: {
    text: "심사 후 선정 되신 분들에 한하여 공개되며, 이름·연락처·교회명·직장명은 비공개 처리됩니다.",
    color: "text-gray-300",
  },
  notWant: {
    text: "비공개 매니저 매칭으로 진행됩니다.",
    color: "text-pink",
  },
};

export default function Step7Page() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const methods = useForm<Step7FormData>({
    resolver: zodResolver(step7Schema),
    defaultValues: step7DefaultValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty },
  } = methods;

  const loveLanguageRanking = watch("loveLanguageRanking");
  const mainRecommendation = watch("mainRecommendation");

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
    prevUrl: "/profile/edit/step6",
    // Step 7이 마지막 단계 - 완료 페이지로 이동
    nextUrl: "/profile/complete",
  });

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      console.log("[Step7] 데이터 로드 시작");
      const savedData = await getStepData<Step7FormData>(7);
      console.log("[Step7] 로드된 데이터:", savedData);
      if (savedData) {
        reset(savedData);
        console.log("[Step7] reset 완료");
      } else {
        console.log("[Step7] 저장된 데이터 없음");
      }
      setIsLoading(false);
    };
    loadData();
  }, [reset]);

  // 드래그 시작
  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  // 드래그 오버
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // 드롭
  const handleDrop = useCallback(
    (dropIndex: number) => {
      if (draggedIndex === null || draggedIndex === dropIndex) {
        setDraggedIndex(null);
        return;
      }

      const newRanking = [...loveLanguageRanking];
      const [removed] = newRanking.splice(draggedIndex, 1);
      newRanking.splice(dropIndex, 0, removed);

      setValue("loveLanguageRanking", newRanking, { shouldDirty: true });
      setDraggedIndex(null);
    },
    [draggedIndex, loveLanguageRanking, setValue],
  );

  // 저장 (페이지 유지)
  const handleSave = async (data: Step7FormData) => {
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

  // loveLanguageOptions를 id 기반으로 찾기
  const getLoveLanguageById = (id: string) => {
    return loveLanguageOptions.find((option) => option.id === id);
  };

  return (
    <>
      <Header onBack={handleBack} />
      <ProgressBar step={7} totalSteps={7} />
      <main className="flex flex-col items-start gap-[18px] overflow-y-auto bg-gray-100 p-4 pb-[96px]">
        <FormProvider {...methods}>
          <Title title="추가정보" step={7} />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-[18px] self-stretch"
          >
            {/* Section 1: 사랑의 언어 */}
            <section className="flex flex-col gap-3">
              {/* Section Title */}
              {/* <div className="flex items-center gap-3">
                <span className="text-body-lg text-black">사랑의 언어</span>
                <span className="text-caption-lg text-pink">
                  *드래그하여 순위 변경
                </span>
              </div> */}
              <SectionTitle
                title="사랑의 언어"
                subtitle="드래그하여 순위 변경"
              />

              {/* Draggable List */}
              <div className="flex flex-col gap-1">
                {loveLanguageRanking.map((id, index) => {
                  const option = getLoveLanguageById(id);
                  if (!option) return null;

                  return (
                    <div
                      key={option.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                      className={`flex cursor-grab items-center gap-3 rounded-lg border bg-white p-3 active:cursor-grabbing ${
                        draggedIndex === index
                          ? "border-pink opacity-50"
                          : "border-gray-200"
                      }`}
                    >
                      {/* Leading Icon */}
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                        <Image
                          src={`/icons/love-language/${option.icon}.svg`}
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>

                      {/* Text Area */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-caption-lg text-pink">
                            {index + 1}위
                          </span>
                          <span className="text-caption-lg text-gray-800">
                            {option.label}
                          </span>
                        </div>
                        <span className="text-caption-md text-gray-500">
                          {option.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 2: 기타 */}
            <section className="flex flex-col gap-3">
              {/* Section Title */}
              <SectionTitle title="기타" />

              {/* Card Group */}
              <div className="flex flex-col">
                {/* Card 1: 메인화면 추천 */}
                <div className="flex flex-col gap-3 rounded-t-lg border border-gray-100 bg-white px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-body-lg text-black">
                      회원님의 프로필이 메인화면에 추천 되길 원하시나요?
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Controller
                      name="mainRecommendation"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          options={mainRecommendationOptions}
                          value={field.value}
                          onChange={field.onChange}
                          name="mainRecommendation"
                          layout="vertical"
                        />
                      )}
                    />

                    {/* 조건부 설명 텍스트 */}
                    {mainRecommendation && (
                      <p
                        className={`mt-2 text-body-md ${mainRecommendationDescriptions[mainRecommendation].color}`}
                      >
                        {
                          mainRecommendationDescriptions[mainRecommendation]
                            .text
                        }
                      </p>
                    )}
                  </div>
                </div>

                {/* Card 2: 같은 교회 소개 */}
                <div className="flex flex-col gap-3 rounded-b-lg border border-t-0 border-gray-100 bg-white px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-body-lg text-black">
                      같은 교회 이성 회원님도 소개를 원하시나요?
                    </span>
                  </div>

                  <Controller
                    name="sameChurchIntro"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        options={sameChurchOptions}
                        value={field.value}
                        onChange={field.onChange}
                        name="sameChurchIntro"
                        layout="vertical"
                      />
                    )}
                  />
                </div>
              </div>
            </section>

            {/* Footer 안내 텍스트 */}
            <p className="text-body-md text-gray-800">
              회원 승인이 되기까지 당일~4일의 시간이 소요됩니다.
            </p>
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
        variant="final"
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
