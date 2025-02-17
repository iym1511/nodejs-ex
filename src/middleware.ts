/* 항상 서버사이드에서 실행 "use server" 적용필요 x */

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/approval",
        "/home",
        "/notice",
        "/schedule",
        "/setting",
        "/login",
        "/",
    ],
};
