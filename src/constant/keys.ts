export const ACCESS_TOKEN_SECRET =
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET || "";
export const REFRESH_TOKEN_SECRET =
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET || "";

export const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY || "";
export const REFRESH_KEY = process.env.NEXT_PUBLIC_REFRESH_KEY || "";
const LOCAL_API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL || "";
const BEPO_API_URL = process.env.NEXT_PUBLIC_API_URL || "";
/* 로컬 상태 구분해서 url 셋팅 */
export const API_URL =
    process.env.NODE_ENV === "development" ? LOCAL_API_URL : BEPO_API_URL;
