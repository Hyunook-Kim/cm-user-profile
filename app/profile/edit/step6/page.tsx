"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormNavigation } from "@/hooks/useFormNavigation";
import { saveStepData, getStepData } from "@/lib/api/profile";
import Header from "@/components/layout/Header";
import ProgressBar from "@/components/layout/ProgressBar";
import Title from "@/components/layout/Title";
import ContentFooter from "@/components/layout/ContentFooter";
import FooterNav from "@/components/layout/FooterNav";
import ExitConfirmModal from "@/components/common/ExitConfirmModal";
import SectionTitle from "@/components/ui/SectionTitle";
import SecondaryButton from "@/components/ui/SecondaryButton";
import CategoryCard from "@/components/form/CategoryCard";
import SelectedChip from "@/components/ui/SelectedChip";
import Chip from "@/components/ui/Chip";
import InputChip from "@/components/ui/InputChip";
import AddButton from "@/components/ui/AddButton";
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

export default function Step6Page() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 직접입력 상태
  const [hobbyInputValue, setHobbyInputValue] = useState("");
  const [showHobbyInput, setShowHobbyInput] = useState(false);
  const [exerciseInputValue, setExerciseInputValue] = useState("");
  const [showExerciseInput, setShowExerciseInput] = useState(false);
  const [interestInputValue, setInterestInputValue] = useState("");
  const [showInterestInput, setShowInterestInput] = useState(false);

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
  const hobbyCustom = watch("hobbyCustom");
  const exercises = watch("exercises");
  const exerciseCustom = watch("exerciseCustom");
  const interests = watch("interests");
  const interestCustom = watch("interestCustom");

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

  // 직접입력 제출 핸들러
  const handleHobbyCustomSubmit = (value: string) => {
    if (hobbies.length < 5) {
      setValue("hobbyCustom", [...hobbyCustom, value], { shouldDirty: true });
    }
    setHobbyInputValue("");
    setShowHobbyInput(false);
  };

  const handleExerciseCustomSubmit = (value: string) => {
    if (exercises.length < 5) {
      setValue("exerciseCustom", [...exerciseCustom, value], {
        shouldDirty: true,
      });
    }
    setExerciseInputValue("");
    setShowExerciseInput(false);
  };

  const handleInterestCustomSubmit = (value: string) => {
    if (interests.length < 5) {
      setValue("interestCustom", [...interestCustom, value], {
        shouldDirty: true,
      });
    }
    setInterestInputValue("");
    setShowInterestInput(false);
  };

  // TODO: InputChip 삭제 로직 부분. UI/UX가 정해지는대로 구현.
  // const removeHobbyCustom = (tag: string) => {
  //   setValue("hobbyCustom", hobbyCustom.filter((t) => t !== tag), { shouldDirty: true });
  // };

  // const removeExerciseCustom = (tag: string) => {
  //   setValue("exerciseCustom", exerciseCustom.filter((t) => t !== tag), { shouldDirty: true });
  // };

  // const removeInterestCustom = (tag: string) => {
  //   setValue("interestCustom", interestCustom.filter((t) => t !== tag), { shouldDirty: true });
  // };

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
              <div className="flex h-[36px] items-center justify-between gap-3">
                <SectionTitle title="취미" subtitle="최대 5개" />
                <SecondaryButton
                  label="선택 초기화"
                  icon="/icons/basic/refresh-line-white.svg"
                  onClick={() => setValue("hobbies", [], { shouldDirty: true })}
                />
              </div>
              {/* Selected 영역 */}
              {hobbies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {hobbies.map((hobby) => (
                    <SelectedChip
                      key={hobby}
                      text={hobby}
                      onRemove={() =>
                        createToggleHandler("hobbies", hobbies, 5)(hobby)
                      }
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col">
                {hobbyCateg.map((category, index) => (
                  <CategoryCard
                    key={category.label}
                    label={category.label}
                    tags={category.tags}
                    selectedTags={hobbies}
                    maxSelect={5}
                    onToggle={createToggleHandler("hobbies", hobbies, 5)}
                    isFirst={index === 0}
                    isLast={false}
                  />
                ))}
                {/* 직접입력 카드 */}
                <div className="flex flex-col gap-3 rounded-b-lg border border-t-0 border-gray-100 bg-white p-5">
                  <span className="text-caption-lg text-black">직접입력</span>
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                    {hobbyCustom.map((tag) => {
                      const isSelected = hobbies.includes(tag);
                      const isMaxReached = hobbies.length >= 5;
                      const chipStatus = isSelected
                        ? "on"
                        : isMaxReached
                          ? "none"
                          : "off";
                      return (
                        <Chip
                          key={tag}
                          text={tag}
                          status={chipStatus}
                          onClick={() =>
                            createToggleHandler("hobbies", hobbies, 5)(tag)
                          }
                        />
                      );
                    })}
                    {(hobbyCustom.length === 0 || showHobbyInput) && (
                      <InputChip
                        value={hobbyInputValue}
                        onChange={setHobbyInputValue}
                        onSubmit={handleHobbyCustomSubmit}
                        status={hobbies.length >= 5 ? "none" : "off"}
                      />
                    )}
                    <AddButton
                      onClick={() => setShowHobbyInput(true)}
                      disabled={hobbies.length >= 5}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: 운동 */}
            <section className="flex flex-col gap-3">
              <div className="flex h-[36px] items-center justify-between gap-3">
                <SectionTitle title="운동" subtitle="최대 5개" />
                <SecondaryButton
                  label="선택 초기화"
                  icon="/icons/basic/refresh-line-white.svg"
                  onClick={() =>
                    setValue("exercises", [], { shouldDirty: true })
                  }
                />
              </div>
              {/* Selected 영역 */}
              {exercises.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exercises.map((exercise) => (
                    <SelectedChip
                      key={exercise}
                      text={exercise}
                      onRemove={() =>
                        createToggleHandler("exercises", exercises, 5)(exercise)
                      }
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col">
                {exerciseCateg.map((category, index) => (
                  <CategoryCard
                    key={category.label}
                    label={category.label}
                    tags={category.tags}
                    selectedTags={exercises}
                    maxSelect={5}
                    onToggle={createToggleHandler("exercises", exercises, 5)}
                    isFirst={index === 0}
                    isLast={false}
                  />
                ))}
                {/* 직접입력 카드 */}
                <div className="flex flex-col gap-3 rounded-b-lg border border-t-0 border-gray-100 bg-white p-5">
                  <span className="text-caption-lg text-black">직접입력</span>
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                    {exerciseCustom.map((tag) => {
                      const isSelected = exercises.includes(tag);
                      const isMaxReached = exercises.length >= 5;
                      const chipStatus = isSelected
                        ? "on"
                        : isMaxReached
                          ? "none"
                          : "off";
                      return (
                        <Chip
                          key={tag}
                          text={tag}
                          status={chipStatus}
                          onClick={() =>
                            createToggleHandler("exercises", exercises, 5)(tag)
                          }
                        />
                      );
                    })}
                    {(exerciseCustom.length === 0 || showExerciseInput) && (
                      <InputChip
                        value={exerciseInputValue}
                        onChange={setExerciseInputValue}
                        onSubmit={handleExerciseCustomSubmit}
                        status={exercises.length >= 5 ? "none" : "off"}
                      />
                    )}
                    <AddButton
                      onClick={() => setShowExerciseInput(true)}
                      disabled={exercises.length >= 5}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: 관심사 */}
            <section className="flex flex-col gap-3">
              <div className="flex h-[36px] items-center justify-between gap-3">
                <SectionTitle title="관심사" subtitle="최대 5개" />
                <SecondaryButton
                  label="선택 초기화"
                  icon="/icons/basic/refresh-line-white.svg"
                  onClick={() =>
                    setValue("interests", [], { shouldDirty: true })
                  }
                />
              </div>
              {/* Selected 영역 */}
              {interests.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <SelectedChip
                      key={interest}
                      text={interest}
                      onRemove={() =>
                        createToggleHandler("interests", interests, 5)(interest)
                      }
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col">
                {interestCateg.map((category, index) => (
                  <CategoryCard
                    key={category.label}
                    label={category.label}
                    tags={category.tags}
                    selectedTags={interests}
                    maxSelect={5}
                    onToggle={createToggleHandler("interests", interests, 5)}
                    isFirst={index === 0}
                    isLast={false}
                  />
                ))}
                {/* 직접입력 카드 */}
                <div className="flex flex-col gap-3 rounded-b-lg border border-t-0 border-gray-100 bg-white p-5">
                  <span className="text-caption-lg text-black">직접입력</span>
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                    {interestCustom.map((tag) => {
                      const isSelected = interests.includes(tag);
                      const isMaxReached = interests.length >= 5;
                      const chipStatus = isSelected
                        ? "on"
                        : isMaxReached
                          ? "none"
                          : "off";
                      return (
                        <Chip
                          key={tag}
                          text={tag}
                          status={chipStatus}
                          onClick={() =>
                            createToggleHandler("interests", interests, 5)(tag)
                          }
                        />
                      );
                    })}
                    {(interestCustom.length === 0 || showInterestInput) && (
                      <InputChip
                        value={interestInputValue}
                        onChange={setInterestInputValue}
                        onSubmit={handleInterestCustomSubmit}
                        status={interests.length >= 5 ? "none" : "off"}
                      />
                    )}
                    <AddButton
                      onClick={() => setShowInterestInput(true)}
                      disabled={interests.length >= 5}
                    />
                  </div>
                </div>
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
