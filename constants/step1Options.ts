import { SelectOption } from "@/models/form";

/**
 * Step 1 (기본 정보) 페이지의 폼 옵션 데이터
 */

export const educationOptions: SelectOption[] = [
  { value: "high_school", label: "고등학교 졸업" },
  { value: "university_enrolled", label: "대학교 재학" },
  { value: "university_graduated", label: "대학교 졸업" },
  { value: "graduate_enrolled", label: "대학원 재학" },
  { value: "graduate_graduated", label: "대학원 졸업" },
  { value: "other", label: "기타" },
];

export const marriageOptions: SelectOption[] = [
  { value: "first", label: "초혼" },
  { value: "divorced", label: "이혼" },
  { value: "defacto", label: "사실혼" },
];

export const locationTypeOptions: SelectOption[] = [
  { value: "domestic", label: "국내" },
  { value: "overseas", label: "해외" },
];

// 위치 데이터는 constants/locationData.ts에서 import

export const salaryOptions: SelectOption[] = [
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

export const heightOptions: SelectOption[] = Array.from({ length: 51 }, (_, i) => ({
  value: String(150 + i),
  label: `${150 + i} cm`,
}));

export const bloodTypeOptions: SelectOption[] = [
  { value: "A", label: "A형" },
  { value: "B", label: "B형" },
  { value: "O", label: "O형" },
  { value: "AB", label: "AB형" },
];

export const bodyTypeOptions: SelectOption[] = [
  { value: "skinny", label: "스키니" },
  { value: "little_thin", label: "조금 마름" },
  { value: "normal", label: "보통" },
  { value: "slim_fit", label: "슬림하며 단단" },
  { value: "muscular", label: "근육질&균형미" },
  { value: "little_chubby", label: "조금 통통" },
  { value: "chubby", label: "통통" },
];

export const styleOptions: SelectOption[] = [
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

export const faithOptions: SelectOption[] = [
  { value: "yes", label: "그렇다" },
  { value: "no", label: "그렇지않다" },
  { value: "family", label: "모태신앙은 아니지만 현재 믿는 가족이 있다" },
];

export const drinkingOptions: SelectOption[] = [
  { value: "enjoy", label: "즐겨한다" },
  { value: "normal", label: "보통" },
  { value: "sometimes", label: "어쩔 수 없을 때" },
  { value: "never", label: "아예 하지 않는다" },
];

export const smokingOptions: SelectOption[] = [
  { value: "yes", label: "흡연" },
  { value: "no", label: "비흡연" },
];
