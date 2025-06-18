import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAccessToken } from "@/utils/verifyAccessToken";

export async function GET(req: Request) {
    try {
        // 액세스토큰 검증
        const verifyResult = verifyAccessToken(req);
        console.log(verifyResult);

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
