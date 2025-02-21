import { getToken } from "@/utils/getToken";
import { ACCESS_KEY, API_URL } from "@/constant/keys";

export interface boardType {
    id: number;
    title: string | null | undefined;
    created_at: string;
    content: string | null | undefined;
}
export const getBoard = async (): Promise<boardType[] | undefined> => {
    try {
        const token = await getToken(ACCESS_KEY);

        // getBoard는 서버에서 실행될 가능성이 있어 절대 경로 가 필요함
        const res = await fetch(`${API_URL}/api/getBoard`, {
            method: "GET",
            headers: {
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
