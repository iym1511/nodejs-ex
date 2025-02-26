"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { boardType, getBoard } from "@/fetchData/fetchData";
import { ACCESS_KEY } from "@/constant/keys";
import { useRouter } from "next/navigation";
import {
    Container,
    LeftSection,
    MainSection,
    RightSection,
    UserArticle,
    UserInfo,
    WorkBtn,
    WorkTimeBox,
} from "@/styles/home";
import LiveClock from "@/app/home/_component/LiveClock";
import { getToken } from "@/utils/getToken";

function Home() {
    const router = useRouter();

    const { data } = useQuery<boardType[] | undefined>({
        queryKey: ["board"], // 서버에서 사용한 queryKey와 동일하게 설정
        queryFn: getBoard, // 동일한 queryFn 사용
        staleTime: 60 * 1000, // 1분동안 캐시 신선함 1분뒤 재요청
        gcTime: 300 * 1000, // 5분뒤 메모리 정리
    });

    const consoleToken = async () => {
        const getTkn = await getToken(ACCESS_KEY);
    };

    const onLogout = async () => {
        try {
            // 로그아웃 요청
            const response = await fetch("/api/logout", {
                method: "POST",
            });

            // 로그아웃 요청이 성공한 후 쿠키 삭제
            if (response.ok) {
                // 로그인 페이지로 이동
                router.push("/login");
            } else {
                throw new Error("로그아웃 처리에 실패했습니다.");
            }
        } catch (e: unknown) {
            console.log(e);
            console.error("로그아웃 중 오류 발생:");
            // 오류 처리 로직 (예: 사용자에게 알림 표시 등)
        }
    };

    return (
        <div>
            <h1>홈 화면 입니다.</h1>
            <p>HOME 화면~</p>
            <button onClick={consoleToken}>토큰확인</button>
            <button onClick={onLogout}>로그아웃</button>
            {data?.map((a, index) => (
                <div key={index} style={{ border: "1px solid white" }}>
                    <p>{a.title}</p>
                    <p>{a.content}</p>
                </div>
            ))}
            <Container>
                <LeftSection>
                    <UserArticle>
                        <UserInfo>
                            {/*<img*/}
                            {/*    className="user-img"*/}
                            {/*    src="/assets/폼폼푸린.jpg"*/}
                            {/*    alt=""*/}
                            {/*/>*/}
                            <div className="user-text">
                                <p>문일윤 사원</p>
                                <p>개발팀</p>
                            </div>
                        </UserInfo>
                        <WorkTimeBox>
                            <p>근태 관리</p>
                            <LiveClock />
                            <p>출근 : 08:50:55</p>
                            <p>퇴근 : 06:00:12</p>
                        </WorkTimeBox>
                        <WorkBtn>
                            <button>출근</button>
                            <button>퇴근</button>
                        </WorkBtn>
                    </UserArticle>
                </LeftSection>
                <MainSection>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </MainSection>
                <RightSection>
                    <div></div>
                    <div></div>
                    <div></div>
                </RightSection>
            </Container>
        </div>
    );
}

export default Home;
