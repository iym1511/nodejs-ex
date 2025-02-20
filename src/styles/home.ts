import styled from "styled-components";

export const Container = styled.div`
    display: flex; /* flexbox 사용 */
    width: 100%;
    height: 100vh; /* 전체 화면 높이 */
    padding: 50px;
    font-family: "LINESeedKR-Bd";
`;

export const LeftSection = styled.div`
    flex: 1; /* 왼쪽 섹션의 비율 1 */
`;

export const UserArticle = styled.div`
    width: 100%;
    height: 200px;

    padding: 10px;

    .user-img {
        width: 70px;
        height: 70px;
        background-image: url("../../public/assets/폼폼푸린.jpg");
        background-position: center; /* 중앙 정렬 */
        background-repeat: no-repeat; /* 이미지 반복 방지 */
        background-size: cover; /* 이미지가 요소를 꽉 채우도록 크기 조정 */
        border-radius: 50%;
    }
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;

    .user-text {
        margin-left: 20px;

        p:first-child {
            font-size: 17px;
            font-weight: bold; /* 더 강조하고 싶다면 추가 */
        }

        p:last-child {
            font-size: 12px;
            color: gray;
        }
    }
`;

export const WorkTime = styled.p`
    font-size: 20px;
`;

export const WorkTimeBox = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    margin-top: 15px;
    p:nth-child(2) {
        margin-top: 12px;
    }
    p:nth-child(3) {
        color: #7c7c7c;
        font-size: 12px;
    }

    p:nth-child(4) {
        color: #7c7c7c;
        font-size: 12px;
    }
`;

export const WorkBtn = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    button {
        padding: 10px;
        width: 47%;
        border-radius: 10px;
        font-family: "LINESeedKR-Bd";
    }

    button:first-child {
        color: white;
        background-color: #07a0ff;
    }

    button:last-child {
        background-color: white;
    }
`;

export const MainSection = styled.div`
    flex: 3; /* 가운데 섹션의 비율 3 */
    padding: 20px;
    div {
        border-radius: 10px;
        box-shadow:
            rgba(27, 31, 35, 0.04) 0px 1px 0px,
            rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
    }
    div:nth-child(1) {
        width: 100%;
        height: 50px;
        background-color: white;
    }
    div:nth-child(2) {
        width: 100%;
        height: 180px;
        background-color: white;
        margin-top: 20px;
    }
    div:nth-child(3) {
        width: 100%;
        height: 250px;
        background-color: white;
        margin-top: 20px;
    }
    div:nth-child(4) {
        width: 100%;
        height: 150px;
        background-color: white;
        margin-top: 20px;
    }
`;

export const RightSection = styled.div`
    flex: 1; /* 오른쪽 섹션의 비율 1 */

    padding: 20px;
    div {
        border-radius: 10px;
        box-shadow:
            rgba(27, 31, 35, 0.04) 0px 1px 0px,
            rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
    }
    div:nth-child(1) {
        width: 100%;
        height: 300px;
        background-color: white;
    }
    div:nth-child(2) {
        width: 100%;
        height: 280px;
        background-color: white;
        margin-top: 20px;
    }
    div:nth-child(3) {
        width: 100%;
        height: 200px;
        background-color: white;
        margin-top: 20px;
    }
`;
