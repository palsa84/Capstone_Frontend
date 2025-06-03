import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { getUser, setUser } from '../utils/userInfo';
import {
    QuitContainer,
    QuitTitle,
    QuitInfoText,
    QuitWarningText,
    QuitDangerText,
    QuitCheckboxRow,
    QuitCheckboxText
} from '../components/styles';

const Quit = ({ navigation }) => {
    const [agree, setAgree] = useState(false);
    const user = getUser();

    const handleDelete = async () => {
        if (!agree || !user) return;

        try {
            const res = await axios.delete(`http://192.168.0.22:5000/api/user/delete/${user.userNum}`);
            if (res.data.success) {
                setUser(null);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                });

                Toast.show('탈퇴되었습니다.', {
                    duration: 3000,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: '#333',
                    textColor: '#fff',
                });
            } else {
                Toast.show('탈퇴 실패: 서버 응답 오류', { duration: 3000 });
            }
        } catch (err) {
            Toast.show('탈퇴 실패: 네트워크 오류', { duration: 3000 });
        }
    };

    return (
        <QuitContainer>
            <QuitTitle>회원탈퇴 유의사항</QuitTitle>
            <QuitInfoText>회원 탈퇴 전에 꼭 확인하세요.</QuitInfoText>
            <QuitWarningText>회원탈퇴 후 재가입 하더라도 정보 복구가 불가능합니다.</QuitWarningText>
            <QuitDangerText>정말 탈퇴하시겠습니까?</QuitDangerText>

            <QuitCheckboxRow>
                <CheckBox
                    value={agree}
                    onValueChange={setAgree}
                    tintColors={{ true: '#75ag34', false: '#999' }}
                />
                <QuitCheckboxText>유의사항을 모두 확인하였습니다.</QuitCheckboxText>
            </QuitCheckboxRow>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                    onPress={handleDelete}
                    disabled={!agree}
                    style={{
                        backgroundColor: agree ? '#7aae3e' : '#ccc',
                        paddingVertical: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: agree ? 'white' : '#666'
                    }}>
                        탈퇴하기
                    </Text>
                </TouchableOpacity>
            </View>
        </QuitContainer>
    );
};

export default Quit;
