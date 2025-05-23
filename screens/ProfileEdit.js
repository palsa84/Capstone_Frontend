import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Toast from 'react-native-root-toast';
import { MypageContainer, ProfileWrapper, ProfileImage, RoleBox, RoleText, NameBox, NameText, TextButton, TextButtonText, Row, PwCangeGrayBox } from '../components/styles';
import { getUser } from '../utils/userInfo';
import { setUser } from '../utils/userInfo';

const ProfileEdit = ({ navigation }) => {
    const user = getUser();
    const { userName, userRole, userImg, userEmail } = user;

    const [editedName, setEditedName] = useState(userName);  
    const [editedEmail, setEditedEmail] = useState(userEmail);

    const handleSave = () => {
        console.log('✅ 저장된 userImg:', userImg);

            setUser({
            userName: editedName,
            userEmail: editedEmail,
            userRole,
            userImg,    
            userNum: user.userNum
        });
        Toast.show('프로필이 수정되었습니다.', {
            duration: 3000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: '#888',
            textColor: '#fff',
        });
        navigation.goBack(); 
    };

    return (
        <MypageContainer>
            <ProfileWrapper>
                <ProfileImage
                    source={{ uri: userImg?.startsWith('http') ? userImg : 'http://192.168.0.22:5000/img/default_userImg.png' }}
                    onError={() => console.log('이미지 로드 실패:', userImg)}
                    />

                <View style={{ flex: 1 }}>
                    <RoleBox><RoleText>{userRole}</RoleText></RoleBox>
                    <NameBox><NameText>{userName}</NameText></NameBox>
                </View>
            </ProfileWrapper>

            <PwCangeGrayBox>
                {/* 이름 입력 필드 */}
                <Row style={{ marginBottom: 30 }}>
                    <Text style={{ fontWeight: 'bold', width: 70 }}>이름:</Text>
                    <TextInput
                        value={editedName}
                        onChangeText={setEditedName}
                        style={{ flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 }}
                    />
                </Row>

                {/* 이메일 입력 필드 */}
                <Row style={{ marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', width: 70 }}>이메일:</Text>
                    <TextInput
                        value={editedEmail}
                        onChangeText={setEditedEmail}
                        style={{ flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 }}
                    />
                </Row>
            </PwCangeGrayBox>

            {/* 저장 버튼 */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TextButton onPress={handleSave}>
                    <TextButtonText style={{ backgroundColor: '#fff000', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10 }}>
                        저장
                    </TextButtonText>
                </TextButton>
            </View>
        </MypageContainer>
    );
};

export default ProfileEdit;