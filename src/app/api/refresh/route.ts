import { type NextRequest, NextResponse } from "next/server";
import {
    generateAccessToken,
    generateRefreshToken,
} from "@/app/api/_auth/authTokens";
import { verifyToken } from "@/utils/verifyToken";
import { REFRESH_TOKEN_SECRET } from "@/constant/keys";

export async function POST(req: NextRequest) {
    try {
        const getRefreshToken = req.headers.get("Cookie");
        const refreshToken = getRefreshToken?.split("=")?.[1];

        /* 리프레시 토큰이 없을 때 🔑🔥 */
        if (!refreshToken) {
            return NextResponse.json(
                { message: "리프레시 토큰이 없습니다." },
                { status: 400 }
            );
        }

        const verifiedToken = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);

        if (!verifiedToken.success || !verifiedToken.decoded) {
            return NextResponse.json(
                { message: "유효하지 않은 리프레시 토큰입니다." },
                { status: 401 }
            );
        }

        if ("userId" in verifiedToken.decoded) {
            const userId = verifiedToken.decoded.userId;
            const newAccessToken = generateAccessToken(userId);
            const newRefreshToken = generateRefreshToken(userId);

            return NextResponse.json(
                {
                    message: "토큰이 성공적으로 갱신되었습니다.",
                    accessToken: newAccessToken.token,
                    refreshToken: newRefreshToken.token,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "토큰에 사용자 ID가 없습니다." },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("토큰 갱신 중 오류 발생:", error);
        return NextResponse.json(
            {
                message: "토큰 갱신 중 오류가 발생했습니다.",
                error:
                    error instanceof Error ? error.message : "알 수 없는 오류",
            },
            { status: 500 }
        );
    }
}
