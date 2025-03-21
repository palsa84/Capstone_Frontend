import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
import { Formik } from "formik";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

import {  
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    SubTitle,
    Colors,
    LoginButton,    
    TextLink2,
    TextLinkContent2,
} from "../components/styles";
const { exTextColor } = Colors;

const Logininst = ({ navigation }) => {
    const [result, setResult] = useState(""); //로그인 결과 상태 처리
    const [loginError, setLoginError] = useState(false);

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar barStyle="dark-content" />

                {/*강사 로그인 링크*/}
                <TextLink2 onPress={() => navigation.replace("Login")}>
                    <TextLinkContent2>회원 로그인</TextLinkContent2>
                </TextLink2>

                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require("../assets/img/logo.png")} />
                    <PageTitle>파크골프ON</PageTitle>

                    <SubTitle>강사 로그인</SubTitle>

                    {/*이메일, 비밀번호 로그인 폼 */}
                    <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values) => {
                        const { email, password } = values;
                        
                        // 정해진 강사 계정
                        const masterEmail = "master@gmail.com";
                        const masterPassword = "11111111";
                        
                        if (email === masterEmail && password === masterPassword) {
                            setLoginError(false);
                            navigation.navigate("Welcomeinst", {
                                userName: "김강사",
                                userEmail: "master@gmail.com"
                            });
                        } else {
                            setLoginError(true); // 경고 메시지 표시
                        }
                    }}
                    >
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



export default Logininst;