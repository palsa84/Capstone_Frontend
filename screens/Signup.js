import React, { useState } from 'react';
import { StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import {  
    StyledContainerLogin,
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
    const [show, setShow] = useState(false); // 날짜 선택창 표시 여부
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [dob, setDob] = useState(); // 선택된 생년월일 저장

    // 날짜 선택 이벤트 핸들러
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    };

    // 날짜 선택창 표시 함수
    const showDatePicker = () => {
        setShow(true);
    }

    return (
            <KeyboardAvoidingWrapper>
                <StyledContainerLogin>
                    <StatusBar barStyle="dark-content" /> 
                    <InnerContainer>
                        <SubTitle>회원가입</SubTitle>
                    
                        {/*날짜 선택창 show DatePicker*/}
                        {show && ( //showDatePicker
                            <DateTimePicker 
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                is24Hour={true}
                                onChange={onChange}
                            />
                        )}
                        
                        {/*회원가입 폼*/}
                        <Formik initialValues={{ userName: '', email: '', dateOfBirth: '', password: '', confirmPassword: '' }} onSubmit={(values) => {
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
                                    label="생년월일"
                                    placeholder="YYYY - MM - DD"
                                    placeholderTextColor={exTextColor}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dob ? dob.toDateString() : ''}
                                    isDate={true}
                                    editable={false}
                                    showDatePicker={showDatePicker}
                                />

                                <MyTextInput
                                    label="비밀번호"
                                    placeholder="* * * * * * *"
                                    placeholderTextColor={exTextColor}
                                    onChangeText={handleChange('Password')}
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
                                {/*회원가입 버튼*/}
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>{'가입'}</ButtonText> 
                                </StyledButton>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainerLogin>
        </KeyboardAvoidingWrapper>
    );
};

// 입력 필드 컴포넌트
const MyTextInput = ({ label, isDate, showDatePicker, ...props }) => {
    return (
        <View>
            <StyledInputLabel>
                <Text>{label}</Text> 
            </StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props} />
            </TouchableOpacity>
        )}
        </View>
    );
};

export default Signup;
