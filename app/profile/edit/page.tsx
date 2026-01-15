"use client";

import Header from "@/components/layout/Header";
import Title from "@/components/layout/Title";
import FooterNav from "@/components/layout/FooterNav";
import StatusBar from "@/components/layout/StatusBar";
import ProgressBar from "@/components/layout/ProgressBar";
import GestureBar from "@/components/layout/GestureBar";
import Card from "@/components/form/Card";
import Dropdown from "@/components/form/Dropdown";
import RadioGroup from "@/components/form/RadioGroup";
import TextInput from "@/components/form/TextInput";
import HelpIcon from "@/components/common/HelpIcon";

const educationOptions = [
  { value: "high_school", label: "고등학교 졸업" },
  { value: "university_enrolled", label: "대학교 재학" },
  { value: "university_graduated", label: "대학교 졸업" },
  { value: "graduate_enrolled", label: "대학원 재학" },
  { value: "graduate_graduated", label: "대학원 졸업" },
  { value: "other", label: "기타" },
];

const marriageOptions = [
  { value: "first", label: "초혼" },
  { value: "divorced", label: "이혼" },
  { value: "defacto", label: "사실혼" },
];

const locationTypeOptions = [
  { value: "domestic", label: "국내" },
  { value: "overseas", label: "해외" },
];

const cityOptions = [
  { value: "seoul", label: "서울특별시" },
  { value: "busan", label: "부산광역시" },
  { value: "daegu", label: "대구광역시" },
  { value: "incheon", label: "인천광역시" },
  { value: "gwangju", label: "광주광역시" },
  { value: "daejeon", label: "대전광역시" },
  { value: "ulsan", label: "울산광역시" },
];

const districtOptions = [
  { value: "seocho", label: "서초구" },
  { value: "gangnam", label: "강남구" },
  { value: "songpa", label: "송파구" },
  { value: "gangdong", label: "강동구" },
];

export default function ProfileEditPage() {
  return (
    <div className="mx-auto min-h-screen min-w-[--viewport-min] max-w-[--viewport-max] rounded-[28px] bg-white">
      <StatusBar />

      <Header />

      <ProgressBar step={1} totalSteps={7} />

      <main className="flex flex-col items-start gap-[18px] overflow-y-auto p-4 pb-[96px]">
        <Title
          title="기본 정보"
          step={1}
          subtitle="*모든 항목이 필수입니다."
        />

        <div className="flex flex-col gap-3 self-stretch">
          <Card label="최종학력">
            <Dropdown
              options={educationOptions}
              placeholder="선택해주세요"
            />
          </Card>

          <Card label="결혼경험" helpIcon={<HelpIcon color="pink" />}>
            <RadioGroup
              name="marriage"
              options={marriageOptions}
              layout="horizontal"
            />
          </Card>

          <Card label="현재 거주지역">
            <div className="flex flex-col gap-3">
              <RadioGroup
                name="locationType"
                options={locationTypeOptions}
                layout="horizontal"
                value="domestic"
              />

              <div className="flex gap-2">
                <div className="flex-1">
                  <Dropdown
                    options={cityOptions}
                    placeholder="시/도"
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    options={districtOptions}
                    placeholder="구/군"
                  />
                </div>
              </div>

              <TextInput placeholder="동/읍/면" />
            </div>
          </Card>
        </div>
      </main>

      <FooterNav showPrev={false} />

      <GestureBar />
    </div>
  );
}
