import styled from 'styled-components/native';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export const Colors = { // 색상 객체 정의
    accountBackGroundColor: "#FFFCAF", // 로그인 배경
    backGroundColor: "ffffff", // 기본배경
    blankColor: "#ffffff", // ID/PW 입력창
    textColor: "#434343", // 기본 텍스트
    exTextColor: "#C0C0C0", //ID/PW 입력창 예시 텍스트
    logoColor: "#FAF287", // 로고 텍스트
    loginButtonColor: "#EFEFEF" // 로그인 버튼 
};
const { accountBackGroundColor, backGroundColor, blankColor, textColor, exTextColor, logoColor, loginButtonColor, green, red } = Colors;

// 상태 표시줄 높이 설정
const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;  // 상태표시줄 높이


// 전체 컨테이너 스타일
export const StyledContainer = styled.View`
    flex: 1;
    padding: 40px;
    padding-top: ${StatusBarHeight + 120}px;
    background-color: ${accountBackGroundColor};
    position: relative;
`;

// 기본 컨테이너 스타일
export const StyledContainerBasic = styled.View`
    flex: 1;
    padding: 40px;
    padding-top: ${StatusBarHeight + 120}px;
    background-color: ${backGroundColor};
    position: relative;
`;

// 내부 컨테이너 스타일
export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

// 화면 컨테이너 스타일
export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

// 페이지 로고 스타일
export const PageLogo = styled.Image`
    width: 250px;
    height: 215px;
`;


// 페이지 제목 스타일
export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${logoColor};
    padding: 10px;

    ${(props) => props.welcome && `
        font:size: 35px;
    `}
`;


// 부제목 스타일
export const SubTitle = styled.Text`
    font-size: 20px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${textColor};

    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`;

// 폼 영역 스타일
export const StyledFormArea = styled.View`
    width: 90%;
`;


// 입력 필드 스타일
export const StyledTextInput = styled.TextInput`
    background-color: ${blankColor};
    padding: 10px;
    padding-left: 20px;
    padding-right: 40px;
    border-radius: 10px;
    font-size: 15px;
    height: 60px;
    margin-vertical: 10px;
    margin-bottom: 10px;
    color: ${textColor};
`;


// 입력 필드 라벨 스타일
export const StyledInputLabel = styled.Text`
    color: ${textColor};
    font-size: 15px;
    text-align: left;
`;


// 버튼 스타일
export const StyledButton = styled.TouchableOpacity`
    padding: 20px;
    width: 40%;
    background-color: ${loginButtonColor};
    justify-content: center;
    border-radius: 10px;
    margin-vertical: 10px;
    height: 60px;
    align-self: center;
    align-items: center;
`;


// 버튼 텍스트 스타일
export const ButtonText = styled.Text`
    color: ${textColor};
    font-size: 15px;
    text-align: center; 
    width: 100%; 
`;

// 추가 정보 영역 스타일
export const ExtraView = styled.View`
    padding: 10px
`;

// 추가 텍스트 스타일
export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${textColor};
    font-size: 15px;
`;


// 링크 스타일
export const TextLink = styled.TouchableOpacity`
    position: absolute;
    top: ${StatusBarHeight - 800}px;
    right: 10px;
    z-index: 10; 
`;

// 링크 텍스트 스타일
export const TextLinkContent = styled.Text`
    color: ${textColor};
    font-size: 15px;
`;
