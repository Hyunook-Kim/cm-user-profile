import { z } from "zod";

/**
 * Step 5 (이상형정보) 폼 유효성 검증 스키마
 *
 * Sections:
 * 1. 조건 우선순위 - 드래그하여 순위 변경 (6개)
 * 2. 이성을 볼 때 중요하게 생각하는 요소 - 12개 체크박스
 * 3. 희망 조건 - 17개 카드
 *
 * 데이터 출처: docs/figma_specs/5_이상형정보/direct-analysis/
 */

// 조건 우선순위 옵션 (6개) - 피그마 direct-analysis 기준
export const priorityOptions = [
  { id: "faith", label: "신앙 및 가치관" },
  { id: "personality", label: "성격 및 성품" },
  { id: "age", label: "나이" },
  { id: "bodyType", label: "체형" },
  { id: "job", label: "직업" },
  { id: "family", label: "부모님 및 집안 분위기" },
];

// Section 2: 이성을 볼 때 중요하게 생각하는 요소 옵션 (12개)
export const importantFactorOptions = [
  { value: "economic", label: "경제능력" },
  { value: "age", label: "나이" },
  { value: "vision", label: "비전(가능성)" },
  { value: "family", label: "부모님 및 집안 분위기" },
  { value: "personality", label: "성격 및 성품" },
  { value: "faith", label: "신앙 및 가치관" },
  { value: "appearance", label: "얼굴느낌(외모)" },
  { value: "job", label: "직업" },
  { value: "bodyType", label: "체형" },
  { value: "height", label: "키" },
  { value: "education", label: "학력" },
  { value: "other", label: "기타" },
];

// 거주지역 옵션 (거리 기반) - 피그마 direct-analysis 기준
export const locationOptions = [
  "같은 지역만 희망",
  "1시간 근거리 가능",
  "2시간 이내 가능",
  "3시간 이내 가능",
  "장거리 가능",
];

// 나이대 옵션 - 피그마 direct-analysis 기준
export const ageOptions = [
  "나이 차이는 상관없다",
  "4년 이하 연하",
  "2~3년 연하",
  "동갑~1년차이",
  "2~3년 연상",
  "4년 이상 연상",
  "연상이든 연하든 5살 차이 안에서 상관없다",
  "기타",
];

// 학력 옵션 - 피그마 direct-analysis 기준
export const educationOptions = [
  "사람만 괜찮으면 상관없다",
  "전문대졸 이상",
  "대학졸업 이상",
  "석사졸업 이상",
  "박사졸업 이상",
  "기타",
];

// 기독교 가정 옵션 - 피그마 direct-analysis 기준
export const christianFamilyOptions = [
  { value: "yes", label: "그렇다" },
  { value: "faithOnly", label: "본인의 신앙만 바로 서 있다면 상관없다" },
];

// 체형 옵션 - 피그마 direct-analysis 기준
export const bodyTypeOptions = [
  "스키니",
  "조금 마름",
  "보통",
  "슬림하며 단단",
  "근육질&글래머",
  "조금 통통",
  "통통",
];

// 스타일 옵션 (성격/인상 기반) - 피그마 direct-analysis 기준
export const styleOptions = [
  "터프한",
  "귀여운",
  "유머있는",
  "지적인",
  "패션에 민감한",
  "착한",
  "듬직한",
  "성실한",
  "끈기있는",
  "도도한",
  "스포티한",
  "신중한",
  "섬세한",
  "창의적인",
  "상냥한",
  "대범한",
  "낙천적인",
  "열정적인",
];

// 신장 옵션 - 피그마 direct-analysis 기준
export const heightOptions = [
  "154 이하",
  "155~159",
  "160~164",
  "165~169",
  "170~175",
  "175~180",
  "180 이상",
];

// 희망 연봉 옵션 - 피그마 direct-analysis 기준
export const incomeOptions = [
  "없음",
  "500~1000",
  "1000~2000",
  "2000~3000",
  "3000~4000",
  "4000~6000",
  "6000~8000",
  "8000~1억",
  "1억~1억 5천",
  "1억 5천~2억",
  "2억 이상",
];

