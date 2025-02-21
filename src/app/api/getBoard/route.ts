import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/utils/verifyToken";
import { ACCESS_KEY } from "@/constant/keys";

export async function GET(req: Request) {
    try {
        // Authorization 헤더에서 Bearer 토큰 가져오기
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            // Authorization 헤더가 없거나 Bearer 타입이 아닌 경우
            const response = NextResponse.json(
                { message: "No token provided" },
                { status: 401 }
            );
            // 쿠키 삭제
            // 필요한 경우 추가 옵션 설정
            response.cookies.set(ACCESS_KEY, "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 0,
            });
            return response;
        }

        const token = authHeader.split(" ")[1]; // Bearer 토큰만 추출
        const decoded = verifyToken(token);

        if (!decoded) {
            // 토큰이 유효하지 않거나 만료된 경우
            const response = NextResponse.json(
                { message: "토큰이 유효하지 않거나 만료되었습니다." },
                { status: 401 }
            );

            // 필요한 경우 추가 옵션 설정
            // response.cookies.set(ACCESS_KEY, "", {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",
            //     path: "/",
            //     maxAge: 0,
            // });

            return response;
        }

        // 요청 데이터 받기
        const { data, error } = await supabase.from("board").select("*");

        if (error) {
            // 데이터 가져오기에 실패한 경우 처리
            console.error("Error fetching board:", error.message);
            return NextResponse.json(
                { message: "Error fetching data" },
                { status: 500 }
            );
        }

        // 데이터가 없으면 빈 배열 반환
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
