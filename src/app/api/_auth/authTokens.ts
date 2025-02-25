import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/constant/keys";

interface TokenType {
    exp: number;
    token: string;
}

// 엑세스 토큰 발급 함수
export function generateAccessToken(userId: string): TokenType {
    const expiresIn = "10s";
    const token = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn });
    const { exp } = jwt.decode(token) as { exp: number };

    return { token, exp: exp * 1000 };
}

// 리프레시 토큰 발급 함수
export function generateRefreshToken(userId: string): TokenType {
    const expiresIn = "7d";
    const token = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn });
    const { exp } = jwt.decode(token) as { exp: number };

    return { token, exp: exp * 1000 };
}

// 엑세스 토큰 재발급 함수

// 리프레시 토큰 재발급 함수
// 리프레시 토큰 검증 후 새로운 엑세스 토큰 발급 (풀스택 용) (여기서 쿠키 저장까지)
// export function refreshAccessToken(refreshToken: string): string {
//     try {
//         // 리프레시 토큰을 검증합니다.
//         const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
//
//         // 검증 성공 시, 새로운 엑세스 토큰을 발급
//         const accessToken = jwt.sign(
//             { userId: decoded.userId },
//             ACCESS_TOKEN_SECRET,
//             { expiresIn: "10m" }
//         );
//
//         return accessToken;
//     } catch (error) {
//         throw new Error("리프레시 토큰 검증 실패: " + error.message);
//     }
// }
