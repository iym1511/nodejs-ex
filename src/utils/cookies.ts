// 쿠키에 저장
import {
    CookieValueTypes,
    deleteCookie,
    getCookie,
    setCookie,
} from "cookies-next";
import { NextRequest } from "next/server";

export const setCookies = (key: string, res: string): void => {
    setCookie(key, res, {
        maxAge: 7 * 24 * 60 * 60, // 7일 (초 단위)
        path: "/", // 전체 경로에서 유효
        secure: false, // HTTP HTTPS 둘다 허용
        sameSite: "strict", // 크로스 사이트 요청 방지
    });
};

export const getCookies = (
    key: string,
    request?: NextRequest
): CookieValueTypes | Promise<CookieValueTypes> => {
    return getCookie(key, { req: request });
};

export const deleteCookies = (key: string): void => {
    deleteCookie(key);
};
