import { z } from "zod";

/**
 * Step 6 (라이프스타일) 폼 유효성 검증 스키마
 *
 * Sections:
 * 1. 취미 - 최대 5개 선택
 * 2. 운동 - 최대 5개 선택
 * 3. 관심사 - 최대 5개 선택
 *
 * 데이터 출처: docs/figma_specs/6_라이프스타일/direct-analysis/
 */

// 취미 카테고리별 태그 옵션 (피그마 direct-analysis 기준)
export const hobbyCategories = {
  dance: {
    label: "댄스/무용",
    tags: [
      "라틴댄스", "사교댄스", "방송/힙합", "스트릿댄스", "발레",
      "재즈댄스", "한국무용", "밸리댄스", "현대무용", "스윙댄스",
    ],
  },
  craft: {
    label: "공예/만들기",
    tags: [
      "미술/그림", "캘리그라피", "플라워아트", "캔들/디퓨저", "천연화장품",
      "소품공예", "가죽공예", "가구공예", "설탕공예", "도자공예",
      "자수/뜨개질", "키덜트", "메이크업",
    ],
  },
  humanities: {
    label: "인문학/책/글",
    tags: [
      "신앙서적", "책/독서", "인문학", "심리학", "철학",
      "역사", "시사/경제", "글쓰기",
    ],
  },
  cooking: {
    label: "요리/제조",
    tags: ["한식", "양식", "중식", "일식", "베이킹/제과", "핸드드립"],
  },
  media: {
    label: "영상/미디어",
    tags: [
      "유튜브", "TV", "영화", "예능", "한국드라마",
      "해외드라마", "영상제작", "영상편집", "스트리밍진행", "사진촬영", "블로그",
    ],
  },
  game: {
    label: "게임/오락",
    tags: ["다트", "보드게임", "두뇌심리게임", "온라인게임", "콘솔게임", "단체놀이", "바둑"],
  },
  outdoor: {
    label: "아웃도어/여행",
    tags: [
      "트래킹", "캠핑", "백패킹", "국내여행", "해외여행",
      "낚시", "스킨스쿠버", "글라이딩", "수상레저", "카페탐방", "맛집탐방", "드라이브",
    ],
  },
  culture: {
    label: "문화/공연/축제",
    tags: ["뮤지컬", "오페라", "공연/연극", "전시회", "성인연기", "고궁탐방", "페스티벌"],
  },
  music: {
    label: "음악/악기",
    tags: [
      "찬양/CCM", "노래/보컬", "기타/베이스", "우쿨렐레", "드럼",
      "피아노", "바이올린", "플룻", "오카리나", "밴드/합주",
      "작사/작곡", "인디음악", "힙합/DJ", "클래식", "재즈",
      "락/메탈", "일렉트로닉", "국악", "OST", "발라드",
    ],
  },
};

// 운동 카테고리별 태그 옵션 (피그마 direct-analysis 기준)
export const exerciseCategories = {
  sports: {
    label: "운동/스포츠",
    tags: [
      "자전거", "배드민턴", "볼링", "테니스/스쿼시", "스키/보드",
      "골프", "다이어트", "헬스", "요가", "탁구",
      "당구/포켓볼", "러닝", "수영", "서핑", "축구/풋살",
      "농구", "야구", "배구", "승마", "펜싱",
      "복싱", "태권도/유도", "검도", "무술/주짓수", "스케이트",
      "크루즈보드", "족구", "양궁", "걷기", "등산",
    ],
  },
};

// 관심사 카테고리별 태그 옵션 (피그마 direct-analysis 기준)
export const interestCategories = {
  pets: {
    label: "반려동물",
    tags: ["강아지", "고양이", "물고기", "파충류", "설치류"],
  },
  volunteer: {
    label: "봉사활동",
    tags: ["양로원", "보육원", "환경봉사", "사회봉사", "재능나눔", "유기동물보호"],
  },
  vehicle: {
    label: "차/오토바이",
    tags: ["현대", "기아", "르노", "GM", "쌍용", "일본차", "미국차", "유럽차", "바이크"],
  },
  language: {
    label: "외국어/언어",
    tags: ["영어", "일본어", "중국어", "프랑스어", "스페인어", "러시아어"],
  },
  etc: {
    label: "기타",
    tags: ["스피치/발성", "시험/자격증", "취업스터디", "금융보험"],
  },
};

export const step6Schema = z.object({
  // 취미 선택 (최대 5개)
  hobbies: z
    .array(z.string())
    .max(5, "취미는 최대 5개까지 선택할 수 있습니다"),

  // 취미 직접 입력
  hobbyCustom: z.array(z.string()),

  // 운동 선택 (최대 5개)
  exercises: z
    .array(z.string())
    .max(5, "운동은 최대 5개까지 선택할 수 있습니다"),

  // 운동 직접 입력
  exerciseCustom: z.array(z.string()),

  // 관심사 선택 (최대 5개)
  interests: z
    .array(z.string())
    .max(5, "관심사는 최대 5개까지 선택할 수 있습니다"),

  // 관심사 직접 입력
  interestCustom: z.array(z.string()),
});

export type Step6FormData = z.infer<typeof step6Schema>;

/**
 * 폼 기본값
 */
export const step6DefaultValues: Step6FormData = {
  hobbies: [],
  hobbyCustom: [],
  exercises: [],
  exerciseCustom: [],
  interests: [],
  interestCustom: [],
};
