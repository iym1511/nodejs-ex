import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { ACCESS_KEY, REFRESH_KEY } from "@/constant/keys";
import {
    generateAccessToken,
    generateRefreshToken,
} from "@/app/api/_auth/authTokens";

export async function POST(req: NextRequest) {
    const { id, password } = await req.json(); // 요청 본문에서 JSON 데이터 받기

    // 유효성 검사
    if (!id || !password) {
        return NextResponse.json(
            { message: "아이디 또는 패스워드를 입력하십시요." },
            { status: 400 }
        );
    }

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

        // 2️⃣ **비밀번호 검증**
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "잘못된 비밀번호입니다." },
                { status: 401 } // 인증 실패
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
        response.cookies.set(ACCESS_KEY, accessToken.token, {
            httpOnly: true, // 클라이언트에서 자바스크립트로 접근 불가
            secure: process.env.NODE_ENV === "production", // production 환경에서만 secure 쿠키 설정
            path: "/", // 모든 경로에서 접근 가능
            maxAge: 10, // 액세스 토큰의 유효 시간 (10분)
        });

        response.cookies.set(REFRESH_KEY, refreshToken.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 30 * 24 * 60 * 60, // 리프레시 토큰의 유효 시간 (30일)
        });

        return response; // 한 번만 응답 반환
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
