/* 항상 서버사이드에서 실행 "use server" 적용필요 x */

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/utils/getToken";

export async function middleware(request: NextRequest) {
    const accessToken = await getToken("accessKey");

    const pathname = new URL(request.url).pathname;

    const excludedPaths = ["/login", "/"];
    console.log(accessToken);
    if (excludedPaths.includes(pathname)) {
        if (accessToken && pathname !== "/home") {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    } else {
        if (!accessToken) {
            // deleteCookie(ACCESS_KEY);
            if (pathname !== "/login") {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/home", "/login", "/"],
};
