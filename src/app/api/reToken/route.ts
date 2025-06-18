import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { ACCESS_KEY, REFRESH_KEY } from "@/constant/keys";
import {
    generateAccessToken,
    generateRefreshToken,
} from "@/app/api/_auth/authTokens";
import {
    ACCESS_TOKEN_COOKIE_OPTIONS,
    REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/app/api/_auth/cookieOption";

export async function POST(req: NextRequest) {
    const id = "iym1111";

    try {
        // 1️⃣ **수파베이스에서 사용자 확인**
        const { data: existingUser, error } = await supabase
            .from("users")
            .select("userId, password")
            .eq("userId", id)
            .single(); // 하나의 사용자만 가져옴

        if (error || !existingUser) {
            return NextResponse.json(
                { message: "아이디가 존재하지 않습니다." },
                { status: 404 } // 사용자 없음
            );
        }

        // 3️⃣ **JWT 발급**
        const accessToken = generateAccessToken(id); // 엑세스 토큰 발급
        const refreshToken = generateRefreshToken(id); // 리프레시 토큰 발급

        const response = NextResponse.json(
            {
                message: "로그인 성공",
                id: id,
                // accessToken, // 엑세스 토큰 (클라이언트에서 쿠키를 관리 할 시 사용)
                // refreshToken, // 리프레시 토큰 (클라이언트에서 쿠키를 관리 할 시 사용)
            },
            { status: 200 }
        );

        // 쿠키에 저장
        response.cookies.set(
            ACCESS_KEY,
            accessToken.token,
            ACCESS_TOKEN_COOKIE_OPTIONS
        );

        response.cookies.set(
            REFRESH_KEY,
            refreshToken.token,
            REFRESH_TOKEN_COOKIE_OPTIONS
        );

        return response; // 한 번만 응답 반환
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
