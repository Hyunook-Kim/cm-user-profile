"use client";

import Image from "next/image";
import Title from "@/components/layout/Title";
import ContentFooter from "@/components/layout/ContentFooter";
import Card from "@/components/form/Card";
import Dropdown from "@/components/form/Dropdown";
import RadioGroup from "@/components/form/RadioGroup";
import TextInput from "@/components/form/TextInput";
import SearchButton from "@/components/form/SearchButton";
import AddButton from "@/components/form/AddButton";
import TagGroup from "@/components/form/TagGroup";
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

const dongOptions = [
  { value: "seocho1", label: "서초1동" },
  { value: "seocho2", label: "서초2동" },
  { value: "seocho3", label: "서초3동" },
  { value: "seocho4", label: "서초4동" },
];

const salaryOptions = [
  { value: "none", label: "없음" },
  { value: "500_1000", label: "500~1000" },
  { value: "1000_2000", label: "1000~2000" },
  { value: "2000_3000", label: "2000~3000" },
  { value: "3000_4000", label: "3000~4000" },
  { value: "4000_6000", label: "4000~6000" },
  { value: "6000_8000", label: "6000~8000" },
  { value: "8000_1억", label: "8000~1억" },
  { value: "1억_1억5천", label: "1억~1억5천" },
  { value: "1억5천_2억", label: "1억5천~2억" },
  { value: "2억_이상", label: "2억 이상" },
];

const heightOptions = Array.from({ length: 51 }, (_, i) => ({
  value: String(150 + i),
  label: `${150 + i} cm`,
}));

const bloodTypeOptions = [
  { value: "A", label: "A형" },
  { value: "B", label: "B형" },
  { value: "O", label: "O형" },
  { value: "AB", label: "AB형" },
];

const bodyTypeOptions = [
  { value: "skinny", label: "스키니" },
  { value: "little_thin", label: "조금 마름" },
  { value: "normal", label: "보통" },
  { value: "slim_fit", label: "슬림하며 단단" },
  { value: "muscular", label: "근육질&균형미" },
  { value: "little_chubby", label: "조금 통통" },
  { value: "chubby", label: "통통" },
];

const styleOptions = [
  // 1행
  { value: "tough", label: "터프한" },
  { value: "cute", label: "귀여운" },
  { value: "humorous", label: "유머있는" },
  // 2행
  { value: "intellectual", label: "지적인" },
  { value: "fashionable", label: "패션에 민감한" },
  { value: "kind", label: "착한" },
  // 3행
  { value: "dependable", label: "듬직한" },
  { value: "sincere", label: "성실한" },
  { value: "persistent", label: "끈기있는" },
  // 4행
  { value: "proud", label: "도도한" },
  { value: "sporty", label: "스포티한" },
  { value: "careful", label: "신중한" },
  // 5행
  { value: "delicate", label: "섬세한" },
  { value: "creative", label: "창의적인" },
  { value: "gentle", label: "상냥한" },
  // 6행
  { value: "bold", label: "대범한" },
  { value: "optimistic", label: "낙천적인" },
  { value: "passionate", label: "열정적인" },
];

const faithOptions = [
  { value: "yes", label: "그렇다" },
  { value: "no", label: "그렇지않다" },
  { value: "family", label: "모태신앙은 아니지만 현재 믿는 가족이 있다" },
];

const drinkingOptions = [
  { value: "enjoy", label: "즐겨한다" },
  { value: "normal", label: "보통" },
  { value: "sometimes", label: "어쩔 수 없을 때" },
  { value: "never", label: "아예 하지 않는다" },
];

const smokingOptions = [
  { value: "yes", label: "흡연" },
  { value: "no", label: "비흡연" },
];

