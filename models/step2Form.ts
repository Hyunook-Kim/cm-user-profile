import { z } from "zod";

/**
 * Step 2 (나의 소개) 폼 유효성 검증 스키마
 */
export const step2Schema = z.object({
  // 나를 한줄로 표현한다면?
  oneLiner: z.string().min(1, "필수 항목입니다"),

  // 신앙을 갖게 된 계기는 어떻게 되시나요?
  faithStory: z.string().min(1, "필수 항목입니다"),

  // 좋아하는 CCM / 성경구절은 무엇인가요?
  ccmVerse: z.string().min(1, "필수 항목입니다"),

  // 나에게 예수님이란 어떤 분이신가요?
  jesusToMe: z.string().min(1, "필수 항목입니다"),

  // 내 외모는 어떤 특징이 있어요.
  appearance: z.string().min(1, "필수 항목입니다"),

  // 휴일은 이렇게 보내요.
  holiday: z.string().min(1, "필수 항목입니다"),

  // 이성 친구가 생기면 하고 싶은 데이트는요.
  dateIdea: z.string().min(1, "필수 항목입니다"),

  // 이런 연인을 찾아요.
  idealType: z.string().min(1, "필수 항목입니다"),
});

export type Step2FormData = z.infer<typeof step2Schema>;

/**
 * 폼 기본값
 */
export const step2DefaultValues: Step2FormData = {
  oneLiner: "",
  faithStory: "",
  ccmVerse: "",
  jesusToMe: "",
  appearance: "",
  holiday: "",
  dateIdea: "",
  idealType: "",
};
