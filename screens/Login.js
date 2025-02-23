import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
import { Formik } from "formik";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
//카카오 로그인 함수
import { login, logout, getProfile as getKakaoProfile, shippingAddresses as getKakaoShippingAddresses, unlink } from "@react-native-seoul/kakao-login";

import {  
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    ExtraView,
    TextLink,
    TextLinkContent
} from "../components/styles";
const { exTextColor } = Colors;


const Login = ({ navigation }) => {
    const [result, setResult] = useState(""); //로그인 결과 상태 처리

    //카카오 로그인 처리 함수
    const signInWithKakao = async () => { 
        try {
            const token = await login();
            setResult(JSON.stringify(token)); // 로그인 성공 시 토큰 저장
            console.log("login success ", token.accessToken);
        } catch (err) {
            console.error("login err", err);
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar barStyle="dark-content" />

                {/*회원가입 링크*/}
                    <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent>회원가입</TextLinkContent>
                    </TextLink>

                
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require("../assets/img/logo.png")} />
                    <PageTitle>파크골프</PageTitle>
                    <SubTitle>계정 로그인</SubTitle>

                    {/* 카카오 로그인 버튼 */}
                    <Pressable style={styles.button} onPress={signInWithKakao}>
                        <Text style={styles.text}>카카오 로그인</Text>
                        </Pressable>

                    {/*이메일, 비밀번호 로그인 폼 */}
                    <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.navigate("Welcome");}}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="이메일"
                                    placeholder="example@gmail.com"
                                    placeholderTextColor={exTextColor}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                />

                                <MyTextInput
                                    label="비밀번호"
                                    placeholder="* * * * * * *"
                                    placeholderTextColor={exTextColor}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    value={values.password}
                                    secureTextEntry={true}
                                />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>로그인</ButtonText>
                                </StyledButton>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};


// 커스텀 입력 필드 컴포넌트
const MyTextInput = ({ label, ...props }) => {
    return (
        <View> 
            <StyledInputLabel>
                <Text>{label}</Text>
            </StyledInputLabel>
            <StyledTextInput {...props} />
        </View>
        );
};


// 카카오 로그인 스타일 정의
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FEE500", //카카오 로그인 버튼 색상
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Login;