import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Formik } from 'formik';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import axios from 'axios';

import {  
    StyledContainer,
    InnerContainer,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
} from './../components/styles'; 
const { exTextColor } = Colors;

const Signup = ({navigation}) => {
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    // 이메일 유효성 검사 
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar barStyle="dark-content" /> 
                <InnerContainer>
                    {/* 회원가입 폼 */}
                    <Formik
                        initialValues={{ userName: '', email: '', password: '', confirmPassword: '' }}
                        onSubmit={(values) => {
                            const validEmail = isValidEmail(values.email);
                            const pwMatch = values.password === values.confirmPassword;


                            setEmailInvalid(!validEmail);
                            setPasswordMismatch(validEmail && !pwMatch); // 이메일이 유효하면 비밀번호 검사
                            
                            // 이메일과 비밀번호가 유효해야
                            if (!validEmail || !pwMatch) return;
                            
                            axios.post('http://10.0.2.2:5000/api/signup', {
                                userName: values.userName,
                                userEmail: values.email,
                                userPw: values.password,
                            })
                            .then(res => {
                                if (res.data.success) {
                                    console.log('회원가입 성공:', res.data);
                                    navigation.navigate("Welcome", {
                                        userName: values.userName,
                                        userEmail: values.email,
                                    });
                                }
                            })
                            .catch(err => {
                                console.error('회원가입 실패:', err);
                                
                                if (err.response && err.response.status === 409) {
                                    setEmailExists(true); // 중복 이메일
                                }   else {
                                    // 기타 서버 오류
                                    setEmailExists(false);
                                }
                            });
                        }}
                    >
                        {/* 에러 메시지 */}
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                {(emailInvalid || passwordMismatch || emailExists) && (
                                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
                                        {emailInvalid
                                            ? '유효한 이메일을 입력해주세요.'
                                            : passwordMismatch
                                                ? '비밀번호가 일치하지 않습니다'
                                                : '이미 가입된 이메일입니다.'}
                                        </Text>
                                    )}

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