// 음주/흡연 옵션 - 피그마 direct-analysis 기준
export const drinkSmokeOptions = [
  { value: "noSmoke", label: "음주는 상관없고, 흡연은 원하지 않는다" },
  { value: "noDrink", label: "음주는 안 했으면 좋겠고, 흡연은 상관없다" },
  { value: "both", label: "둘 다 적당하면 상관없다" },
  { value: "neither", label: "음주, 흡연 모두 안 했으면 좋겠다" },
];

// 크리스천 사역자 옵션 - 피그마 direct-analysis 기준
export const christianWorkerOptions = [
  { value: "want", label: "원한다" },
  { value: "possible", label: "가능하지만 다른 직업을 병행하면 좋겠다" },
  { value: "notWant", label: "원하지 않는다" },
  { value: "other", label: "기타" },
];

// 재혼 옵션 - 피그마 direct-analysis 기준
export const remarriageOptions = [
  { value: "factual", label: "사실혼, 무자녀일 경우 괜찮다" },
  { value: "dontCare", label: "재혼 여부는 상관없다" },
  { value: "difficult", label: "어렵다" },
  { value: "other", label: "기타" },
];

export const step5Schema = z.object({
  // Section 1: 조건 우선순위 (id 배열)
  priorityRanking: z.array(z.string()),

  // Section 2: 이성을 볼 때 중요하게 생각하는 요소 (다중 선택)
  importantFactors: z.array(z.string()),
  importantFactorsOther: z.string().optional(),

  // Section 3: 희망 조건

  // Card 1: 희망 거주지역 (다중 선택)
  desiredLocations: z.array(z.string()),

  // Card 2: 희망 나이대 (다중 선택)
  desiredAgeRange: z.array(z.string()),
  desiredAgeRangeOther: z.string().optional(),

  // Card 3: 4년 이상 연상 최대 나이
  maxOlderAge: z.string(),

  // Card 4: 학력 기준 (다중 선택)
  desiredEducation: z.array(z.string()),
  desiredEducationOther: z.string().optional(),

  // Card 5: 기독교 가정 (단일 선택)
  christianFamily: z.string(),

  // Card 6: 체형 (다중 선택)
  bodyTypes: z.array(z.string()),

  // Card 7: 스타일 (다중 선택)
  styles: z.array(z.string()),

  // Card 8: 신장 (다중 선택)
  heights: z.array(z.string()),

  // Card 9: 외모 포기 못하는 부분 (텍스트 입력)
  appearanceImportant: z.string(),

  // Card 10: 희망 직업 (텍스트 입력)
  desiredJob: z.string(),

  // Card 11: 기피 직업 (텍스트 입력)
  avoidedJob: z.string(),

  // Card 12: 희망 연봉 (다중 선택)
  desiredIncome: z.array(z.string()),

  // Card 13: 음주/흡연 (단일 선택)
  drinkSmoke: z.string(),

  // Card 14: 크리스천 사역자 (단일 선택)
  christianWorker: z.string(),
  christianWorkerOther: z.string().optional(),

  // Card 15: 재혼 여부 (단일 선택)
  remarriage: z.string(),
  remarriageOther: z.string().optional(),

  // Card 16: 추가 조건 1 (텍스트 입력)
  additionalCondition1: z.string(),

  // Card 17: 추가 조건 2 (텍스트 입력)
  additionalCondition2: z.string(),
});

export type Step5FormData = z.infer<typeof step5Schema>;

/**
 * 폼 기본값
 */
export const step5DefaultValues: Step5FormData = {
  // Section 1
  priorityRanking: ["faith", "personality", "age", "bodyType", "job", "family"],
  // Section 2
  importantFactors: [],
  importantFactorsOther: "",
  // Section 3
  desiredLocations: [],
  desiredAgeRange: [],
  desiredAgeRangeOther: "",
  maxOlderAge: "",
  desiredEducation: [],
  desiredEducationOther: "",
  christianFamily: "",
  bodyTypes: [],
  styles: [],
  heights: [],
  appearanceImportant: "",
  desiredJob: "",
  avoidedJob: "",
  desiredIncome: [],
  drinkSmoke: "",
  christianWorker: "",
  christianWorkerOther: "",
  remarriage: "",
  remarriageOther: "",
  additionalCondition1: "",
  additionalCondition2: "",
};
