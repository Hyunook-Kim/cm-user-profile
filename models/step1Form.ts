import { z } from "zod";

/**
 * Step 1 (기본 정보) 폼 유효성 검증 스키마
 */
export const step1Schema = z.object({
  // 최종학력
  education: z.string().min(1, "필수 항목입니다"),

  // 결혼경험
  marriage: z.string().min(1, "필수 항목입니다"),

  // 현재 거주지역
  residenceType: z.enum(["domestic", "overseas"]),
  residenceCity: z.string().optional(),
  residenceDistrict: z.string().optional(),
  residenceDong: z.string().optional(),
  residenceOverseas: z.string().optional(),

  // 출석 교회명/교단
  churchName: z.string().min(1, "필수 항목입니다"),
  denomination: z.string().min(1, "필수 항목입니다"),

  // 담당목사님 성함
  pastorName: z.string().min(1, "필수 항목입니다"),

  // 교회 위치
  churchLocationType: z.enum(["domestic", "overseas"]),
  churchCity: z.string().optional(),
  churchDistrict: z.string().optional(),
  churchDong: z.string().optional(),
  churchOverseas: z.string().optional(),

  // 출신학교/전공 (배열 - 추가 가능)
  schools: z.array(z.object({
    schoolName: z.string().min(1, "필수 항목입니다"),
    major: z.string().min(1, "필수 항목입니다"),
  })).min(1, "최소 1개의 학교를 입력해주세요"),

  // 직업
  occupation: z.string().min(1, "필수 항목입니다"),

  // 직장명/직무
  workplace: z.string().min(1, "필수 항목입니다"),

  // 연봉
  salary: z.string().min(1, "필수 항목입니다"),

  // 신장(키)
  height: z.string().min(1, "필수 항목입니다"),

  // 혈액형
  bloodType: z.string().min(1, "필수 항목입니다"),

  // 나의 체형
  bodyType: z.string().min(1, "필수 항목입니다"),

  // 나의 스타일 (최대 5개)
  styles: z.array(z.string()).min(1, "최소 1개를 선택해주세요").max(5, "최대 5개까지 선택 가능합니다"),

  // 모태신앙
  faith: z.string().min(1, "필수 항목입니다"),

  // 음주여부
  drinking: z.string().min(1, "필수 항목입니다"),

  // 흡연여부
  smoking: z.string().min(1, "필수 항목입니다"),
});

export type Step1FormData = z.infer<typeof step1Schema>;

/**
 * 폼 기본값
 */
export const step1DefaultValues: Step1FormData = {
  education: "",
  marriage: "",
  residenceType: "domestic",
  residenceCity: "",
  residenceDistrict: "",
  residenceDong: "",
  residenceOverseas: "",
  churchName: "",
  denomination: "",
  pastorName: "",
  churchLocationType: "domestic",
  churchCity: "",
  churchDistrict: "",
  churchDong: "",
  churchOverseas: "",
  schools: [{ schoolName: "", major: "" }],
  occupation: "",
  workplace: "",
  salary: "",
  height: "",
  bloodType: "",
  bodyType: "",
  styles: [],
  faith: "",
  drinking: "",
  smoking: "",
};
