import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as styles from './../components/styles';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { getUser } from '../utils/userInfo';

const LessonDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { lesson, userId } = route.params;

    const {
        lesNum,
        lesName,
        lesPrice,
        lesinfo,
        lesDetailPlace,
        lesTime,
        lesBackgroundImg,
        instName,
        userImg,
        userinfo
    } = lesson;

    const handleAddToCart = () => {
        axios.post('http://192.168.0.22:5000/api/cart', {
            userId: userId,               
            lessonId: lesNum,
        })
        .then(() => {
            Toast.show('장바구니에 추가되었습니다.', {
                duration: 3000,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: '#333',
                textColor: '#fff',
            });
        })
        .catch(err => {
            console.error('장바구니 추가 실패:', err);
        });
    };

    return (
        <styles.LessonDetailContainer>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <styles.LessonHeaderContainer>
                    <styles.LessonBackgroundImage source={{ uri: `http://192.168.0.100.2:5000/img/${lesBackgroundImg}` }} />
                    <styles.LessonProfileImage source={{ uri: `http://192.168.0.100.2:5000/img/${userImg}` }} />
                </styles.LessonHeaderContainer>

                <styles.LessonDetailInfoContainer>
                    <styles.InstructorName>{instName}</styles.InstructorName>
                    <styles.LessonNameContainer>
                        <styles.LessonNameText>{lesName}</styles.LessonNameText>
                    </styles.LessonNameContainer>
                    <styles.LessonPrice>{parseInt(lesPrice).toLocaleString()} 원</styles.LessonPrice>
                </styles.LessonDetailInfoContainer>

                <styles.LessonDetailsContainer>
                    <styles.LessonInfoBox>
                        <styles.LessonInfoTitle>레슨 설명</styles.LessonInfoTitle>
                        <styles.LessonInfoText>{lesinfo}</styles.LessonInfoText>
                    </styles.LessonInfoBox>

                    <styles.LessonInfoBox>
                        <styles.LessonInfoTitle>강사 경력 및 자격증</styles.LessonInfoTitle>
                        <styles.LessonInfoText>{userinfo}</styles.LessonInfoText>
                    </styles.LessonInfoBox>
                </styles.LessonDetailsContainer>

                <styles.LessonTimeContainer>
                    <styles.LessonTimeText>시간</styles.LessonTimeText>
                </styles.LessonTimeContainer>

                <styles.LessonDetailsContainer>
                    <TouchableOpacity onPress={handleAddToCart}>
                        <styles.LessonInfoBox>
                            <styles.LessonInfoTitle>{lesTime}</styles.LessonInfoTitle>
                            <styles.LessonInfoText>{lesDetailPlace}</styles.LessonInfoText>
                        </styles.LessonInfoBox>
                    </TouchableOpacity>
                </styles.LessonDetailsContainer>

            </ScrollView>
        </styles.LessonDetailContainer>
    );
};

export default LessonDetail;
