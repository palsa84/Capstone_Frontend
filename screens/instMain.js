import React, { useLayoutEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
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

const instMain = ({ navigation }) => {
    const nav = useNavigation();

    const user = getUser();
    const { userName, userRole, userImg } = user || {
        userName: '김강사',
        userRole: '강사',
        userImg: 'http://10.32.10.126:3000/img/person1.png',
    };

    const [counts, setCounts] = useState({
        ready: 3,
        waiting: 10,
        cancel: 4,
        deposit: 5,
        done: 100,
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
        <MypageContainer>
            <StatusBar barStyle="dark-content" />

            {/* 프로필 정보 */}
            <ProfileWrapper>
                <ProfileImage source={{ uri: userImg }} />
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
                <TextButton onPress={() => navigation.navigate('EditLesson')}>
                    <TextButtonText>레슨편집</TextButtonText>
                </TextButton>
            </Row>

            {/* 상태 표시 박스 */}
            <StatusBox>
            <StatusRow onPress={() => navigation.navigate('instState', { category: '승인완료진행예정' })}>
                    <StatusLabel>
                        <StatusLabelText>승인완료</StatusLabelText>
                        <StatusLabelText>진행예정</StatusLabelText>
                    </StatusLabel>
                    <StatusValue>{counts.ready}</StatusValue>
                </StatusRow>

                <StatusRow onPress={() => navigation.navigate('instState', { category: '승인대기' })}>
                    <StatusLabel>
                        <StatusLabelText>승인대기</StatusLabelText>
                    </StatusLabel>
                    <StatusValue>{counts.waiting}</StatusValue>
                </StatusRow>

                <StatusRow onPress={() => navigation.navigate('instState', { category: '취소요청' })}>
                    <StatusLabel>
                        <StatusLabelText>취소요청</StatusLabelText>
                    </StatusLabel>
                    <StatusValue>{counts.cancel}</StatusValue>
                </StatusRow>

                <StatusRow onPress={() => navigation.navigate('instState', { category: '입금대기' })}>
                    <StatusLabel>
                        <StatusLabelText>입금대기</StatusLabelText>
                    </StatusLabel>
                    <StatusValue>{counts.deposit}</StatusValue>
                </StatusRow>

                <StatusRow onPress={() => navigation.navigate('instState', { category: '레슨완료' })}>
                    <StatusLabel>
                        <StatusLabelText>레슨완료</StatusLabelText>
                    </StatusLabel>
                    <StatusValue>{counts.done}</StatusValue>
                </StatusRow>
            </StatusBox>
        </MypageContainer>
    );
};

export default instMain;
