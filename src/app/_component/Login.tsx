"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { onSignIn } from "@/fetchData/auth";
import { useErrMsg } from "@/store/useErrMsg";

export interface LoginType {
    id: string;
    password: string;
}

interface SignUpType {
    userId: string;
    password: string;
}

function Login() {
    const router = useRouter();
    const { errorMsg, setErrMsg } = useErrMsg((state) => ({
        errorMsg: state.errorMsg,
        setErrMsg: state.setErrMsg,
    }));
    console.log(errorMsg);
    const [loginInfo, setLoginInfo] = useState<LoginType>({
        id: "",
        password: "",
    });

    const [sigUpInfo, setSignUpInfo] = useState<SignUpType>({
        userId: "",
        password: "",
    });

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onChangeSignUp = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setSignUpInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onLogin = async (): Promise<void> => {
        try {
            const res = await onSignIn(loginInfo);

            if (res?.status) {
                router.push("/home");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrMsg(error.message);
            } else {
                console.error("Unexpected Error:", error);
                alert("로그인 중 오류가 발생했습니다.");
            }
        }
    };

    const onSignUp = async (): Promise<void> => {
        try {
            await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sigUpInfo),
            });
            /* ✅ res.ok 이 true 면 로그인 로직 실행 */
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("회원가입 에러:", error.message);
                alert(error.message);
            } else {
                console.error("Unexpected Error:", error);
                alert("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div>
            <h1>로그인 화면 입니다.</h1>

            <fieldset style={{ padding: "20px", width: "300px" }}>
                <legend>로그인</legend>

                <div>
                    <label htmlFor="id">아이디:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="아이디입력창"
                        value={loginInfo.id}
                        onChange={onChangeInput}
                    />
                </div>

                <div>
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="비밀번호 입력창"
                        value={loginInfo.password}
                        onChange={onChangeInput}
                    />
                </div>

                <button onClick={onLogin}>로그인</button>
            </fieldset>

            <fieldset style={{ padding: "20px", width: "300px" }}>
                <legend>회원가입</legend>
                <div>
                    <label htmlFor="userId">아이디 : </label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={sigUpInfo.userId}
                        onChange={onChangeSignUp}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={sigUpInfo.password}
                        onChange={onChangeSignUp}
                    />
                </div>
                <button onClick={onSignUp}>회원가입</button>
            </fieldset>
        </div>
    );
}

export default Login;
