import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as styles from './../components/styles';

const LessonDetail = () => {
    const navigation = useNavigation(); // ✅ 네비게이션 객체 추가

    // 예제 데이터
    const instructor = "강사명";
    const lessonName = "레슨명 레슨명레슨명레슨명"; 
    const price = "150,000원";
    const lessonDescription = "레슨 설명 텍스트 레슨 설명 텍스트";
    const instructorDetails = "강사 경력 및 자격증 텍스트 강사 경력 및 자격증 텍스트";
    const parkgolfPlace = "A파크골프장";

    return (
        <styles.LessonDetailContainer>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>

                {/* 상단 배경 + 프로필 이미지 */}
                <styles.LessonHeaderContainer>
                    <styles.LessonBackgroundImage source={require('../assets/img/backgroundimage.png')} />
                    <styles.LessonProfileImage source={require('../assets/img/person1.png')} />
                </styles.LessonHeaderContainer>

                {/* 강사 정보 + 레슨명 + 가격 */}
                <styles.LessonDetailInfoContainer>
                    <styles.InstructorName>{instructor}</styles.InstructorName>
                    <styles.LessonNameContainer>
                        <styles.LessonNameText>{lessonName}</styles.LessonNameText>
                    </styles.LessonNameContainer>
                    <styles.LessonPrice>{price}</styles.LessonPrice>
                </styles.LessonDetailInfoContainer>

                {/* 레슨 설명 및 강사 경력 */}
                <styles.LessonDetailsContainer>
                    <styles.LessonInfoBox>
                        <styles.LessonInfoTitle>레슨 설명</styles.LessonInfoTitle>
                        <styles.LessonInfoText>{lessonDescription}</styles.LessonInfoText>
                    </styles.LessonInfoBox>

                    <styles.LessonInfoBox>
                        <styles.LessonInfoTitle>강사 경력 및 자격증</styles.LessonInfoTitle>
                        <styles.LessonInfoText>{instructorDetails}</styles.LessonInfoText>
                    </styles.LessonInfoBox>
                </styles.LessonDetailsContainer>

                {/* 시간 컨테이너 */}
                <styles.LessonTimeContainer>
                    <styles.LessonTimeText>시간</styles.LessonTimeText>
                </styles.LessonTimeContainer>

                {/* 평일 오전 & 오후 시간표 */}
                <styles.LessonDetailsContainer>
                    <TouchableOpacity onPress={() => navigation.navigate('LessonOption')}> {/* ✅ 이동 추가 */}
                        <styles.LessonInfoBox>
                            <styles.LessonInfoTitle>평일 오전</styles.LessonInfoTitle>
                            <styles.LessonInfoText>{parkgolfPlace}</styles.LessonInfoText>
                        </styles.LessonInfoBox>
                    </TouchableOpacity>

                    <styles.LessonInfoBox>
                        <styles.LessonInfoTitle>평일 오후</styles.LessonInfoTitle>
                        <styles.LessonInfoText>{parkgolfPlace}</styles.LessonInfoText>
                    </styles.LessonInfoBox>
                </styles.LessonDetailsContainer>

            </ScrollView>
        </styles.LessonDetailContainer>
    );
};

export default LessonDetail;
