import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {
    MypageContainer, ProfileWrapper, ProfileImage,
    RoleBox, RoleText, NameBox, NameText,
    TextButton, TextButtonText, Row, PwCangeGrayBox
} from '../components/styles';
import { getUser, setUser } from '../utils/userInfo';

const ProfileEdit = ({ navigation }) => {
    const user = getUser();
    const {
        userName, userRole, userImg, userEmail,
        userNum, userGender, userBirth, userHealthInfo
    } = user;

    const [editedName, setEditedName] = useState(userName);
    const [editedEmail, setEditedEmail] = useState(userEmail);  

    const handleSave = async () => {
        try {
            const res = await axios.put(`http://192.168.0.22:5000/api/users/${userNum}`, {
                userName: editedName,
                userHealthInfo
            });

            // 기존 user 객체 가져와서 이름과 건강정보만 갱신
            const updatedUser = {
                ...getUser(),
                userName: editedName,
                userHealthInfo
            };

            // localStorage 업데이트
            setUser(updatedUser);

            Alert.alert('수정 완료', '프로필이 성공적으로 수정되었습니다.');
            navigation.goBack();
        } catch (err) {
            console.error('프로필 수정 실패:', err);
            Alert.alert('오류', '프로필 수정에 실패했습니다.');
        }
    };

    return (
        <MypageContainer>
            <ProfileWrapper>
                <ProfileImage source={{ uri: `http://192.168.0.22:5000/img/${userImg}` }} />
                <View style={{ flex: 1 }}>
                    <RoleBox><RoleText>{userRole}</RoleText></RoleBox>
                    <NameBox><NameText>{userName}</NameText></NameBox>
                </View>
            </ProfileWrapper>

            <PwCangeGrayBox>
                <Row style={{ marginBottom: 30 }}>
                    <Text style={{ fontWeight: 'bold', width: 70 }}>이름:</Text>
                    <TextInput
                        value={editedName}
                        onChangeText={setEditedName}
                        style={{ flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 }}
                    />
                </Row>
            </PwCangeGrayBox>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TextButton onPress={handleSave}>
                    <TextButtonText style={{
                        backgroundColor: '#fff000',
                        paddingHorizontal: 40,
                        paddingVertical: 10,
                        borderRadius: 10
                    }}>
                        저장
                    </TextButtonText>
                </TextButton>
            </View>
        </MypageContainer>
    );
};

export default ProfileEdit;
