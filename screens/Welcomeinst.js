import React from 'react';
import { StatusBar, View } from 'react-native';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    LogoutButton,
} from '../components/styles';

const Welcomeinst = ({ navigation, route }) => {
    const { userName, userEmail } = route.params || {};

    return (
        <StyledContainer>
            <StatusBar barStyle="dark-content" />
            <InnerContainer>
            <PageTitle>환영합니다!</PageTitle>
            <SubTitle>{userName} 님</SubTitle>
            <SubTitle>{userEmail}</SubTitle>

            <StyledFormArea>
                <LogoutButton onPress={() => navigation.replace("Logininst")}>
                    <ButtonText>{'로그아웃'}</ButtonText>
                </LogoutButton>

                <View style={{ height: 80 }} />

                <StyledButton onPress={() => navigation.navigate("AddLesson")}>
                    <ButtonText>{'레슨 생성하기'}</ButtonText>
                </StyledButton>

                <View style={{ height: 20 }} />

                <StyledButton onPress={() => navigation.navigate("EditLesson")}>
                    <ButtonText>{'레슨 수정하기'}</ButtonText>
                </StyledButton>

                <View style={{ height: 20 }} />

                <StyledButton onPress={() => navigation.navigate("DeleteLesson")}>
                    <ButtonText>{'레슨 삭제하기'}</ButtonText>
                </StyledButton>

                </StyledFormArea>
            </InnerContainer>
        </StyledContainer>
    );
};

export default Welcomeinst;
