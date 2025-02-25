import { NextRequest, NextResponse } from "next/server";
import { ACCESS_KEY, API_URL, REFRESH_KEY } from "@/constant/keys";
import { isValidToken } from "@/utils/auth";
import { DELETE_COOKIE_OPTIONS } from "@/app/api/_auth/cookieOption";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    // ✅ 쿠키에서 직접 토큰 가져오기
    const accessToken = request.cookies.get(ACCESS_KEY)?.value || "";
    const refreshToken = request.cookies.get(REFRESH_KEY)?.value || "";
    const cookieStore = await cookies();
    // ✅ 토큰 유효성 검사
    const validAccess = isValidToken(accessToken);
    const validRefresh = isValidToken(refreshToken);

    const pathname = new URL(request.url).pathname;
    const excludeCheck = ["invalid", "expired"];
    const excludedPaths = ["/login", "/"];

    // ✅ 로그인이나 홈 제외 경로 처리
    if (excludedPaths.includes(pathname)) {
        if (refreshToken) {
            console.log("여기 작동?");
            return NextResponse.redirect(new URL("/home", request.url));
        }
        if (accessToken) {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    } else {
        // ✅ 리프레시 토큰 없으면 로그인 페이지로 리다이렉트
        if (!refreshToken || excludeCheck.includes(validRefresh)) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // ✅ 액세스 토큰이 없거나 유효하지 않을 때 재발급 시도
        if (!accessToken || excludeCheck.includes(validAccess)) {
            try {
                const res = await fetch(`${API_URL}/api/refresh`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        cookie: `refreshToken=${refreshToken}`, // ✅ 올바른 쿠키 형식
                        credentials: "include",
                    },
                });
                const getRes = await res.json();

                if (res.ok) {
                    // ✅ 새로운 응답 객체 생성
                    const nextRes = NextResponse.next();

                    // ✅ 기존 리프레시 토큰 삭제
                    nextRes.cookies.set(REFRESH_KEY, "", DELETE_COOKIE_OPTIONS);

                    // ✅ 새로운 액세스 토큰 설정
                    // if (getRes.accessToken) {
                    //     nextRes.cookies.set(
                    //         ACCESS_KEY,
                    //         getRes.accessToken.token,
                    //         ACCESS_TOKEN_COOKIE_OPTIONS
                    //     );
                    // }

                    // // ✅ 리프레시 토큰이 갱신되었으면 기존 값 삭제 후 새로 설정
                    // if (getRes.refreshToken) {
                    //     // ✅ 새로운 리프레시 토큰 설정
                    //     nextRes.cookies.set(
                    //         REFRESH_KEY,
                    //         getRes.refreshToken.token,
                    //         REFRESH_TOKEN_COOKIE_OPTIONS
                    //     );
                    // }
                    return nextRes;
                } else {
                    // ✅ 토큰 갱신 실패 시 로그인 페이지로 이동
                    return NextResponse.redirect(
                        new URL("/login", request.url)
                    );
                }
            } catch (error) {
                console.error("❌ 엑세스 토큰 재발급 중 오류 발생:", error);
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }

        // ✅ 액세스 토큰이 없으면 로그인 페이지로 이동 (보완)
        if (!accessToken || excludeCheck.includes(validAccess)) {
            if (pathname !== "/login") {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    }

    return NextResponse.next();
}

// ✅ 미들웨어 적용할 경로 설정
export const config = {
    matcher: ["/home", "/login", "/"],
};
