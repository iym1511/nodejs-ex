import { type JwtPayload, verify } from "jsonwebtoken";

interface VerifyTokenResult {
    success: boolean;
    decoded?: JwtPayload & { userId: string };
    error?: string;
}

/*  JWT(Json Web Token) 검증 함수 */
export function verifyToken(token: string, secret: string): VerifyTokenResult {
    try {
        const decoded = verify(token, secret) as JwtPayload & {
            userId: string;
        };
        return { success: true, decoded };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
