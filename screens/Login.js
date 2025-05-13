import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
import { Formik } from "formik";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
//카카오 로그인 함수
import { login, logout, getProfile as getKakaoProfile, shippingAddresses as getKakaoShippingAddresses, unlink } from "@react-native-seoul/kakao-login";
import axios from 'axios'; 
import { setUser } from '../utils/userInfo';

import {  
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    Colors,
    TextLink,
    TextLinkContent,
    TextLink2,
    TextLinkContent2,
    LoginButton,
    TextLink3,
    TextLinkContent3,
} from "../components/styles";
const { exTextColor } = Colors;

const Login = ({ navigation }) => {
    const [result, setResult] = useState(""); //로그인 결과 상태 처리
    const [loginError, setLoginError] = useState(false);

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

                {/*강사 로그인 링크*/}
                <TextLink2 onPress={() => navigation.replace("Logininst")}>
                    <TextLinkContent2>강사 로그인</TextLinkContent2>
                    </TextLink2>

                <TextLink3 onPress={() => navigation.navigate("Searchinfo")}>
                    <TextLinkContent3>이메일/비밀번호 찾기</TextLinkContent3>
                </TextLink3>

                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require("../assets/img/logo.png")} />
                    <PageTitle>파크골프ON</PageTitle>

                    <SubTitle>회원 로그인</SubTitle>

                    {/* 카카오 로그인 버튼 */}
                    <Pressable style={styles.button} onPress={signInWithKakao}>
                        <Text style={styles.text}>카카오 로그인</Text>
                        </Pressable>

                    {/*이메일, 비밀번호 로그인 폼 */}
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={(values) => {
                            axios.post('http://10.0.2.2:5000/api/login', {
                                userEmail: values.email,
                                userPw: values.password
                            })
                            .then(res => {
                                if (res.data.success) {
                                    setLoginError(false); 
                                    console.log('로그인 성공:', res.data.user);
                                    setUser({
                                        userName: res.data.user.userName,
                                        userRole: res.data.user.userRole,
                                        userImg: res.data.user.userImg
                                    });
                                    navigation.navigate("SelectAddress", {
                                        userNum: res.data.user.userNum // userNum을 함께 전달 (선택사항)
                                    });
                                }
                            })
                            .catch(err => {
                                console.error('로그인 실패:', err);
                                setLoginError(true); 
                            });
                        }}
                    >
                        {/* 에러 메시지 */}
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                {loginError && (
                                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
                                        이메일 또는 비밀번호가 올바르지 않습니다.
                                    </Text>
                                )}

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

                                <LoginButton onPress={handleSubmit}>
                                    <ButtonText>로그인</ButtonText>
                                </LoginButton>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};


// 로그인/비밀번호 입력 필드 컴포넌트
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


// 카카오 로그인 스타일 
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FEE500", 
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Login;