export default function Step1Page() {
  return (
    <>
      <Title title="기본 정보" step={1} subtitle="*모든 항목이 필수입니다." />

      <div className="flex flex-col gap-0 self-stretch">
        <Card label="최종학력">
          <Dropdown options={educationOptions} placeholder="선택해주세요" />
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
            {/* 국내 Row */}
            <div className="flex items-start gap-3">
              <label className="flex shrink-0 cursor-pointer items-center gap-1 py-1">
                <input
                  type="radio"
                  name="locationType"
                  value="domestic"
                  defaultChecked
                  className="sr-only"
                />
                <Image
                  src="/icons/radio/radio-on.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="text-[14px] font-light leading-[24px] text-gray-800">
                  국내
                </span>
              </label>
              <div className="flex flex-1 flex-wrap gap-2">
                <div className="min-w-[100px] flex-1">
                  <Dropdown options={cityOptions} placeholder="시/도" />
                </div>
                <div className="min-w-[100px] flex-1">
                  <Dropdown options={districtOptions} placeholder="구/군" />
                </div>
                <div className="w-full">
                  <Dropdown options={dongOptions} placeholder="동/읍/면" />
                </div>
              </div>
            </div>

            {/* 해외 Row */}
            <div className="flex items-start gap-3">
              <label className="flex shrink-0 cursor-pointer items-center gap-1 py-1">
                <input
                  type="radio"
                  name="locationType"
                  value="overseas"
                  className="sr-only"
                />
                <Image
                  src="/icons/radio/radio-off.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="text-[14px] font-light leading-[24px] text-gray-800">
                  해외
                </span>
              </label>
              <div className="flex-1">
                <TextInput placeholder="" disabled />
              </div>
            </div>
          </div>
        </Card>

        <Card label="출석 교회명/교단">
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 self-stretch">
              <div className="flex-1">
                <TextInput placeholder="교회명" />
              </div>
              <div className="flex-1">
                <TextInput placeholder="교단" />
              </div>
            </div>
            <SearchButton label="교회 검색" />
          </div>
        </Card>

        <Card label="담당목사님 성함">
          <TextInput placeholder="목사님 성함을 입력해주세요" />
        </Card>

        <Card label="교회 위치">
          <div className="flex flex-col gap-3">
            {/* 국내 Row */}
            <div className="flex items-start gap-3">
              <label className="flex shrink-0 cursor-pointer items-center gap-1 py-1">
                <input
                  type="radio"
                  name="churchLocationType"
                  value="domestic"
                  defaultChecked
                  className="sr-only"
                />
                <Image
                  src="/icons/radio/radio-on.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="text-[14px] font-light leading-[24px] text-gray-800">
                  국내
                </span>
              </label>
              <div className="flex flex-1 flex-wrap gap-2">
                <div className="min-w-[100px] flex-1">
                  <Dropdown options={cityOptions} placeholder="시/도" />
                </div>
                <div className="min-w-[100px] flex-1">
                  <Dropdown options={districtOptions} placeholder="구/군" />
                </div>
                <div className="w-full">
                  <Dropdown options={dongOptions} placeholder="동/읍/면" />
                </div>
              </div>
            </div>

            {/* 해외 Row */}
            <div className="flex items-start gap-3">
              <label className="flex shrink-0 cursor-pointer items-center gap-1 py-1">
                <input
                  type="radio"
                  name="churchLocationType"
                  value="overseas"
                  className="sr-only"
                />
                <Image
                  src="/icons/radio/radio-off.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="text-[14px] font-light leading-[24px] text-gray-800">
                  해외
                </span>
              </label>
              <div className="flex-1">
                <TextInput placeholder="" disabled />
              </div>
            </div>
          </div>
        </Card>

        <Card label="출신학교/전공" helpIcon={<HelpIcon color="pink" />}>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 self-stretch">
              <div className="flex-1">
                <TextInput placeholder="학교명" />
              </div>
              <div className="flex-1">
                <TextInput placeholder="전공" />
              </div>
            </div>
            <div className="flex gap-2">
              <SearchButton label="학교 검색" />
              <AddButton label="추가" />
            </div>
          </div>
        </Card>

        <Card label="직업">
          <div className="flex flex-col items-end gap-2">
            <div className="self-stretch">
              <TextInput placeholder="직업을 입력해주세요" />
            </div>
            <SearchButton label="직업 검색" />
          </div>
        </Card>

        <Card label="직장명/직무" helpIcon={<HelpIcon color="pink" />}>
          <TextInput placeholder="직장명 / 직무를 입력해주세요" />
        </Card>

        <Card label="연봉" helpIcon={<HelpIcon color="pink" />}>
          <RadioGroup
            name="salary"
            options={salaryOptions}
            layout="grid"
            columns={3}
          />
        </Card>

        <Card label="신장(키)">
          <Dropdown options={heightOptions} placeholder="선택해주세요" />
        </Card>

        <Card label="혈액형">
          <RadioGroup
            name="bloodType"
            options={bloodTypeOptions}
            layout="horizontal"
          />
        </Card>

        <Card label="나의 체형">
          <RadioGroup
            name="bodyType"
            options={bodyTypeOptions}
            layout="grid"
            columns={3}
          />
        </Card>

        <Card label="나의 스타일" subtitle="*최대 5개">
          <TagGroup options={styleOptions} maxSelect={5} />
        </Card>

        <Card label="모태신앙">
          <RadioGroup
            name="faith"
            options={faithOptions}
            layout="horizontal"
          />
        </Card>

        <Card label="음주여부">
          <RadioGroup
            name="drinking"
            options={drinkingOptions}
            layout="grid"
            columns={2}
          />
        </Card>

        <Card label="흡연여부">
          <RadioGroup
            name="smoking"
            options={smokingOptions}
            layout="horizontal"
          />
        </Card>
      </div>

      <ContentFooter />
    </>
  );
}
