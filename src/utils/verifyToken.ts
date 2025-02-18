// JWT 토큰 검증 함수
import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, "accessKey");
        return decoded; // 유효한 토큰이면 디코딩된 정보 반환
    } catch (err) {
        return null; // 만약 검증에 실패하면 null 반환
    }
};
