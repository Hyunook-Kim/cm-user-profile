"use client";

import { useState, useEffect, useCallback } from "react";
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
import {
  step6Schema,
  step6DefaultValues,
  Step6FormData,
  hobbyCategories,
  exerciseCategories,
  interestCategories,
} from "@/models/step6Form";

// Supabase 저장 함수
const saveToServer = async (data: Step6FormData) => {
  console.log("[Step6] 저장 시작:", data);
  const result = await saveStepData(6, data);
  console.log("[Step6] 저장 결과:", result);
  if (!result.success) {
    throw new Error(result.error);
  }
};

// 태그 버튼 컴포넌트 (라이프스타일 스타일)
interface LifestyleTagProps {
  label: string;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  variant?: "hobby" | "exercise" | "interest";
}

function LifestyleTag({
  label,
  isSelected,
  isDisabled,
  onClick,
  variant = "hobby",
}: LifestyleTagProps) {
  // 취미 섹션: 미선택 시 회색 배경
  // 운동/관심사 섹션: 미선택 시 흰색 배경 + 회색 테두리
  const baseStyles =
    "flex items-center px-3 py-2 rounded-full text-caption-md transition-colors";

  let stateStyles = "";
  if (isSelected) {
    stateStyles = "bg-white border border-pink text-pink";
  } else if (isDisabled) {
    stateStyles =
      variant === "hobby"
        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
        : "bg-white border border-gray-200 text-gray-300 cursor-not-allowed";
  } else {
    stateStyles =
      variant === "hobby"
        ? "bg-gray-100 text-gray-300"
        : "bg-white border border-gray-200 text-gray-800";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled && !isSelected}
      className={`${baseStyles} ${stateStyles}`}
    >
      {label}
    </button>
  );
}

// 섹션 타이틀 컴포넌트
interface SectionTitleProps {
  title: string;
  maxCount: number;
  currentCount: number;
}

function SectionTitle({ title, maxCount, currentCount }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-body-lg text-black">{title}</span>
        <span className="text-caption-lg text-pink">*최대 {maxCount}개</span>
      </div>
      <div className="flex items-center justify-center rounded bg-navy px-2 py-2">
        <span className="text-caption-md text-white">
          선택 {currentCount}개
        </span>
      </div>
    </div>
  );
}

// 카테고리 카드 컴포넌트
interface CategoryCardProps {
  label: string;
  tags: string[];
  selectedTags: string[];
  maxSelect: number;
  onToggle: (tag: string) => void;
  variant?: "hobby" | "exercise" | "interest";
  isFirst?: boolean;
  isLast?: boolean;
}

function CategoryCard({
  label,
  tags,
  selectedTags,
  maxSelect,
  onToggle,
  variant = "hobby",
  isFirst = false,
  isLast = false,
}: CategoryCardProps) {
  const isMaxReached = selectedTags.length >= maxSelect;

  const roundedClass =
    isFirst && isLast
      ? "rounded-lg"
      : isFirst
        ? "rounded-t-lg"
        : isLast
          ? "rounded-b-lg"
          : "";

  const borderClass = isFirst ? "border" : "border border-t-0";

  return (
    <div
      className={`flex flex-col gap-3 bg-white p-5 ${roundedClass} ${borderClass} border-gray-100`}
    >
      <span className="text-caption-lg text-black">{label}</span>
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const isDisabled = !isSelected && isMaxReached;

          return (
            <LifestyleTag
              key={tag}
              label={tag}
              isSelected={isSelected}
              isDisabled={isDisabled}
              onClick={() => onToggle(tag)}
              variant={variant}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Step6Page() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const methods = useForm<Step6FormData>({
    resolver: zodResolver(step6Schema),
    defaultValues: step6DefaultValues,
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

  const hobbies = watch("hobbies");
  const exercises = watch("exercises");
  const interests = watch("interests");

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
    prevUrl: "/profile/edit/step5",
    nextUrl: "/profile/edit/step7",
  });

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      console.log("[Step6] 데이터 로드 시작");
      const savedData = await getStepData<Step6FormData>(6);
      console.log("[Step6] 로드된 데이터:", savedData);
      if (savedData) {
        reset(savedData);
        console.log("[Step6] reset 완료");
      } else {
        console.log("[Step6] 저장된 데이터 없음");
      }
      setIsLoading(false);
    };
    loadData();
  }, [reset]);

  // 태그 토글 핸들러 생성 함수
  const createToggleHandler = useCallback(
    (
      fieldName: "hobbies" | "exercises" | "interests",
      currentValues: string[],
      maxSelect: number,
    ) => {
      return (tag: string) => {
        const isSelected = currentValues.includes(tag);

        if (isSelected) {
          setValue(
            fieldName,
            currentValues.filter((v) => v !== tag),
            { shouldDirty: true },
          );
        } else {
          if (currentValues.length < maxSelect) {
            setValue(fieldName, [...currentValues, tag], { shouldDirty: true });
          }
        }
      };
    },
    [setValue],
  );

  // 저장 (페이지 유지)
  const handleSave = async (data: Step6FormData) => {
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

  const hobbyCateg = Object.values(hobbyCategories);
  const exerciseCateg = Object.values(exerciseCategories);
  const interestCateg = Object.values(interestCategories);

  return (
    <>
      <Header onBack={handleBack} />
      <ProgressBar step={6} totalSteps={7} />
      <main className="flex flex-col items-start gap-[18px] overflow-y-auto bg-gray-100 p-4 pb-[96px]">
        <FormProvider {...methods}>
          <Title title="라이프스타일" step={6} />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-[18px] self-stretch"
          >
            {/* Section 1: 취미 */}
            <section className="flex flex-col gap-3">
              <SectionTitle
                title="취미"
                maxCount={5}
                currentCount={hobbies.length}
              />
              <div className="flex flex-col">
                {hobbyCateg.map((category, index) => (
                  <CategoryCard
                    key={category.label}
                    label={category.label}
                    tags={category.tags}
                    selectedTags={hobbies}
                    maxSelect={5}
                    onToggle={createToggleHandler("hobbies", hobbies, 5)}
                    variant="hobby"
                    isFirst={index === 0}
                    isLast={index === hobbyCateg.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* Section 2: 운동 */}
            <section className="flex flex-col gap-3">
              <SectionTitle
                title="운동"
                maxCount={5}
                currentCount={exercises.length}
              />
              <div className="flex flex-col">
                {exerciseCateg.map((category, index) => (
                  <CategoryCard
                    key={category.label}
                    label={category.label}
                    tags={category.tags}
                    selectedTags={exercises}
                    maxSelect={5}
                    onToggle={createToggleHandler("exercises", exercises, 5)}
                    variant="exercise"
                    isFirst={index === 0}
                    isLast={index === exerciseCateg.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* Section 3: 관심사 */}
            <section className="flex flex-col gap-3">
              <SectionTitle
                title="관심사"
                maxCount={5}
                currentCount={interests.length}
              />
              <div className="flex flex-col">
                {interestCateg.map((category, index) => (
                  <CategoryCard
                    key={category.label}
                    label={category.label}
                    tags={category.tags}
                    selectedTags={interests}
                    maxSelect={5}
                    onToggle={createToggleHandler("interests", interests, 5)}
                    variant="interest"
                    isFirst={index === 0}
                    isLast={index === interestCateg.length - 1}
                  />
                ))}
              </div>
            </section>
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
