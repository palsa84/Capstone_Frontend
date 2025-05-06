import React, { useState } from 'react';
import { StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AgreementContainer, AgreementText, CheckboxRow } from './../components/styles';
import CheckBox from '@react-native-community/checkbox'; 

import {
    StyledContainer,
    InnerContainer,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    GenderContainer,
    GenderButton,
    GenderText,
    HealthOptionsContainer,
    HealthOptionButton,
    HealthOptionText,
} from './../components/styles';

const { exTextColor } = Colors;

const Signup = ({ navigation }) => {
    const [emailInvalid, setEmailInvalid] = useState(false);
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);};
    const [emailExists, setEmailExists] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [healthOptions, setHealthOptions] = useState([
        { label: '팔 불편', selected: false },
        { label: '허리 불편', selected: false },
        { label: '다리 불편', selected: false },
        { label: '손가락 불편', selected: false },
    ]);
    const toggleHealthOption = (index) => {
        const newOptions = [...healthOptions];
        newOptions[index].selected = !newOptions[index].selected;
        setHealthOptions(newOptions);
    };
    const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);



    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar barStyle="dark-content" />
                <InnerContainer>
                    <Formik
                        initialValues={{
                            userName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        onSubmit={(values) => {
                            const validEmail = isValidEmail(values.email);
                            const pwMatch = values.password === values.confirmPassword;

                            setEmailInvalid(!validEmail);
                            setPasswordMismatch(validEmail && !pwMatch);

                            if (!validEmail || !pwMatch) return;
                            if (!agreePersonalInfo) {
                                Alert.alert('알림', '개인정보 수집 및 활용에 동의해주세요.');
                                return;
                            }
                            axios
                                .post('http://10.0.2.2:5000/api/signup', {
                                    userName: values.userName,
                                    userEmail: values.email,
                                    userPw: values.password,
                                    gender,
                                    birthDate: birthDate.toISOString().split('T')[0], // YYYY-MM-DD
                                    healthInfo: healthOptions.filter(opt => opt.selected).map(opt => opt.label) //
                                })
                                .then((res) => {
                                    if (res.data.success) {
                                        navigation.navigate("TabNavigator", {
                                            screen: "Class",
                                        });
                                    }
                                })
                                .catch((err) => {
                                    if (err.response && err.response.status === 409) {
                                        setEmailExists(true);
                                    } else {
                                        setEmailExists(false);
                                    }
                                });
                        }}
                    >
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

                                {/* 이름 + 성별 */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1, marginRight: 10 }}>
                                        <MyTextInput
                                            label="이름"
                                            placeholder="홍길동"
                                            placeholderTextColor={exTextColor}
                                            onChangeText={handleChange('userName')}
                                            onBlur={handleBlur('userName')}
                                            value={values.userName}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <StyledInputLabel>
                                            <Text>성별</Text>
                                        </StyledInputLabel>
                                        <GenderContainer>
                                            <GenderButton selected={gender === 'male'} onPress={() => setGender('male')}>
                                                <GenderText>남</GenderText>
                                            </GenderButton>
                                            <GenderButton selected={gender === 'female'} onPress={() => setGender('female')}>
                                                <GenderText>여</GenderText>
                                            </GenderButton>
                                        </GenderContainer>
                                    </View>
                                </View>

                                {/* 생년월일 */}
                                <StyledInputLabel>
                                    <Text>생년월일</Text>
                                </StyledInputLabel>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <StyledTextInput
                                        placeholder="YYYY-MM-DD"
                                        placeholderTextColor={exTextColor}
                                        value={birthDate.toISOString().split('T')[0]}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={birthDate}
                                        mode="date"
                                        display="spinner"
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false);
                                            if (selectedDate) {
                                                setBirthDate(selectedDate);
                                            }
                                        }}
                                        maximumDate={new Date()}
                                    />
                                )}
                                {/* 이메일, 비밀번호 */}
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

                                <StyledInputLabel>
                                    <Text>건강 정보</Text>
                                </StyledInputLabel>

                                <HealthOptionsContainer>
                                    {healthOptions.map((option, index) => (
                                        <HealthOptionButton
                                            key={index}
                                            onPress={() => toggleHealthOption(index)}
                                            selected={option.selected}
                                        >
                                            <HealthOptionText>{option.label}</HealthOptionText>
                                        </HealthOptionButton>
                                    ))}
                                </HealthOptionsContainer>
                                <StyledInputLabel>
                                    <Text>개인정보 수집 및 활용 동의</Text>
                                </StyledInputLabel>
                                <AgreementContainer>
                                    <AgreementText>
                                        회원가입 시 다음과 같은 개인정보를 수집합니다: 이름, 이메일, 생년월일, 성별, 건강정보 등.
                                        수집된 정보는 파크골프 수업 추천 및 서비스 제공 목적으로만 활용되며,
                                        외부에 제공되지 않습니다. 회원은 언제든지 개인정보 열람, 수정 및 삭제를 요청할 수 있습니다.
                                    </AgreementText>

                                    <CheckboxRow>
                                        <CheckBox
                                            value={!!agreePersonalInfo} 
                                            onValueChange={(newValue) => setAgreePersonalInfo(newValue)}
                                            tintColors={{ true: '#FFE600', false: '#999' }}
                                        />
                                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>동의합니다.</Text>
                                        </CheckboxRow>
                                </AgreementContainer>

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>가입하기</ButtonText>
                                </StyledButton>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, ...props }) => (
    <View>
        <StyledInputLabel>
            <Text>{label}</Text>
        </StyledInputLabel>
        <StyledTextInput {...props} />
    </View>
);

export default Signup;
