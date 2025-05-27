import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import { PwChangeContainer, Row, PwCangeGrayBox, TextButton, TextButtonText } from '../components/styles';
import { getUser } from '../utils/userInfo';
import axios from 'axios';

const PwChange = ({ navigation }) => {
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const user = getUser();

    const handleSave = async () => {
        setErrorMsg('');

        if (!newPw) {
            setErrorMsg('새 비밀번호를 입력해주세요.');
            return;
        }

        if (newPw !== confirmPw) {
            setErrorMsg('새 비밀번호가 올바르지 않습니다.');
            return;
        }

        try {
            const res = await axios.post('http://192.168.0.22:5000/api/users/update-password', {
                userNum: user.userNum,
                currentPw,
                newPw,
            });

            if (res.data.success) {
                Toast.show('비밀번호가 변경되었습니다.', {
                    duration: 3000,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: '#888',
                    textColor: '#fff',
                });
                navigation.goBack();
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setErrorMsg('현재 비밀번호가 올바르지 않습니다.');
            } else {
                setErrorMsg('오류가 발생했습니다.');
            }
        }
    };


    return (
        <PwChangeContainer>
            <PwCangeGrayBox>
                {errorMsg !== '' && (
                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
                        {errorMsg}
                    </Text>
                )}
                <Row style={{ marginBottom: 30 }}>
                    <Text style={{ fontWeight: 'bold', width: 120 }}>현재 비밀번호:</Text>
                    <TextInput
                        secureTextEntry
                        value={currentPw}
                        onChangeText={setCurrentPw}
                        style={{ flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 }}
                    />
                </Row>

                <Row style={{ marginBottom: 30 }}>
                    <Text style={{ fontWeight: 'bold', width: 120 }}>새 비밀번호:</Text>
                    <TextInput
                        secureTextEntry
                        value={newPw}
                        onChangeText={setNewPw}
                        style={{ flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 }}
                    />
                </Row>

                <Row style={{ marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', width: 120 }}>비밀번호 확인:</Text>
                    <TextInput
                        secureTextEntry
                        value={confirmPw}
                        onChangeText={setConfirmPw}
                        style={{ flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 }}
                    />
                </Row>

                <Row style={{ justifyContent: 'center', marginTop: 10 }}>
                    <TextButton onPress={handleSave}>
                        <TextButtonText style={{ backgroundColor: '#fff000', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10 }}>
                            저장
                        </TextButtonText>
                    </TextButton>
                </Row>
            </PwCangeGrayBox>
        </PwChangeContainer>
    );
};

export default PwChange;
