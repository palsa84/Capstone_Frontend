import React, { useLayoutEffect, useState, useEffect } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AlarmButton } from '../navigators/TabNavigator';
import {
    MypageContainer,
    ProfileWrapper,
    ProfileImage,
    RoleBox,
    RoleText,
    NameBox,
    NameText,
    TextButton,
    TextButtonText,
    Row,
    StatusBox,
    StatusRow,
    StatusLabel,
    StatusLabelText,
    StatusValue
} from '../components/styles';
import { getUser } from '../utils/userInfo';
import axios from 'axios';

const instMain = ({ navigation }) => {
    const nav = useNavigation();
    const user = getUser();

    useEffect(() => {
        if (!user) {
            nav.reset({ index: 0, routes: [{ name: 'Logininst' }] });
        } else {
            axios.get(`http://192.168.0.22:5000/api/application/count/byStatus/${user.userNum}`)
                .then(res => {
                    setCounts({
                        ready: res.data['승인완료진행예정'] || 0,
                        waiting: res.data['승인대기'] || 0,
                        cancel: res.data['취소요청'] || 0,
                        deposit: res.data['입금대기'] || 0,
                        done: res.data['레슨완료'] || 0,
                        reject: res.data['거절'] || 0,
                    });
                })
                .catch(err => console.error('신청 상태별 수 가져오기 실패:', err));
        }
    }, []);

    if (!user) return null;

    const { userName, userRole, userImg } = user;
    const BASE_URL = 'http://192.168.0.22:5000';
    const fullImageUrl = userImg?.startsWith('http') ? userImg : `${BASE_URL}/img/${userImg}`;

    const [counts, setCounts] = useState({
        ready: 0,
        waiting: 0,
        cancel: 0,
        deposit: 0,
        done: 0,
        reject: 0,
    });

    useLayoutEffect(() => {
        nav.setOptions({
            headerRight: () => <AlarmButton />,
            headerLeft: () => null,
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#FAF287' },
            headerTintColor: 'black',
        });
    }, [nav]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <MypageContainer style={{ paddingBottom: 30 }}>
                <StatusBar barStyle="dark-content" />

                {/* 프로필 정보 */}
                <ProfileWrapper>
                    <ProfileImage source={{ uri: fullImageUrl }} style={{ marginLeft: 20 }} />
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RoleBox><RoleText>{userRole}</RoleText></RoleBox>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                            <NameBox><NameText>{userName}</NameText></NameBox>
                        </View>
                    </View>
                </ProfileWrapper>

                {/* 프로필 편집, 레슨 편집 */}
                <Row style={{ justifyContent: 'space-around', marginTop: 10 }}>
                    <TextButton onPress={() => navigation.navigate('instProfileEdit')}>
                        <TextButtonText>프로필 편집</TextButtonText>
                    </TextButton>
                    <TextButton onPress={() => navigation.navigate('LessonManage')}>
                        <TextButtonText>레슨 편집</TextButtonText>
                    </TextButton>
                </Row>

                {/* 상태 표시 박스 */}
                <StatusBox>
                    <StatusRow onPress={() => navigation.navigate('instState', { category: '승인완료진행예정' })}>
                        <StatusLabel style={{ width: 100 }}>
                            <StatusLabelText style={{ textAlign: 'center' }} numberOfLines={1}>승인완료</StatusLabelText>
                            <StatusLabelText style={{ textAlign: 'center' }} numberOfLines={1}>진행예정</StatusLabelText>
                        </StatusLabel>
                        <StatusValue>{counts.ready}</StatusValue>
                    </StatusRow>

                    <StatusRow onPress={() => navigation.navigate('instState', { category: '승인대기' })}>
                        <StatusLabel style={{ width: 100 }}>
                            <StatusLabelText style={{ textAlign: 'center' }} numberOfLines={1}>승인대기</StatusLabelText>
                        </StatusLabel>
                        <StatusValue>{counts.waiting}</StatusValue>
                    </StatusRow>

                    <StatusRow onPress={() => navigation.navigate('instState', { category: '취소요청' })}>
                        <StatusLabel style={{ width: 100 }}>
                            <StatusLabelText style={{ textAlign: 'center' }} numberOfLines={1}>취소요청</StatusLabelText>
                        </StatusLabel>
                        <StatusValue>{counts.cancel}</StatusValue>
                    </StatusRow>

                    <StatusRow onPress={() => navigation.navigate('instState', { category: '입금대기' })}>
                        <StatusLabel style={{ width: 100 }}>
                            <StatusLabelText style={{ textAlign: 'center' }} numberOfLines={1}>입금대기</StatusLabelText>
                        </StatusLabel>
                        <StatusValue>{counts.deposit}</StatusValue>
                    </StatusRow>

                    <StatusRow onPress={() => navigation.navigate('instState', { category: '레슨완료' })}>
                        <StatusLabel style={{ width: 100 }}>
                            <StatusLabelText style={{ textAlign: 'center' }} numberOfLines={1}>레슨완료</StatusLabelText>
                        </StatusLabel>
                        <StatusValue>{counts.done}</StatusValue>
                    </StatusRow>

                    <StatusRow onPress={() => navigation.navigate('instState', { category: '거절' })}>
                        <StatusLabel style={{ width: 100 }}>
                            <StatusLabelText style={{ textAlign: 'center' }} numberOfLines={1}>거절</StatusLabelText>
                        </StatusLabel>
                        <StatusValue>{counts.reject}</StatusValue>
                    </StatusRow>
                </StatusBox>
            </MypageContainer>
        </ScrollView>
    );
};

export default instMain;
