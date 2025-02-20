"use client";

import React, { useEffect, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
    ServerStyleSheet,
    StyleSheetManager,
    ThemeProvider,
} from "styled-components";
// import { useThemeMode } from "@/store/useThemeMode";
// import { useShallow } from "zustand/react/shallow";
import { GlobalStyles } from "@/styles/globalStyle/globalStyle";
import { lightTheme } from "@/styles/globalStyle/themeSwither";

export default function StyledComponentsRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    // const { themeState } = useThemeMode(
    //     useShallow((state) => ({ themeState: state.themeState }))
    // );

    // 서버 사이드에서 스타일을 수집하기 위한 객체를 생성합니다.
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    // 서버에서 생성된 스타일을 HTML에 삽입합니다. 스타일을 추출하고 태그를 정리한 후 반환합니다.
    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
    });

    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    if (typeof window !== "undefined") {
        return (
            <ThemeProvider theme={lightTheme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        );
    }

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </StyleSheetManager>
    );
}
