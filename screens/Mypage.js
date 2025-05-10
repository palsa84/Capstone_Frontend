import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { MypageContainer, ProfileWrapper, ProfileImage, InfoBox, RoleBox, RoleText, NameBox, NameText, SectionTitle, GrayBox, Row, TextButton, TextButtonText } from '../components/styles';
import PwChange from '../screens/PwChange';
import Quit from '../screens/Quit';
import ReviewManage from '../screens/ReviewManage';
import ProfileEdit from '../screens/ProfileEdit';
import { getUser, setUser } from '../utils/userInfo';

const Mypage = ({ navigation }) => {
    const user = getUser();
    if (!user) return (<MypageContainer><Text>로그인 정보를 불러오지 못했습니다.</Text></MypageContainer>);
    const { userName, userRole, userImg } = user;

    return (
        <MypageContainer>
            <ProfileWrapper>
            <ProfileImage source={{ uri: `http://10.0.2.2:5000/img/${userImg}` }} onError={() => console.log('이미지 로드 실패:', userImg)}/>
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
                <TextButton onPress={() => navigation.navigate('ReviewManage')}><TextButtonText>리뷰관리</TextButtonText></TextButton>
                <TextButton onPress={() => navigation.navigate('ProfileEdit')}><TextButtonText>프로필 수정</TextButtonText></TextButton>
            </Row>

            <SectionTitle>회원 정보</SectionTitle>
            <GrayBox>
                <Row>
                    <TextButton onPress={() => navigation.navigate('PwChange')}><TextButtonText>비밀번호 변경</TextButtonText></TextButton>
                    <TextButton onPress={() => { Alert.alert('로그아웃 하시겠습니까?', '', [ { text: '아니오', style: 'cancel' }, { text: '예', onPress: () => { setUser(null); navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); } } ], { cancelable: true }); }}>
                        <TextButtonText style={{ marginLeft: -150 }}>로그아웃</TextButtonText>
                    </TextButton>
                </Row>
                <Row>
                    <TextButton onPress={() => navigation.navigate('Quit')}><TextButtonText>회원탈퇴</TextButtonText></TextButton>
                </Row>
            </GrayBox>

            <SectionTitle>결제수단</SectionTitle>
            <GrayBox>
                <TextButton onPress={() => navigation.navigate('Order')}><TextButtonText>결제내역</TextButtonText></TextButton>
            </GrayBox>
        </MypageContainer>
    );
};

export default Mypage;
