import { NextRequest, NextResponse } from "next/server";
import {
    generateAccessToken,
    generateRefreshToken,
} from "@/app/api/_auth/authTokens";
import { verifyToken } from "@/utils/verifyToken";
import { ACCESS_KEY, REFRESH_KEY, REFRESH_TOKEN_SECRET } from "@/constant/keys";
import {
    ACCESS_TOKEN_COOKIE_OPTIONS,
    REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/app/api/_auth/cookieOption";

export async function POST(req: NextRequest) {
    try {
        // const responseCookies = new ResponseCookies(req.headers);

        const cookies = req.headers.get("cookie") || "";
        const getTokens = cookies.split("=");
        const getRefreshToken = getTokens[1];
        // console.log(cookies);
        // 만약 refreshToken이 없다면 에러 처리
        if (!getRefreshToken) {
            return NextResponse.json(
                {
                    message: "리프레시 토큰이 없습니다.",
                },
                { status: 400 }
            );
        }

        const verifyRefreshTkn = verifyToken(
            getRefreshToken,
            REFRESH_TOKEN_SECRET
        );

        // 3️⃣ **JWT 발급**
        if (verifyRefreshTkn.success) {
            const accessToken = generateAccessToken(getRefreshToken); // 엑세스 토큰 발급
            const refreshToken = generateRefreshToken(getRefreshToken); // 리프레시 토큰 발급

            // 토큰 응답
            const response = NextResponse.json(
                {
                    message: "리프레시,엑세스 토큰 재발급 완료",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
                { status: 200 }
            );
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
        }
    } catch (error) {
        console.error("토큰 발급 중 오류 발생:", error);

        return NextResponse.json(
            {
                message: "토큰 발급중 오류가 발생했습니다. 다시 시도해주세요.",
                error:
                    error instanceof Error ? error.message : "알 수 없는 오류",
            },
            { status: 500 }
        );
    }
}
