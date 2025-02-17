import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/constant/keys"; // 수파베이스 클라이언트 임포트

type User = {
    id: string;
    password: string;
};

// 비밀 키, 실제 서비스에서는 환경 변수로 관리해야 함
// 엑세스 토큰 발급 함수
function generateAccessToken(userId: string) {
    const expiresIn = "15m";
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
        expiresIn,
    });
    const expirationDate = jwt.decode(accessToken) as { exp: number };
    const exp = expirationDate.exp * 1000 - Date.now();

    return { accessToken, exp };
}

// 리프레시 토큰 발급 함수
function generateRefreshToken(userId: string) {
    const expiresIn = "7d";
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
        expiresIn,
    });

    const expirationDate = jwt.decode(refreshToken) as { exp: number };
    console.log(expirationDate);
    const exp = expirationDate.exp * 1000 - Date.now();
    return { refreshToken, exp };
}

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

        return NextResponse.json(
            {
                message: "로그인 성공",
                accessToken, // 엑세스 토큰
                refreshToken, // 리프레시 토큰
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
