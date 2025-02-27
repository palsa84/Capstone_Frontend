import React from 'react';
import { StatusBar, View } from 'react-native'; // View 추가

import {  
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    LogoutButton,
} from './../components/styles'; 


// Welcome 화면 컴포넌트 정의
const Welcome = ({navigation}) => {
    return (
        <StyledContainer>
            {/* 상태바 스타일 설정 */}
            <StatusBar barStyle="dark-content" />
            <InnerContainer>
                    {/* 로그인 성공 시 */}
                    <PageTitle>환영합니다!</PageTitle>
                    <SubTitle>홍길동 님</SubTitle>
                    <SubTitle>example@gmail.com</SubTitle>
                    {/* 로그아웃 */}
                    <StyledFormArea>
                        <LogoutButton onPress={() => {navigation.navigate("Login");}} style={{ marginBottom: 15 }}>
                            <ButtonText>{'로그아웃'}</ButtonText> 
                        </LogoutButton>

                        {/* 버튼 사이 간격 조정 */}
                        {/* <View style={{ height: 5 }} /> */}

                        <StyledButton onPress={() => navigation.navigate("TabNavigator")}>
                            <ButtonText>{'클래스 선택하기'}</ButtonText> 
                        </StyledButton>

                    </StyledFormArea>
            </InnerContainer>
        </StyledContainer>
    );
};

export default Welcome;
