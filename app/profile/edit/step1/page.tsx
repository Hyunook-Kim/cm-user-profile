"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, FormProvider, useFieldArray } from "react-hook-form";
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
import Dropdown from "@/components/form/Dropdown";
import RadioGroup from "@/components/form/RadioGroup";
import TextInput from "@/components/form/TextInput";
import SecondaryButton from "@/components/ui/SecondaryButton";
import TagGroup from "@/components/form/TagGroup";
import HelpIcon from "@/components/common/HelpIcon";
import LocationSelector from "@/components/form/LocationSelector";
import {
  educationOptions,
  marriageOptions,
  salaryOptions,
  heightOptions,
  bloodTypeOptions,
  bodyTypeOptions,
  styleOptions,
  faithOptions,
  drinkingOptions,
  smokingOptions,
} from "@/constants/step1Options";
import { step1Schema, step1DefaultValues, Step1FormData } from "@/models/step1Form";

// Supabase 저장 함수
const saveToServer = async (data: Step1FormData) => {
  console.log("[Step1] 저장 시작:", data);
  const result = await saveStepData(1, data);
  console.log("[Step1] 저장 결과:", result);
  if (!result.success) {
    throw new Error(result.error);
  }
};

export default function Step1Page() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const methods = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: step1DefaultValues,
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
    prevUrl: "/profile/edit", // Step 1의 이전은 프로필 편집 메인
    nextUrl: "/profile/edit/step2", // Step 1의 다음은 Step 2
  });

  // 출신학교/전공 동적 배열
  const { fields: schoolFields, append: appendSchool } = useFieldArray({
    control,
    name: "schools",
  });

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      console.log("[Step1] 데이터 로드 시작");
      const savedData = await getStepData<Step1FormData>(1);
      console.log("[Step1] 로드된 데이터:", savedData);
      if (savedData) {
        reset(savedData);
        console.log("[Step1] reset 완료");
      } else {
        console.log("[Step1] 저장된 데이터 없음");
      }
      setIsLoading(false);
    };
    loadData();
  }, [reset]);

  // 저장 (페이지 유지)
  const handleSave = async (data: Step1FormData) => {
    setIsSaving(true);
    try {
      await saveToServer(data);
      reset(data); // dirty 상태 초기화
      console.log("저장 완료");
    } catch (error) {
      console.error("저장 실패:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // 모달: 저장 후 이동
  const handleSaveAndExit = async () => {
    // "다음"에서 트리거된 경우 유효성 검증 필요
    if (exitTrigger === "next") {
      const isValid = await methods.trigger();
      if (!isValid) {
        console.error("유효성 검증 실패");
        return; // 검증 실패 시 모달 유지
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
      <ProgressBar step={1} totalSteps={7} />
      <main className="flex flex-col items-start gap-[18px] overflow-y-auto bg-gray-100 p-4 pb-[96px]">
        <FormProvider {...methods}>
          <Title title="기본 정보" step={1} subtitle="*모든 항목이 필수입니다." />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-0 self-stretch"
          >
        <Card label="최종학력">
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <Dropdown
                options={educationOptions}
                placeholder="선택해주세요"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="결혼경험" helpIcon={<HelpIcon color="pink" />}>
          <Controller
            name="marriage"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="marriage"
                options={marriageOptions}
                layout="horizontal"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="현재 거주지역">
          <LocationSelector fieldPrefix="residence" />
        </Card>

        <Card label="출석 교회명/교단">
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 self-stretch">
              <div className="flex-1">
                <Controller
                  name="churchName"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      placeholder="교회명"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  name="denomination"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      placeholder="교단"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <SecondaryButton label="교회 검색" icon="/icons/basic/search-line-white.svg" />
          </div>
        </Card>

        <Card label="담당목사님 성함">
          <Controller
            name="pastorName"
            control={control}
            render={({ field }) => (
              <TextInput
                placeholder="목사님 성함을 입력해주세요"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="교회 위치">
          <LocationSelector fieldPrefix="church" />
        </Card>

        <Card label="출신학교/전공" helpIcon={<HelpIcon color="pink" />}>
          <div className="flex flex-col items-end gap-2">
            {schoolFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 self-stretch">
                <div className="flex-1">
                  <Controller
                    name={`schools.${index}.schoolName`}
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        placeholder="학교명"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Controller
                    name={`schools.${index}.major`}
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        placeholder="전공"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-2">
              <SecondaryButton label="학교 검색" icon="/icons/basic/search-line-white.svg" />
              <SecondaryButton
                label="추가"
                icon="/icons/basic/add-line-white.svg"
                onClick={() => appendSchool({ schoolName: "", major: "" })}
              />
            </div>
          </div>
        </Card>

        <Card label="직업">
          <div className="flex flex-col items-end gap-2">
            <div className="self-stretch">
              <Controller
                name="occupation"
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="직업을 입력해주세요"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <SecondaryButton label="직업 검색" icon="/icons/basic/search-line-white.svg" />
          </div>
        </Card>

        <Card label="직장명/직무" helpIcon={<HelpIcon color="pink" />}>
          <Controller
            name="workplace"
            control={control}
            render={({ field }) => (
              <TextInput
                placeholder="직장명 / 직무를 입력해주세요"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="연봉" helpIcon={<HelpIcon color="pink" />}>
          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="salary"
                options={salaryOptions}
                layout="grid"
                columns={3}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="신장(키)">
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <Dropdown
                options={heightOptions}
                placeholder="선택해주세요"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="혈액형">
          <Controller
            name="bloodType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="bloodType"
                options={bloodTypeOptions}
                layout="horizontal"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="나의 체형">
          <Controller
            name="bodyType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="bodyType"
                options={bodyTypeOptions}
                layout="grid"
                columns={3}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="나의 스타일" subtitle="*최대 5개">
          <Controller
            name="styles"
            control={control}
            render={({ field }) => (
              <TagGroup
                options={styleOptions}
                maxSelect={5}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="모태신앙">
          <Controller
            name="faith"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="faith"
                options={faithOptions}
                layout="horizontal"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="음주여부">
          <Controller
            name="drinking"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="drinking"
                options={drinkingOptions}
                layout="grid"
                columns={2}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>

        <Card label="흡연여부">
          <Controller
            name="smoking"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="smoking"
                options={smokingOptions}
                layout="horizontal"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Card>
          </form>

          <ContentFooter />
        </FormProvider>
      </main>

      <FooterNav
        showPrev={false}
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
