import { NextResponse } from "next/server";

const COOKIE_OPTIONS = {
    httpOnly: true, // 클라이언트에서 자바스크립트로 접근 불가
    secure: process.env.NODE_ENV === "production", // production 환경에서만 secure 쿠키 설정
    path: "/", // 모든 경로에서 접근 가능
    maxAge: 0, // 쿠키 만료 시간 (0으로 설정하면 삭제됨)
    expires: new Date(0), // 쿠키의 만료 시간을 1970년 1월 1일로 설정하여 삭제
};

export async function POST() {
    try {
        // 로그아웃 응답
        const response = NextResponse.json(
            {
                message: "리프레시 토큰 재발급 완료",
            },
            { status: 200 }
        );

        // response.cookies.set(ACCESS_KEY, accessToken.token, {
        //     httpOnly: true, // 클라이언트에서 자바스크립트로 접근 불가
        //     secure: process.env.NODE_ENV === "production", // production 환경에서만 secure 쿠키 설정
        //     path: "/", // 모든 경로에서 접근 가능
        //     maxAge: 10, // 액세스 토큰의 유효 시간 (10분)
        // });
        //
        // response.cookies.set(REFRESH_KEY, refreshToken.token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     path: "/",
        //     maxAge: 30 * 24 * 60 * 60, // 리프레시 토큰의 유효 시간 (30일)
        // });

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
