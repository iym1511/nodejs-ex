// import { signin } from "@/fetchData/fetchData";
// import { UserType } from "@/types/UserType";
//
// import { deleteCookies, setCookies } from "@/utils/cookies";
// import { STORAGE_KEY } from "@supabase/auth-js/src/lib/constants";
//
export function jwtDecode(token: string): any | null {
    try {
        if (!token) return null;

        const parts: string[] = token.split(".");

        if (parts.length < 2) {
            throw new Error("Invalid token!");
        }

        const base64Url: string = parts[1];
        const base64: string = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decoded: any = JSON.parse(atob(base64)); // 복호화 한 것을 문자열 -> 객체로 변환

        return decoded; // 복호화된 유저정보 반환
    } catch (error) {
        console.error("Error decoding token:", error);
        throw error;
    }
}
//
// /* 토큰 만료 계산 */
export function isValidToken(
    accessToken: string
): "valid" | "expired" | "invalid" {
    if (!accessToken) {
        return "invalid";
    }
    try {
        const decoded = jwtDecode(accessToken);

        if (!decoded || typeof decoded.exp !== "number") {
            return "invalid";
        }
        const currentTime: number = Date.now() / 1000;
        return decoded.exp > currentTime ? "valid" : "expired";
    } catch (error) {
        console.error("Error during token validation:", error);
        return "invalid";
    }
}
//
// async function setSession(accessToken: string): Promise<boolean> {
//     try {
//         if (accessToken) {
//             // 쿠키에 저장
//             setCookies(STORAGE_KEY, accessToken);
//             // headers 에 토큰 베리어를 설정, 이후 모든 api요청에 토큰이 발행됨
//             return true;
//         } else {
//             deleteCookies(STORAGE_KEY);
//             return false;
//         }
//     } catch (error) {
//         console.error("Error during set session:", error);
//         throw error;
//     }
// }
//
// export const signInUser = async (
//     id: string,
//     password: string
// ): Promise<void> => {
//     try {
//         const access_token = await signin(id, password);
//
//         if (!access_token) {
//             throw new Error("Access token not found in response");
//         }
//         // 아이디 패스워드가 일치하면 토큰을 저장
//         await setSession(access_token);
//     } catch (error) {
//         console.error("Error during sign in:", error);
//         throw error;
//     }
// };
