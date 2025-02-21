import { LoginType } from "@/app/_component/Login";

export const onSignIn = async (
    info: LoginType
): Promise<{ status: number; user: string } | undefined> => {
    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        });
        const data = await res.json();

        if (!res.ok) {
            const errorMessage =
                res.status === 400
                    ? "이메일 인증 후 로그인 할 수 있습니다."
                    : res.status === 401
                      ? "로그인 정보가 일치하지 않습니다."
                      : `통신오류가 발생하였습니다.`;
            throw new Error(errorMessage);
        }

        return { status: 200, user: data.id };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error);
            throw error;
        } else {
            console.error("Unexpected Error:", error);
            alert("로그인 중 오류가 발생했습니다.");
        }
    }
};
