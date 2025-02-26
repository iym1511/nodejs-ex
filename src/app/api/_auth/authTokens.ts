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
