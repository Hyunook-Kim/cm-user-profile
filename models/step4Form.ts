import { z } from "zod";

/**
 * Step 4 (관심사항/매력어필) 폼 유효성 검증 스키마
 *
 * TODO: 피그마에서 실제 질문 라벨 확인 후 필드명과 주석 업데이트 필요
 */
export const step4Schema = z.object({
  // 교회/선교 단체에서 섬겼던 역할 및 활동과 느낀점이 있다면 소개해주세요.
  churchRole: z.string().min(1, "필수 항목입니다"),

  // 본인의 평소 신앙생활을 소개해주세요.
  faithLife: z.string().min(1, "필수 항목입니다"),

  // 스스로가 가장 매력적이라 느끼는 순간은?
  attractiveMoment: z.string().min(1, "필수 항목입니다"),

  // 질문 4 (TODO: 피그마에서 확인 필요)
  question4: z.string().min(1, "필수 항목입니다"),

  // 질문 5 (TODO: 피그마에서 확인 필요)
  question5: z.string().min(1, "필수 항목입니다"),

  // 질문 6 (TODO: 피그마에서 확인 필요)
  question6: z.string().min(1, "필수 항목입니다"),

  // 질문 7 (TODO: 피그마에서 확인 필요)
  question7: z.string().min(1, "필수 항목입니다"),

  // 질문 8 (TODO: 피그마에서 확인 필요)
  question8: z.string().min(1, "필수 항목입니다"),

  // 질문 9 (TODO: 피그마에서 확인 필요)
  question9: z.string().min(1, "필수 항목입니다"),

  // 질문 10 (TODO: 피그마에서 확인 필요)
  question10: z.string().min(1, "필수 항목입니다"),

  // 질문 11 (TODO: 피그마에서 확인 필요)
  question11: z.string().min(1, "필수 항목입니다"),

  // 동적 질문 카드 배열 (사용자가 추가한 질문들)
  dynamicQuestions: z.array(
    z.object({
      title: z.string().optional(),
      content: z.string().optional(),
    })
  ),
});

export type Step4FormData = z.infer<typeof step4Schema>;

/**
 * 폼 기본값
 */
export const step4DefaultValues: Step4FormData = {
  churchRole: "",
  faithLife: "",
  attractiveMoment: "",
  question4: "",
  question5: "",
  question6: "",
  question7: "",
  question8: "",
  question9: "",
  question10: "",
  question11: "",
  // 동적 질문 기본값: 하나의 빈 카드로 시작
  dynamicQuestions: [{ title: "", content: "" }],
};
