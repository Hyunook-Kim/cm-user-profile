"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormNavigation } from "@/hooks/useFormNavigation";
import { saveStepData, getStepData } from "@/lib/api/profile";
import Header from "@/components/layout/Header";
import SortablePriorityTag from "@/components/form/SortablePriorityTag";
import ProgressBar from "@/components/layout/ProgressBar";
import Title from "@/components/layout/Title";
import ContentFooter from "@/components/layout/ContentFooter";
import FooterNav from "@/components/layout/FooterNav";
import ExitConfirmModal from "@/components/common/ExitConfirmModal";
import HelpIcon from "@/components/common/HelpIcon";
import HelpModal from "@/components/common/HelpModal";
import Card from "@/components/form/Card";
import TagGroup from "@/components/form/TagGroup";
import RadioGroup from "@/components/form/RadioGroup";
import TextInput from "@/components/form/TextInput";
import InputCardTextArea from "@/components/form/InputCardTextArea";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  step5Schema,
  step5DefaultValues,
  Step5FormData,
  importantFactorOptions,
  locationOptions,
  ageOptions,
  educationOptions,
  christianFamilyOptions,
  bodyTypeOptions,
  styleOptions,
  heightOptions,
  incomeOptions,
  drinkSmokeOptions,
  christianWorkerOptions,
  remarriageOptions,
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
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // @dnd-kit 센서 설정 (PointerSensor: 마우스 + 터치 + 에뮬레이션 통합)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이동 후 드래그 시작
      },
    }),
  );

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
  const importantFactors = watch("importantFactors");

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

  // @dnd-kit 드래그 종료 핸들러
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = priorityRanking.indexOf(active.id as string);
        const newIndex = priorityRanking.indexOf(over.id as string);

        const newRanking = arrayMove(priorityRanking, oldIndex, newIndex);
        setValue("priorityRanking", newRanking, { shouldDirty: true });
      }
    },
    [priorityRanking, setValue],
  );

  // priority value로 label 찾기 (importantFactorOptions에서)
  const getPriorityLabel = (value: string) => {
    const option = importantFactorOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  // importantFactors 변경 시 priorityRanking 동기화
  const handleImportantFactorsChange = useCallback(
    (newValues: string[]) => {
      // 새로 추가된 항목 찾기
      const added = newValues.filter((v) => !importantFactors.includes(v));
      // 제거된 항목 찾기
      const removed = importantFactors.filter((v) => !newValues.includes(v));

      // importantFactors 업데이트
      setValue("importantFactors", newValues, { shouldDirty: true });

      // priorityRanking 동기화
      let newRanking = [...priorityRanking];

      // 추가된 항목을 끝에 추가
      added.forEach((item) => {
        if (!newRanking.includes(item)) {
          newRanking.push(item);
        }
      });

      // 제거된 항목 삭제
      newRanking = newRanking.filter((item) => !removed.includes(item));

      setValue("priorityRanking", newRanking, { shouldDirty: true });
    },
    [importantFactors, priorityRanking, setValue],
  );

  // PriorityTag X 버튼 클릭 시 양방향 제거
  const handlePriorityRemove = useCallback(
    (value: string) => {
      // priorityRanking에서 제거
      const newRanking = priorityRanking.filter((v) => v !== value);
      setValue("priorityRanking", newRanking, { shouldDirty: true });

      // importantFactors에서도 제거
      const newFactors = importantFactors.filter((v) => v !== value);
      setValue("importantFactors", newFactors, { shouldDirty: true });
    },
    [priorityRanking, importantFactors, setValue],
  );

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
          <Title
            title="이상형정보"
            step={5}
            helpIcon={
              <HelpIcon color="pink" onClick={() => setIsHelpModalOpen(true)} />
            }
          />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-[18px] self-stretch"
          >
            {/* Section 1: 조건 우선순위 */}
            <section className="flex flex-col gap-3">
              <SectionTitle
                title="조건 우선순위"
                subtitle="드래그하여 순위 변경"
              />

              {/* Priority Tags Container with @dnd-kit */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={priorityRanking}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="flex flex-wrap gap-1">
                    {priorityRanking.map((value, index) => (
                      <SortablePriorityTag
                        key={value}
                        id={value}
                        rank={index + 1}
                        label={getPriorityLabel(value)}
                        onRemove={() => handlePriorityRemove(value)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </section>

            {/* Section 2: 이성을 볼 때 중요하게 생각하는 요소 */}
            <Card
              label="이성을 볼 때 중요하게 생각하는 요소를 선택해주세요."
              noticeText="필수"
              secondaryText="중복체크 가능"
            >
              <Controller
                name="importantFactors"
                control={control}
                render={({ field }) => (
                  <Controller
                    name="importantFactorsOther"
                    control={control}
                    render={({ field: otherField }) => (
                      <TagGroup
                        options={importantFactorOptions}
                        value={field.value}
                        onChange={handleImportantFactorsChange}
                        hasOtherOption={true}
                        otherValue={otherField.value || ""}
                        onOtherChange={otherField.onChange}
                      />
                    )}
                  />
                )}
              />
            </Card>

            {/* Section 3: 희망 조건 */}
            {/* <section className="flex flex-col gap-3"> */}
            <section className="flex flex-col gap-[18px]">
              <SectionTitle title="희망 조건" />
              {/* <span className="text-body-lg text-black">희망 조건</span> */}

              {/* Card 1: 거주지역 */}

              <div className="flex flex-col">
                <Card
                  label="이상형의 원하는 거주지역을 선택해주세요."
                  noticeText="필수"
                  secondaryText="중복체크 가능"
                >
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

                {/* Card 2: 나이대 */}
                <Card
                  label="평소 원하는 배우자 나이를 선택해주세요."
                  noticeText="필수"
                  secondaryText="중복체크 가능"
                >
                  <Controller
                    name="desiredAgeRange"
                    control={control}
                    render={({ field }) => (
                      <Controller
                        name="desiredAgeRangeOther"
                        control={control}
                        render={({ field: otherField }) => (
                          <TagGroup
                            options={toTagOptions(ageOptions)}
                            value={field.value}
                            onChange={field.onChange}
                            hasOtherOption={true}
                            otherValue={otherField.value || ""}
                            onOtherChange={otherField.onChange}
                          />
                        )}
                      />
                    )}
                  />
                </Card>

                {/* Card 3: 4년 이상 연상 최대 나이 */}
                <Card label="4년 이상 연상일 경우 다른 부분이 이상형 조건과 부합된다면 최대 몇 살 연상까지 소개 가능하신가요?">
                  <Controller
                    name="maxOlderAge"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="최대 몇살까지"
                      />
                    )}
                  />
                </Card>

                {/* Card 4: 학력 기준 */}
                <Card
                  label="이상형의 원하는 학력기준을 선택해주세요."
                  noticeText="필수"
                  secondaryText="중복체크 가능"
                >
                  <Controller
                    name="desiredEducation"
                    control={control}
                    render={({ field }) => (
                      <Controller
                        name="desiredEducationOther"
                        control={control}
                        render={({ field: otherField }) => (
                          <TagGroup
                            options={toTagOptions(educationOptions)}
                            value={field.value}
                            onChange={field.onChange}
                            hasOtherOption={true}
                            otherValue={otherField.value || ""}
                            onOtherChange={otherField.onChange}
                          />
                        )}
                      />
                    )}
                  />
                </Card>

                {/* Card 5: 기독교 가정 */}
                <Card
                  label="소개받은 이성의 가족이 기독교 가정이길 바라시나요?"
                  noticeText="필수"
                >
                  <Controller
                    name="christianFamily"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        options={christianFamilyOptions}
                        value={field.value}
                        onChange={field.onChange}
                        name="christianFamily"
                        layout="vertical"
                      />
                    )}
                  />
                </Card>

                {/* Card 6: 체형 */}
                <Card
                  label="원하시는 이상형 체형을 선택해주세요."
                  noticeText="필수"
                  secondaryText="중복체크 가능"
                >
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

                {/* Card 7: 스타일 */}
                <Card
                  label="원하시는 이상형 스타일을 선택해주세요."
                  noticeText="필수"
                  secondaryText="중복체크 가능"
                >
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

                {/* Card 8: 신장 */}
                <Card
                  label="이상형의 키를 선택해주세요."
                  noticeText="필수"
                  secondaryText="중복체크 가능"
                >
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

                {/* Card 9: 외모 포기 못하는 부분 */}
                <Card
                  label="이성의 외모를 볼 때 포기할 수 없는 부분이 있나요? (키, 체형, 탈모, 얼굴 느낌 등)"
                  noticeText="필수"
                  secondaryText="중복체크 가능"
                >
                  <Controller
                    name="appearanceImportant"
                    control={control}
                    render={({ field }) => (
                      <InputCardTextArea
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="키는 저보다 크면 좋겠어요!! 딱딱하고 무서운 인상보다는 부드러운 인상을 좋아해요."
                        height={80}
                      />
                    )}
                  />
                </Card>

                {/* Card 10: 희망 직업 */}
                <Card
                  label="배우자의 희망 직업이 있으세요? (상관 없을시 '상관없음'으로 기재)"
                  noticeText="필수"
                >
                  <Controller
                    name="desiredJob"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Card>

                {/* Card 11: 기피 직업 */}
                <Card
                  label="배우자의 기피 직업이 있으세요? (상관 없을시 '상관없음'으로 기재)"
                  noticeText="필수"
                >
                  <Controller
                    name="avoidedJob"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Card>

                {/* Card 12: 희망 연봉 */}
                <Card
                  label="배우자의 희망 연봉을 선택해주세요."
                  noticeText="필수"
                >
                  <Controller
                    name="desiredIncome"
                    control={control}
                    render={({ field }) => (
                      <TagGroup
                        options={toTagOptions(incomeOptions)}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Card>

                {/* Card 13: 음주/흡연 */}
                <Card
                  label="배우자의 음주, 흡연 희망 여부를 선택해주세요."
                  noticeText="필수"
                >
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

                {/* Card 14: 크리스천 사역자 */}
                <Card
                  label="크리스천 사역자(목사, 선교사, 전도사, CCM사역자, 기독문화사역자, 교회간사 등)와의 만남은 어떠신가요?"
                  noticeText="필수"
                  secondaryText="중복체크 가능"
                >
                  <Controller
                    name="christianWorker"
                    control={control}
                    render={({ field }) => (
                      <Controller
                        name="christianWorkerOther"
                        control={control}
                        render={({ field: otherField }) => (
                          <RadioGroup
                            options={christianWorkerOptions}
                            value={field.value}
                            onChange={(val) => {
                              field.onChange(val);
                              if (val !== "other") {
                                otherField.onChange("");
                              }
                            }}
                            name="christianWorker"
                            layout="vertical"
                          />
                        )}
                      />
                    )}
                  />
                </Card>

                {/* Card 15: 재혼 */}
                <Card
                  label="재혼회원도 이상형에 부합한다면 괜찮나요?"
                  noticeText="필수"
                >
                  <Controller
                    name="remarriage"
                    control={control}
                    render={({ field }) => (
                      <Controller
                        name="remarriageOther"
                        control={control}
                        render={({ field: otherField }) => (
                          <RadioGroup
                            options={remarriageOptions}
                            value={field.value}
                            onChange={(val) => {
                              field.onChange(val);
                              if (val !== "other") {
                                otherField.onChange("");
                              }
                            }}
                            name="remarriage"
                            layout="vertical"
                          />
                        )}
                      />
                    )}
                  />
                </Card>

                {/* Card 16: 추가 조건 1 */}
                <Card
                  label="그 외 원하시는 배우자 정보를 자세하게 적어주세요. (신앙관, 성격, 가치관, 취미 등)"
                  noticeText="필수"
                >
                  <Controller
                    name="additionalCondition1"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Card>

                {/* Card 17: 추가 조건 2 */}
                <Card label="그 외 배우자 및 이상형을 찾는 과정에서 매니저에게 부탁하고 싶은 말씀이나 건의사항 있으시다면 자유롭게 적어주세요.">
                  <Controller
                    name="additionalCondition2"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Card>
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

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        title="이상형정보 안내"
      />
    </>
  );
}
