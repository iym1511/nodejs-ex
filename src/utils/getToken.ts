"use server";
import { cookies } from "next/headers";
import { getCookies } from "@/utils/cookies";

/* ssr 일때 csr일때 구분해서 토큰을 가져와준다. */
export async function getToken(key: string) {
    if (typeof window !== "undefined") {
        // 클라이언트 사이드
        return getCookies(key);
    } else {
        // 서버 사이드
        const cookieStore = await cookies();
        return cookieStore.get(key)?.value;
    }
}
