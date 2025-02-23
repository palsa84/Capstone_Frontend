import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Formik } from 'formik';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import {  
    StyledContainer,
    InnerContainer,
    SubTitle,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
} from './../components/styles'; 
const { exTextColor } = Colors;

const Signup = ({navigation}) => {
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar barStyle="dark-content" /> 
                <InnerContainer>
                    <SubTitle>회원가입</SubTitle>

                    {/* 회원가입 폼 */}
                    <Formik
                        initialValues={{ userName: '', email: '', password: '', confirmPassword: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate("Welcome");
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="이름"
                                    placeholder="홍길동"
                                    placeholderTextColor={exTextColor}
                                    onChangeText={handleChange('userName')}
                                    onBlur={handleBlur('userName')}
                                    value={values.userName}
                                />
                                <MyTextInput
                                    label="이메일"
                                    placeholder="example@gmail.com"
                                    placeholderTextColor={exTextColor}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput
                                    label="비밀번호"
                                    placeholder="* * * * * * *"
                                    placeholderTextColor={exTextColor}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={true}
                                />
                                <MyTextInput
                                    label="비밀번호 확인"
                                    placeholder="* * * * * * *"
                                    placeholderTextColor={exTextColor}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={true}
                                />
                                {/* 회원가입 버튼 */}
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>{'가입하기'}</ButtonText> 
                                </StyledButton>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

// 입력 필드 컴포넌트
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

export default Signup;
