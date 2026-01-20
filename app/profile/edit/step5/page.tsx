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
import Card from "@/components/form/Card";
import TagGroup from "@/components/form/TagGroup";
import RadioGroup from "@/components/form/RadioGroup";
import TextInput from "@/components/form/TextInput";
import InputCardTextArea from "@/components/form/InputCardTextArea";
import {
  step5Schema,
  step5DefaultValues,
  Step5FormData,
  priorityOptions,
  locationOptions,
  ageOptions,
  jobPositionOptions,
  familyCultureOptions,
  bodyTypeOptions,
  styleOptions,
  heightOptions,
  drinkSmokeOptions,
  healthStatusOptions,
  remarriageOptions,
  otherConditionOptions,
} from "@/models/step5Form";

// Supabase 저장 함수
const saveToServer = async (data: Step5FormData) => {
  console.log("[Step5] 저장 시작:", data);
  const result = await saveStepData(5, data);
  console.log("[Step5] 저장 결과:", result);
  if (!result.success) {
    throw new Error(result.error);
  }
};

// string[] 를 TagOption[] 로 변환하는 헬퍼
const toTagOptions = (arr: string[]) =>
  arr.map((item) => ({ value: item, label: item }));

export default function Step5Page() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const methods = useForm<Step5FormData>({
    resolver: zodResolver(step5Schema),
    defaultValues: step5DefaultValues,
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

  const priorityRanking = watch("priorityRanking");

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
    prevUrl: "/profile/edit/step4",
    nextUrl: "/profile/edit/step6",
  });

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      console.log("[Step5] 데이터 로드 시작");
      const savedData = await getStepData<Step5FormData>(5);
      console.log("[Step5] 로드된 데이터:", savedData);
      if (savedData) {
        reset(savedData);
        console.log("[Step5] reset 완료");
      } else {
        console.log("[Step5] 저장된 데이터 없음");
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

      const newRanking = [...priorityRanking];
      const [removed] = newRanking.splice(draggedIndex, 1);
      newRanking.splice(dropIndex, 0, removed);

      setValue("priorityRanking", newRanking, { shouldDirty: true });
      setDraggedIndex(null);
    },
    [draggedIndex, priorityRanking, setValue]
  );

  // priority id로 label 찾기
  const getPriorityLabel = (id: string) => {
    const option = priorityOptions.find((opt) => opt.id === id);
    return option ? option.label : id;
  };

  // 저장 (페이지 유지)
  const handleSave = async (data: Step5FormData) => {
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
      <ProgressBar step={5} totalSteps={7} />
      <main className="flex flex-col items-start gap-[18px] overflow-y-auto bg-gray-100 p-4 pb-[96px]">
        <FormProvider {...methods}>
          <Title title="이상형정보" step={5} subtitle="*모든 항목이 필수입니다." />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-[18px] self-stretch"
          >
            {/* Section 1: 조건 우선순위 */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <span className="text-body-lg text-black">조건 우선순위</span>
                <span className="text-caption-lg text-pink">*드래그하여 순서 변경</span>
              </div>

              {/* Priority Tags Container */}
              <div className="flex flex-wrap gap-1">
                {priorityRanking.map((id, index) => (
                  <div
                    key={id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                    className={`flex cursor-grab items-center gap-1 rounded-lg border bg-white px-2 py-2 active:cursor-grabbing ${
                      draggedIndex === index
                        ? "border-pink opacity-50"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src="/icons/basic/drag-line.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    <span className="text-caption-md text-navy">
                      {index + 1}. {getPriorityLabel(id)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: 희망 조건 */}
            <section className="flex flex-col gap-3">
              <span className="text-body-lg text-black">희망 조건</span>

              {/* Card 0: 거주지역 */}
              <Card label="원하는 거주지역 선택" subtitle="*중복선택 가능">
                <Controller
                  name="desiredLocations"
                  control={control}
                  render={({ field }) => (
                    <TagGroup
                      options={toTagOptions(locationOptions)}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Card>

              {/* Card 1: 나이대 */}
              <Card label="평소 원하는 배우자의 나이대 선택" subtitle="*중복선택 가능">
                <Controller
                  name="desiredAgeRange"
                  control={control}
                  render={({ field }) => (
                    <TagGroup
                      options={toTagOptions(ageOptions)}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Card>

              {/* Card 2: 부모님 동거 */}
              <Card label="결혼 후 부모님과 동거 가능 여부" subtitle="*필수">
                <Controller
                  name="parentLivingTogether"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="답변을 입력해주세요."
                    />
                  )}
                />
              </Card>

              {/* Card 3: 직책기준 */}
              <Card label="이상형의 직책기준 선택" subtitle="*중복선택 가능">
                <Controller
                  name="jobPositions"
                  control={control}
                  render={({ field }) => (
                    <TagGroup
                      options={toTagOptions(jobPositionOptions)}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Card>

              {/* Card 4: 가족/가정문화 */}
              <Card label="이상형의 가족과 가정문화가 중요한가요?" subtitle="*필수">
                <Controller
                  name="familyCulture"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      options={familyCultureOptions}
                      value={field.value}
                      onChange={field.onChange}
                      name="familyCulture"
                      layout="vertical"
                    />
                  )}
                />
              </Card>

              {/* Card 5: 체형 */}
              <Card label="원하시는 이상형 체형을 선택해주세요" subtitle="*중복선택 가능">
                <Controller
                  name="bodyTypes"
                  control={control}
                  render={({ field }) => (
                    <TagGroup
                      options={toTagOptions(bodyTypeOptions)}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Card>

              {/* Card 6: 스타일 */}
              <Card label="원하시는 이상형 스타일을 선택해주세요" subtitle="*중복선택 가능">
                <Controller
                  name="styles"
                  control={control}
                  render={({ field }) => (
                    <TagGroup
                      options={toTagOptions(styleOptions)}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Card>

              {/* Card 7: 신장 */}
              <Card label="원하시는 이상형 신장을 선택해주세요" subtitle="*중복선택 가능">
                <Controller
                  name="heights"
                  control={control}
                  render={({ field }) => (
                    <TagGroup
                      options={toTagOptions(heightOptions)}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Card>

              {/* Card 8: 연봉 조건 */}
              <Card label="이상형의 가능 연봉을 선택해주세요" subtitle="*필수">
                <Controller
                  name="incomeCondition"
                  control={control}
                  render={({ field }) => (
                    <InputCardTextArea
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="답변을 작성해주세요."
                      height={80}
                    />
                  )}
                />
              </Card>

              {/* Card 9: 원하는 직업 */}
              <Card label="배우자가 원하는 직업이 있으신가요?" subtitle="*필수">
                <Controller
                  name="desiredJob"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="답변을 입력해주세요."
                    />
                  )}
                />
              </Card>

              {/* Card 10: 배우자 연봉 */}
              <Card label="배우자의 가능 연봉을 선택해주세요" subtitle="*필수">
                <Controller
                  name="spouseIncome"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="답변을 입력해주세요."
                    />
                  )}
                />
              </Card>

              {/* Card 11: 음주/흡연 */}
              <Card label="배우자는 음주, 흡연 관련 여부를 선택해주세요" subtitle="*필수">
                <Controller
                  name="drinkSmoke"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      options={drinkSmokeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      name="drinkSmoke"
                      layout="vertical"
                    />
                  )}
                />
              </Card>

              {/* Card 12: 건강상 사정 */}
              <Card label="건강상 사정/비혼인, 반려자 여부를 확인해주세요" subtitle="*필수">
                <Controller
                  name="healthStatus"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      options={healthStatusOptions}
                      value={field.value}
                      onChange={field.onChange}
                      name="healthStatus"
                      layout="vertical"
                    />
                  )}
                />
              </Card>

              {/* Card 13: 재혼경험 */}
              <Card label="재혼경험도 이상형에게 부담이 되시나요?" subtitle="*필수">
                <Controller
                  name="remarriage"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      options={remarriageOptions}
                      value={field.value}
                      onChange={field.onChange}
                      name="remarriage"
                      layout="vertical"
                    />
                  )}
                />
              </Card>

              {/* Card 14: 기타 조건 */}
              <Card label="기타 조건을 선택해주세요" subtitle="*필수">
                <Controller
                  name="otherCondition"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      options={otherConditionOptions}
                      value={field.value}
                      onChange={field.onChange}
                      name="otherCondition"
                      layout="vertical"
                    />
                  )}
                />
              </Card>

              {/* Card 15: 추가 조건 1 */}
              <Card label="추가 조건을 입력해주세요" subtitle="*필수">
                <Controller
                  name="additionalCondition1"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="답변을 입력해주세요."
                    />
                  )}
                />
              </Card>

              {/* Card 16: 추가 조건 2 */}
              <Card label="마지막 조건을 입력해주세요" subtitle="*필수">
                <Controller
                  name="additionalCondition2"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="답변을 입력해주세요."
                    />
                  )}
                />
              </Card>
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
