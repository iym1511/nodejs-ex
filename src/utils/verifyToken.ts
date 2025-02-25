import jwt from "jsonwebtoken";

export const verifyToken = (token: string, secretKey: string) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { success: true, decoded }; // 유효한 토큰이면 디코딩된 정보 반환
    } catch (err: unknown) {
        return {
            success: false,
            message: "토큰 검증 실패",
            error: err,
        }; // 검증 실패 시 메시지 반환
    }
};
