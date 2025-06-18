// utils/auth/verifyAccessMiddleware.ts
import { NextResponse } from "next/server";
import { ACCESS_KEY, ACCESS_TOKEN_SECRET } from "@/constant/keys";
import { verifyToken } from "@/utils/verifyToken";
import { DELETE_COOKIE_OPTIONS } from "@/app/api/_auth/cookieOption";

export const verifyAccessToken = (req: Request) => {
    const authHeader = req.headers.get("Authorization");
    console.log("authHeader", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const response = NextResponse.json(
            { message: "No token provided" },
            { status: 401 }
        );
        response.cookies.set(ACCESS_KEY, "", DELETE_COOKIE_OPTIONS);
        return { ok: false, response };
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token, ACCESS_TOKEN_SECRET);
    console.log("디코드", decoded);
    if (!decoded) {
        const response = NextResponse.json(
            { message: "토큰이 유효하지 않거나 만료되었습니다." },
            { status: 401 }
        );
        return { ok: false, response };
    }

    return { ok: true, user: decoded.decoded };
};
