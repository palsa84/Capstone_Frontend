import React from 'react';
import { View, Text, Image, TouchableOpacity  } from 'react-native';
import { MypageContainer, ProfileWrapper, ProfileImage, RoleBox, RoleText, NameBox, NameText, SectionTitle, GrayBox, Row, TextButton, TextButtonText } from '../components/styles';
import PwChange from '../screens/PwChange';
import Quit from '../screens/Quit';
import ReviewManage from '../screens/ReviewManage';
import ProfileEdit from '../screens/ProfileEdit';
import { getUser, setUser } from '../utils/userInfo';
import Toast from 'react-native-root-toast'; 
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const Mypage = ({ navigation }) => {
    const user = getUser();
    if (!user) return (<MypageContainer><Text>로그인 정보를 불러오지 못했습니다.</Text></MypageContainer>);
    const { userRole, userImg } = user;
    const [userName, setUserName] = useState(user.userName);
    
    useFocusEffect(
        useCallback(() => {
            const latestUser = getUser();
            if (latestUser?.userName) {
                setUserName(latestUser.userName);
            }
        }, [])
    );

    return (
        <MypageContainer>
            <ProfileWrapper>
            <ProfileImage source={{ uri: `http://192.168.0.22:5000/img/${userImg}` }} onError={() => console.log('이미지 로드 실패:', userImg)}/>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RoleBox><RoleText>{userRole}</RoleText></RoleBox>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                        <NameBox><NameText>{userName}</NameText></NameBox>
                    </View>
                </View>
            </ProfileWrapper>

            <Row style={{ justifyContent: 'space-around', marginTop: 10 }}>
                <TextButton onPress={() => navigation.navigate('ReviewManage')}><TextButtonText></TextButtonText></TextButton>
                <TextButton onPress={() => navigation.navigate('ProfileEdit')}><TextButtonText>프로필 수정</TextButtonText></TextButton>
            </Row>

            <SectionTitle>회원 정보</SectionTitle>
            <GrayBox>
                <Row>
                    <TextButton onPress={() => navigation.navigate('PwChange')}><TextButtonText>비밀번호 변경</TextButtonText></TextButton>
                    <TouchableOpacity onPress={() => {
                        setUser(null);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                        setTimeout(() => {
                            Toast.show('로그아웃되었습니다.', {
                                duration: 3000,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                                backgroundColor: '#333',
                                textColor: '#fff',
                            });}, 300);
                    }}
                    style={{ paddingRight: 100 }}
                    >
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
                        로그아웃
                    </Text>
                    </TouchableOpacity>
                </Row>
                <Row>
                    <TextButton onPress={() => navigation.navigate('Quit')}><TextButtonText>회원탈퇴</TextButtonText></TextButton>
                </Row>
            </GrayBox>

            <SectionTitle>결제수단</SectionTitle>
            <GrayBox>
                <TextButton><TextButtonText>결제수단</TextButtonText></TextButton>
            </GrayBox>
        </MypageContainer>
    );
};

export default Mypage;
