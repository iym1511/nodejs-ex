import { NextResponse } from "next/server";
import { ACCESS_KEY, REFRESH_KEY } from "@/constant/keys";
import { DELETE_COOKIE_OPTIONS } from "@/app/api/_auth/cookieOption";

export async function POST() {
    try {
        // 로그아웃 응답
        const response = NextResponse.json(
            {
                message: "로그아웃 완료",
            },
            { status: 200 }
        );

        // 쿠키 삭제
        response.cookies.set(REFRESH_KEY, "", DELETE_COOKIE_OPTIONS);
        response.cookies.set(ACCESS_KEY, "", DELETE_COOKIE_OPTIONS);

        return response; // 한 번만 응답 반환
    } catch (error) {
        console.error("로그아웃 처리 중 오류 발생:", error);

        return NextResponse.json(
            {
                message:
                    "로그아웃 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
                error:
                    error instanceof Error ? error.message : "알 수 없는 오류",
            },
            { status: 500 }
        );
    }
}
