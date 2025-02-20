import { getToken } from "@/utils/getToken";
import { ACCESS_KEY } from "@/constant/keys";

export interface boardType {
    id: number;
    title: string | null | undefined;
    created_at: string;
    content: string | null | undefined;
}
export const getBoard = async (): Promise<boardType[] | undefined> => {
    try {
        const token = await getToken(ACCESS_KEY);

        const res = await fetch("http://localhost:3000/api/getBoard", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "Cache-Control": "no-store",
            },
        });

        const data = await res.json();

        // data가 배열인지 확인 후 반환
        return Array.isArray(data) ? data : [];
    } catch (e) {
        if (e instanceof Error) {
            // catch된 에러가 Error 객체인 경우, 정확한 타입을 사용하여 처리
            console.error("Error fetching board:", e.message);
        } else {
            // 만약 예상치 못한 에러가 발생했다면, 기본 에러 처리
            console.error("Unknown error:", e);
        }
    }
};
