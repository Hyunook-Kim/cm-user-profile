import { z } from "zod";

/**
 * Step 5 (이상형정보) 폼 유효성 검증 스키마
 *
 * Sections:
 * 1. 조건 우선순위 - 드래그하여 순서 변경
 * 2. 희망 조건 - 17개 카드
 */

// 조건 우선순위 옵션
export const priorityOptions = [
  { id: "location", label: "거주지역" },
  { id: "age", label: "나이" },
  { id: "job", label: "직업" },
  { id: "income", label: "연봉" },
  { id: "appearance", label: "외모" },
];

// 거주지역 옵션
export const locationOptions = [
  "서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종",
  "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
];

// 나이대 옵션
export const ageOptions = [
  "연상 1-3세", "연상 4-6세", "연상 7세 이상",
  "동갑", "연하 1-3세", "연하 4-6세", "연하 7세 이상",
  "상관없음",
];

// 직책 옵션
export const jobPositionOptions = [
  "사원", "대리", "과장", "차장", "부장", "임원", "대표",
  "전문직", "프리랜서", "사업자", "상관없음",
];

// 가족/가정문화 옵션
export const familyCultureOptions = [
  { value: "important", label: "중요하다" },
  { value: "notImportant", label: "중요하지 않다" },
  { value: "depends", label: "상황에 따라 다르다" },
];

// 체형 옵션
export const bodyTypeOptions = [
  "마른", "슬림", "보통", "통통", "근육질", "상관없음",
];

// 스타일 옵션
export const styleOptions = [
  "캐주얼", "스트릿", "포멀", "빈티지", "미니멀", "스포티",
  "러블리", "시크", "댄디", "상관없음",
];

// 신장 옵션
export const heightOptions = [
  "155cm 이하", "156-160cm", "161-165cm", "166-170cm",
  "171-175cm", "176-180cm", "181-185cm", "186cm 이상", "상관없음",
];

// 음주/흡연 옵션
export const drinkSmokeOptions = [
  { value: "both", label: "둘 다 가능" },
  { value: "drinkOnly", label: "음주만 가능" },
  { value: "smokeOnly", label: "흡연만 가능" },
  { value: "neither", label: "둘 다 불가" },
  { value: "dontCare", label: "상관없음" },
];

// 건강/비혼인/반려자 옵션
export const healthStatusOptions = [
  { value: "healthy", label: "건강해야 한다" },
  { value: "acceptable", label: "경미한 질환은 괜찮다" },
  { value: "dontCare", label: "상관없음" },
];

// 재혼경험 옵션
export const remarriageOptions = [
  { value: "noExperience", label: "초혼만 원한다" },
  { value: "acceptable", label: "재혼도 괜찮다" },
  { value: "dontCare", label: "상관없음" },
];

// 기타 조건 옵션
export const otherConditionOptions = [
  { value: "education", label: "학력 중요" },
  { value: "religion", label: "종교 중요" },
  { value: "region", label: "출신 지역 중요" },
  { value: "none", label: "특별한 조건 없음" },
];

export const step5Schema = z.object({
  // 조건 우선순위 (id 배열)
  priorityRanking: z.array(z.string()),

  // 희망 거주지역 (다중 선택)
  desiredLocations: z.array(z.string()),

  // 희망 나이대 (다중 선택)
  desiredAgeRange: z.array(z.string()),

  // 부모님 동거 가능 여부 (텍스트 입력)
  parentLivingTogether: z.string(),

  // 직책 기준 (다중 선택)
  jobPositions: z.array(z.string()),

  // 가족/가정문화 (단일 선택)
  familyCulture: z.string(),

  // 체형 (다중 선택)
  bodyTypes: z.array(z.string()),

  // 스타일 (다중 선택)
  styles: z.array(z.string()),

  // 신장 (다중 선택)
  heights: z.array(z.string()),

  // 연봉 조건 (텍스트 입력)
  incomeCondition: z.string(),

  // 원하는 직업 (텍스트 입력)
  desiredJob: z.string(),

  // 배우자 연봉 (텍스트 입력)
  spouseIncome: z.string(),

  // 음주/흡연 (단일 선택)
  drinkSmoke: z.string(),

  // 건강 상태 (단일 선택)
  healthStatus: z.string(),

  // 재혼 경험 (단일 선택)
  remarriage: z.string(),

  // 기타 조건 (단일 선택)
  otherCondition: z.string(),

  // 추가 조건 1 (텍스트 입력)
  additionalCondition1: z.string(),

  // 추가 조건 2 (텍스트 입력)
  additionalCondition2: z.string(),
});

export type Step5FormData = z.infer<typeof step5Schema>;

/**
 * 폼 기본값
 */
export const step5DefaultValues: Step5FormData = {
  priorityRanking: ["location", "age", "job", "income", "appearance"],
  desiredLocations: [],
  desiredAgeRange: [],
  parentLivingTogether: "",
  jobPositions: [],
  familyCulture: "",
  bodyTypes: [],
  styles: [],
  heights: [],
  incomeCondition: "",
  desiredJob: "",
  spouseIncome: "",
  drinkSmoke: "",
  healthStatus: "",
  remarriage: "",
  otherCondition: "",
  additionalCondition1: "",
  additionalCondition2: "",
};
