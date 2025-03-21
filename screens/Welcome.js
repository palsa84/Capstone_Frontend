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


const Welcome = ({ navigation, route }) => {
    const { userName, userEmail } = route.params || {};
    
    return (
        <StyledContainer>
            <StatusBar barStyle="dark-content" />
            <InnerContainer>
                {/* 로그인 성공 시 */}
                <PageTitle>환영합니다!</PageTitle>
                <SubTitle>{userName} 님</SubTitle>
                <SubTitle>{userEmail}</SubTitle>

                {/* 로그아웃 */}
                <StyledFormArea>
                    <LogoutButton onPress={() => navigation.replace("Login")}>
                        <ButtonText>{'로그아웃'}</ButtonText> 
                    </LogoutButton>

                    <View style={{ height: 20 }} />
                    <StyledButton onPress={() => navigation.navigate("TabNavigator")}>
                        <ButtonText>{'클래스 선택하기'}</ButtonText> 
                    </StyledButton>
                </StyledFormArea>
            </InnerContainer>
        </StyledContainer>
    );
};

export default Welcome;
