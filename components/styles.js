import styled from 'styled-components/native';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export const Colors = { 
    accountBackGroundColor: "#FFFCAF", // 로그인 배경
    whiteColor: "#FFFFFF", 
    textColor: "#434343", // 기본 텍스트
    exTextColor: "#C0C0C0", //ID/PW 입력창 예시 텍스트
    logoColor: "#fff000", 
    loginButtonColor: "#EFEFEF", 
};
const { accountBackGroundColor, whiteColor, textColor, exTextColor, logoColor, loginButtonColor } = Colors;

// 상태 표시줄 높이 설정
const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;  // 상태표시줄 높이


// 전체 컨테이너
export const StyledContainer = styled.View`
    flex: 1;
    padding-top: ${StatusBarHeight + 170}px;
    background-color: ${accountBackGroundColor};

    border-color: skyblue;
    border-width: 2px;
`;

// 내부 컨테이너
export const InnerContainer = styled.View`
    flex: 1;
    top: -100px;
    align-items: center;

    border-color: orange;
    border-width: 2px;
`;

// 클래스 컨테이너
export const ClassContainer = styled.View`
    width: 100%;
    top: 70px;
    align-items: center;
    justify-content: center; 
`;

// 클래스 선택 화면 컨테이너
export const ClassScreenContainer = styled.View`
    flex: 1;
    padding-top: ${StatusBarHeight + 120}px;
    background-color: ${whiteColor};

    border-color: pink;
    border-width: 2px;
`;

// 초보자 화면 컨테이너 
export const BeginnerScreenContainer = styled.View`
    flex: 1;
    background-color: ${whiteColor};
    
    border-color: blue;
    border-width: 2px;
`;

// 로고 
export const PageLogo = styled.Image`
    width: 250px;
    height: 215px;
`;
// 제목 
export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${logoColor};
    padding: 10px;
`;

// 부제목
export const SubTitle = styled.Text`
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    color: ${textColor};
    
`;

// 폼 영역
export const StyledFormArea = styled.View`
    width: 70%;
`;
// 입력 필드 
export const StyledTextInput = styled.TextInput`
    background-color: ${whiteColor};
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
// 입력 필드 라벨
export const StyledInputLabel = styled.Text`
    color: ${textColor};
    font-size: 15px;
    text-align: left;
`;

// 버튼
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
// 로그인 버튼
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
// 로그아웃 버튼
export const LogoutButton = styled.TouchableOpacity`
    padding: 15px;
    width: 40%; 
    background-color: ${loginButtonColor};
    justify-content: center;
    border-radius: 10px;
    height: 50px; 
    align-self: center;
`;

// 버튼 텍스트 
export const ButtonText = styled.Text`
    color: ${textColor};
    font-size: 15px;
    text-align: center; 
    width: 100%;
    line-height: 18px;
`;


// 클래스 버튼 
export const ClassButton = styled.TouchableOpacity`
    padding: 40px;
    width: 48%;
    background-color: ${whiteColor};
    border-radius: 10px;
    margin-vertical: 10px; 
    align-items: center; 

    border-color: black;
    border-width: 3px;
`;
// 클래스 선택 버튼 텍스트
export const ClassButtonText = styled.Text`
    color: ${textColor};
    font-size: 15px;
    font-weight: bold;
    text-align: center;
`;

// 하단 내비게이션 텍스트
export const BottomNavigationText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${textColor}; 
`;

// FlatList 스타일 (2x2)
export const GridWrapper = {
    justifyContent: 'space-between'
};

// 회원가입 링크
export const TextLink = styled.TouchableOpacity`
    position: absolute;
    right: 30px;
    top: 40px;
`;

// 회원가입 링크 텍스트
export const TextLinkContent = styled.Text`
    color: ${textColor};
    font-size: 15px;
`;

// 강사로그인 링크
export const TextLink2 = styled.TouchableOpacity`
    position: absolute;
    right: 30px;
    top: 70px;
`;

// 강사로그인 링크 텍스트 
export const TextLinkContent2 = styled.Text`
    color: ${textColor};
    font-size: 15px;
