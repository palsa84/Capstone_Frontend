import React from 'react';
import { StatusBar } from 'react-native'; 

import {  
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    WelcomeContainer,
} from './../components/styles'; 


// Welcome 화면 컴포넌트 정의
const Welcome = ({navigation}) => {
    return (
        <StyledContainer>
            {/* 상태바 스타일 설정*/}
            <StatusBar barStyle="dark-content" />
            <InnerContainer>
                <WelcomeContainer>
                    {/*로그인 성공 시*/}
                    <PageTitle Welcome={true}>환영합니다!</PageTitle>
                    <SubTitle Welcome={true}>홍길동 님</SubTitle>
                    <SubTitle Welcome={true}>example@gmail.com</SubTitle>
                    {/*로그아웃*/}
                    <StyledFormArea>
                        <StyledButton onPress={() => {navigation.navigate("Login");}}>
                            <ButtonText>{'로그아웃'}</ButtonText> 
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </StyledContainer>
    );
};


export default Welcome;
