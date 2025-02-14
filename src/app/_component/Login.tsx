"use client";

import React, { ChangeEvent, useState } from "react";
import axios from "axios";

interface LoginType {
    id: string;
    password: string;
}

function Login() {
    const [loginInfo, setLoginInfo] = useState<LoginType>({
        id: "",
        password: "",
    });

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onLogin = async (): Promise<void> => {
        try {
            const res = await axios.post("/api/login", loginInfo);
            console.log("로그인 성공:", res.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message || "로그인 실패");
            }
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
    };

    // useEffect(() => {
    //     onLogin();
    // }, []);

    return (
        <div>
            <h1>로그인 화면 입니다.</h1>
            <p>로그인화면~</p>
            <input
                type="text"
                name="id"
                placeholder="아이디입력창"
                value={loginInfo.id}
                onChange={onChangeInput}
            />
            <input
                type="password"
                name="password"
                placeholder="비밀번호 입력창"
                value={loginInfo.password}
                onChange={onChangeInput}
            />
            <button onClick={onLogin}>로긘</button>
        </div>
    );
}

export default Login;
