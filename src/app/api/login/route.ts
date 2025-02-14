import { NextRequest, NextResponse } from "next/server";

type User = {
    id: string;
    password: string;
};

export async function POST(req: NextRequest) {
    const { id, password } = await req.json(); // 요청 본문에서 JSON 데이터 받기

    if (id && password) {
        // 정상 응답 반환
        return NextResponse.json({ id, password }, { status: 200 });
    } else {
        // 오류 응답 반환
        return NextResponse.json(
            { message: "ID and password are required" },
            { status: 400 }
        );
    }
}
