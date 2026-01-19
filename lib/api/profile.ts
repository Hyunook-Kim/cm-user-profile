import { supabase } from "./supabase";

// 프로필 ID (단일 사용자)
const PROFILE_ID = "single-user";

/**
 * 특정 스텝 데이터 저장
 */
export async function saveStepData(step: number, data: unknown) {
  const columnName = `step${step}_data`;

  const { error } = await supabase
    .from("profiles")
    .update({
      [columnName]: data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", PROFILE_ID);

  if (error) {
    console.error(`Step ${step} 저장 실패:`, error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * 특정 스텝 데이터 조회
 */
export async function getStepData<T>(step: number): Promise<T | null> {
  const columnName = `step${step}_data`;

  const { data, error } = await supabase
    .from("profiles")
    .select(columnName)
    .eq("id", PROFILE_ID)
    .single();

  if (error || !data) {
    console.error(`Step ${step} 조회 실패:`, error);
    return null;
  }

  return (data as unknown as Record<string, unknown>)[columnName] as T;
}

/**
 * 전체 프로필 데이터 조회
 */
export async function getProfileData() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", PROFILE_ID)
    .single();

  if (error) {
    console.error("프로필 조회 실패:", error);
    return null;
  }

  return data;
}
