import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_KEY, API_URL, REFRESH_KEY } from "@/constant/keys";
import { isValidToken } from "@/utils/auth";
import {
    ACCESS_TOKEN_COOKIE_OPTIONS,
    DELETE_COOKIE_OPTIONS,
    REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/app/api/_auth/cookieOption";

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get(ACCESS_KEY)?.value || "";
    const refreshToken = request.cookies.get(REFRESH_KEY)?.value || "";

    const validAccess = isValidToken(accessToken);
    const validRefresh = isValidToken(refreshToken);

    const pathname = new URL(request.url).pathname;
    const excludeCheck = ["invalid", "expired"];
    const excludedPaths = ["/login", "/"];

    /* 로그인 페이지 일 때 🔑 */
    if (excludedPaths.includes(pathname)) {
        if (refreshToken) {
            // 리프레시 토큰만 있을 때
            return NextResponse.redirect(new URL("/home", request.url));
        }
        if (accessToken || (accessToken && refreshToken)) {
            // 엑세스토큰만 있어나 토큰 두개 다 있을 때
            return NextResponse.redirect(new URL("/home", request.url));
        }
    } else {
        /* 메인 페이지 일 때 🏠 */
        if (
            (!refreshToken || excludeCheck.includes(validRefresh)) &&
            !accessToken
        ) {
            // 리프레시 토큰, 엑세스토큰 없을 때
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (
            !accessToken ||
            excludeCheck.includes(validAccess) ||
            !refreshToken
        ) {
            // 엑세스 토큰없거나, 리프레시 토큰 만료되었을 때
            try {
                const res = await fetch(`${API_URL}/api/refresh`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `refreshToken=${refreshToken}`,
                    },
                });
                const data = await res.json();

                if (res.ok) {
                    const nextRes = NextResponse.next();

                    // 기존 토큰 삭제
                    nextRes.cookies.set(ACCESS_KEY, "", DELETE_COOKIE_OPTIONS);
                    nextRes.cookies.set(REFRESH_KEY, "", DELETE_COOKIE_OPTIONS);

                    // 새 토큰 설정
                    if (data.accessToken) {
                        nextRes.cookies.set(
                            ACCESS_KEY,
                            data.accessToken,
                            ACCESS_TOKEN_COOKIE_OPTIONS
                        );
                    }
                    if (data.refreshToken) {
                        nextRes.cookies.set(
                            REFRESH_KEY,
                            data.refreshToken,
                            REFRESH_TOKEN_COOKIE_OPTIONS
                        );
                    }

                    return nextRes;
                } else {
                    return NextResponse.redirect(
                        new URL("/login", request.url)
                    );
                }
            } catch (error) {
                console.error("❌ 엑세스 토큰 재발급 중 오류 발생:", error);
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/home", "/login", "/"],
};
