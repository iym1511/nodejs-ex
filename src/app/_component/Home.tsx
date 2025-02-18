"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { boardType, getBoard } from "@/fetchData/fetchData";

function Home() {
    const { data } = useQuery<boardType[]>({
        queryKey: ["board"], // 서버에서 사용한 queryKey와 동일하게 설정
        queryFn: getBoard, // 동일한 queryFn 사용
        staleTime: 60 * 1000, // 1분동안 캐시 신선함 1분뒤 재요청
        gcTime: 300 * 1000, // 5분뒤 메모리 정리
    });

    return (
        <div>
            <h1>홈 화면 입니다.</h1>
            <p>HOME 화면~</p>
            {data?.map((a, index) => (
                <div key={index} style={{ border: "1px solid white" }}>
                    <p>{a.title}</p>
                    <p>{a.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
