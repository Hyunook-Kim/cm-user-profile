import { z } from "zod";

/**
 * Step 7 (추가정보) 폼 유효성 검증 스키마
 *
 * Sections:
 * 1. 사랑의 언어 - 드래그하여 순위 변경
 * 2. 기타 - 메인화면 추천, 같은 교회 소개
 */

// 사랑의 언어 옵션 (id, label, icon, description)
export const loveLanguageOptions = [
  {
    id: "qualityTime",
    label: "함께하는 시간",
    icon: "time-line",
    description: "연인이 나와 함께 의미 있는 시간을 보내 줄 때",
  },
  {
    id: "actsOfService",
    label: "봉사",
    icon: "service-line",
    description: "나를 위해 손 쓰는 일을 당연히 해줄 때",
  },
  {
    id: "wordsOfAffirmation",
    label: "인정하는 말",
    icon: "lovetalk-line",
    description: "나를 인정하고 격려하여 힘을 줄 때",
  },
  {
    id: "physicalTouch",
    label: "스킨십",
    icon: "skinship-line",
    description: "사랑을 스킨십으로 표현 한 것들을 줄 때",
  },
  {
    id: "receivingGifts",
    label: "선물",
    icon: "gift-line",
    description: "연인이 나에게 갖고 싶은 선물을 진심으로 줬을 때",
  },
];

export const step7Schema = z.object({
  // 사랑의 언어 순위 (id 배열, 순서대로 1위~5위)
  loveLanguageRanking: z
    .array(z.string())
    .length(5, "5개의 사랑의 언어 순위를 모두 설정해주세요"),

  // 메인화면 추천 희망 (원한다: want, 원치 않는다: notWant)
  mainRecommendation: z.enum(["want", "notWant"]),

  // 같은 교회 이성 소개 희망 (원한다: want, 원치 않는다: notWant)
  sameChurchIntro: z.enum(["want", "notWant"]),
});

export type Step7FormData = z.infer<typeof step7Schema>;

/**
 * 폼 기본값
 */
export const step7DefaultValues: Step7FormData = {
  // 기본 순서: 함께하는 시간 > 봉사 > 인정하는 말 > 스킨십 > 선물
  loveLanguageRanking: [
    "qualityTime",
    "actsOfService",
    "wordsOfAffirmation",
    "physicalTouch",
    "receivingGifts",
  ],
  mainRecommendation: "want",
  sameChurchIntro: "want",
};
