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
    padding: 30px;
    padding-top: ${StatusBarHeight + 100}px;
    background-color: ${accountBackGroundColor};
    

`;

// 내부 컨테이너 스타일
export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    top: -20px;
    align-items: center; 
    
    border-color: red;
    border-width: 5px;

`;

// Class 컨테이너 스타일
export const ClassContainer = styled.View`
    width: 100%;
    top: 140px;
    align-items: center;
    justify-content: center; /* 중앙 정렬 추가 */
`;

// Welcome화면 컨테이너 스타일
export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    justify-content: center;
    align-items: center;


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
`;


// 부제목 스타일
export const SubTitle = styled.Text`
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    color: ${textColor};
    
`;

// 폼 영역 스타일
export const StyledFormArea = styled.View`
    width: 90%;


`;


// 입력 필드 스타일
export const StyledTextInput = styled.TextInput`
    background-color: ${blankColor};
    padding: 20px;
    padding-left: 20px;
    padding-right: 40px;
    border-radius: 10px;
    font-size: 15px;
    height: 60px;
    margin-vertical: 10px;
    margin-bottom: 20px;
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
    width: 60%;
    background-color: ${loginButtonColor};
    justify-content: center;
    border-radius: 10px;
    margin-vertical: 0px;
    height: 60px;
    align-self: center;
`;


// 로그인 버튼 스타일
export const LoginButton = styled.TouchableOpacity`
    padding: 20px;
    width: 30%;
    background-color: ${loginButtonColor};
    justify-content: center;
    border-radius: 10px;
    margin-vertical: 0px;
    height: 60px;
    align-self: center;
`;

// 로그아웃 버튼 스타일
export const LogoutButton = styled.TouchableOpacity`
    padding: 15px;
    width: 40%; /* 크기 축소 */
    background-color: ${loginButtonColor};
    justify-content: center;
    border-radius: 10px;
    height: 50px; /* 높이 축소 */
    align-self: center;
`;

// 버튼 텍스트 스타일
export const ButtonText = styled.Text`
    color: ${textColor};
    font-size: 15px;
    text-align: center; 
    width: 100%;
    line-height: 18px;
`;



// 클래스 버튼 스타일
export const ClassButton = styled.TouchableOpacity`
    padding: 40px;
    width: 48%;
    background-color: ${blankColor};
    border-radius: 10px;
    margin-vertical: 10px; /* 버튼 간격 추가 */
    align-items: center; /* 텍스트 중앙 정렬 */

    border-color: black;
    border-width: 3px;
`;


// 링크 스타일
export const TextLink = styled.TouchableOpacity`
    position: absolute;
    right: 30px;
    top: 40px;


`;

// 링크 텍스트 스타일
export const TextLinkContent = styled.Text`
    color: ${textColor};
    font-size: 15px;


`;