`;


// 상단 커스텀헤더 
export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${logoColor};
    padding: 10px;
`;


// LessonDetail.js 레슨 상세 화면 컨테이너
export const LessonDetailContainer = styled.View`
    flex: 1;
    background-color: white;
    justify-content: center;
    border-color: green;
    border-width: 2px;
`;

// LessonDetail.js 레슨 배경 이미지 + 강사 이미지 컨테이너
export const LessonHeaderContainer = styled.View`
    width: 100%;
    align-items: center;
`;

// LessonDetail.js 레슨 배경 이미지
export const LessonBackgroundImage = styled.Image`
    width: 100%;
    height: 200px;
    resize-mode: cover;
`;

// LessonDetail.js 강사 이미지
export const LessonProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-top: -50px;
    border-color: black;
    border-width: 2px;
`;

// LessonDetail.js 강사명 + 레슨명 + 가격 컨테이너
export const LessonDetailInfoContainer = styled.View`
    width: 100%;
    align-items: center;
    padding: 10px;
`;

// LessonDetail.js 강사명 스타일
export const InstructorName = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
`;

// LessonDetail.js 레슨명(타원) 컨테이너 
export const LessonNameContainer = styled.View`
    padding: 10px 20px;
    border-radius: 20px;
    border-color: black;
    border-width: 2px;
    align-items: center;
    justify-content: center;
`;

// LessonDetail.js  레슨명(타원) 텍스트
export const LessonNameText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: black;
    text-align: center;
`;

// LessonDetail.js 가격 텍스트
export const LessonPrice = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: black;
    align-self: flex-end;
    margin-top: 15px;
    margin-right: 20px;
`;

// LessonDetail.js 시간(타원) 컨테이너
export const LessonTimeContainer = styled.View`
    padding: 10px 20px;
    border-radius: 20px;
    border-color: black;
    border-width: 2px;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

// LessonDetail.js 시간(타원) 텍스트
export const LessonTimeText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: black;
    text-align: center;
`;

// LessonDetail.js 회색 박스 컨테이너
export const LessonDetailsContainer = styled.View`
    width: 90%;
    margin-top: 20px;
`;

// LessonDetail.js 회색 박스 
export const LessonInfoBox = styled.View`
    background-color: #D3D3D3;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
`;

// LessonDetail.js 박스 제목
export const LessonInfoTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: black;
    margin-bottom: 5px;
`;

// LessonDetail.js 박스 내부 내용 
export const LessonInfoText = styled.Text`
    font-size: 16px;
    color: black;
`;

// Mypage.js 컨테이너
export const MypageContainer = styled.View`
    flex: 1;
    background-color: white;
`;


// Mypage.js 프로필 컨테이너
export const ProfileWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 20px;
    
    border-color: blue;
    border-width: 2px;
`;

// Mypage.js 프로필 이미지 
export const ProfileImage = styled.Image`
    width: 90px;
    height: 90px;
    border-radius: 50px;
    border: 3px solid gray;
    margin-right: 20px;
`;

// Mypage.js 프로필 컨테이너 내부의 userRole
export const RoleBox = styled.View`
    background-color: #fff000;
    padding: 6px 15px;        
    border-radius: 6px;
    align-self: flex-start;
    align-items: center;
    justify-content: center;

    border-radius: 6px;
    margin-bottom: 6px;
`;

// Mypage.js 프로필 컨테이너 내부의 userRole text
export const RoleText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

// Mypage.js 프로필 컨테이너 내부의 userName
export const NameBox = styled.View`
    background-color: #ccc;
    padding: 6px 12px;
    border-radius: 6px;
    align-self: flex-start;
    align-items: center;
    justify-content: center;
`;


// Mypage.js 프로필 컨테이너 내부의 userName text
export const NameText = styled.Text`
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    line-height: 32px;
`;


export const SectionTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
`;

// Mypage.js 회색 박스
export const GrayBox = styled.View`
    background-color: #eee;
    margin: 0 20px 20px 20px;
    padding: 15px;
    border-radius: 10px;
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

export const TextButton = styled.TouchableOpacity``;

export const TextButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: black;
`;

