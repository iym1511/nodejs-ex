import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    @font-face {
        font-family: 'LINESeedKR-Bd';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }
    
  /* 기본 리셋 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-size: 16px; /* 기본 폰트 크기 */
    height: 100%;
    width: 100%;
      font-family: 'LINESeedKR-Bd';
  }

  body {
    line-height: 1.5; /* 기본 줄 간격 */
    background-color: #f0f0f0; /* 배경 색상 */
    color: #333; /* 기본 글자 색상 */
  }

  /* a 태그 기본 스타일 제거 */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* 리스트 스타일 초기화 */
  ul, ol {
    list-style: none;
  }

  /* 버튼 기본 스타일 제거 */
  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  /* 입력 폼 기본 스타일 제거 */
  input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }
`;
