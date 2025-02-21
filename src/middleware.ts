/* 항상 서버사이드에서 실행 "use server" 적용필요 x */

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/utils/getToken";
import { ACCESS_KEY, REFRESH_KEY } from "@/constant/keys";
import { isValidToken, jwtDecode } from "@/utils/auth";

export async function middleware(request: NextRequest) {
    const accessToken = (await getToken(ACCESS_KEY)) || "";
    const refreshToken = (await getToken(REFRESH_KEY)) || "";
    const validAccess = isValidToken(accessToken);
    const validRefresh = isValidToken(refreshToken);

    const pathname = new URL(request.url).pathname;
    const excludeCheck = ["invalid", "expired"];
    const excludedPaths = ["/login", "/"];

    if (excludedPaths.includes(pathname)) {
        if (accessToken && pathname !== "/home") {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    } else {
        const aa = jwtDecode(refreshToken);
        console.log(aa);
        console.log(validAccess);
        console.log(validRefresh);
        if (!accessToken || !refreshToken) {
            if (pathname !== "/login") {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }

        // 리프레시 토큰이 없으면 리다이렉팅
        if (!excludeCheck.includes(validRefresh)) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        // if (!excludeCheck.includes(validAccess)) {
        // }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/home", "/login", "/"],
};
