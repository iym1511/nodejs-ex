interface SetTokenType {
    httpOnly: boolean;
    secure: boolean;
    path: string;
    maxAge: number;
}

interface DeleteTokenType {
    httpOnly: boolean;
    secure: boolean;
    path: string;
    maxAge: number;
    // domain: string;
}

export const REFRESH_TOKEN_COOKIE_OPTIONS: SetTokenType = {
    httpOnly: true, // 클라이언트에서 자바스크립트로 접근 불가
    secure: process.env.NODE_ENV === "production",
    path: "/", // 모든 경로에서 접근 가능
    maxAge: 7 * 24 * 60 * 60, // 1주일
};

export const ACCESS_TOKEN_COOKIE_OPTIONS: SetTokenType = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10,
};

export const DELETE_COOKIE_OPTIONS: DeleteTokenType = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,

    // domain: API_URL,
};

/*
 * 토큰을 부여 할 때는 현재 도메인에 맞춰 쿠키를 저장하기 때문에 도메인 지정 안해도 됨
 * 토큰 삭제 할 때는 저장할 때의 domain 값이 정확히 일치해야 삭제가 가능
 * */
