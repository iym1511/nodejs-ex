import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        // 요청 데이터 받기
        const { userId, password } = await req.json();

        // 유효성 검사
        if (!userId || !password) {
            return NextResponse.json(
                { message: "아이디 또는 패스워드를 입력하십시요." },
                { status: 400 }
            );
        }

        // 1️⃣ **중복 검사 (ID & 이메일)**
        const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("userId")
            .filter("userId", "eq", userId) // userId가 특정 값과 일치하는 조건
            .single(); // 하나의 결과만 가져옴

        if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Supabase Fetch Error:", fetchError);
            return NextResponse.json(
                {
                    message: "Error checking existing users",
                    error: fetchError.message,
                },
                { status: 500 }
            );
        }

        if (existingUser) {
            return NextResponse.json(
                { message: "중복 가입된 아이디가 있습니다." },
                { status: 409 } // 409 Conflict
            );
        }

        // 2️⃣ **비밀번호 해싱**
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3️⃣ **회원가입 진행**
        const { data, error } = await supabase
            .from("users")
            .insert([{ userId, password: hashedPassword }]);

        if (error) {
            console.error("Supabase Insert Error:", error);
            return NextResponse.json(
                { message: "Failed to register user", error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "User registered successfully", user: data },
            { status: 201 }
        );
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
