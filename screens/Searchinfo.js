import React, { useState } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Formik } from 'formik';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import {
    StyledContainer,
    InnerContainer,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    LoginButton,
} from '../components/styles';

const { exTextColor } = Colors;

const Searchinfo = ({ navigation }) => {
    const [email, setEmail] = useState('');

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar barStyle="dark-content" />
                <InnerContainer>
                    <Formik
                        initialValues={{ email: '' }}
                        onSubmit={() => {
                            navigation.navigate('Login');
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <StyledInputLabel>
                                    <Text>가입된 이메일을 입력해주세요</Text>
                                </StyledInputLabel>
                                <StyledTextInput
                                    placeholder="example@gmail.com"
                                    placeholderTextColor={exTextColor}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />

                                <LoginButton onPress={handleSubmit}>
                                <ButtonText>다음</ButtonText>
                                </LoginButton>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

export default Searchinfo;
