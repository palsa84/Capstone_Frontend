import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, StatusBar, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as styles from './../components/styles';

const InstDetailProfile = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { instName } = route.params;

    const [instructor, setInstructor] = useState(null);
    const [lessonList, setLessonList] = useState([]);

    const formatBirth = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
    };

    useEffect(() => {
        if (!instName) return;

        axios
            .get(`http://192.168.0.22:5000/api/users/instructor/${encodeURIComponent(instName)}`)
            .then((res) => setInstructor(res.data))
            .catch((err) => console.error('강사 정보 불러오기 실패:', err));

        axios
            .get(`http://192.168.0.22:5000/api/users/instructor/${encodeURIComponent(instName)}/lessons`)
            .then((res) => setLessonList(res.data))
            .catch((err) => console.error('레슨 목록 불러오기 실패:', err));
    }, [instName]);

    if (!instructor) {
        return (
            <styles.LessonDetailContainer>
                <styles.LessonDetailInfoContainer>
                    <styles.InstructorName>강사 정보를 불러오는 중입니다...</styles.InstructorName>
                </styles.LessonDetailInfoContainer>
            </styles.LessonDetailContainer>
        );
    }

    return (
        <styles.LessonDetailContainer>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                {/* 상단 여백 */}
                <View style={{ height: 120 }} />

                {/* 강사 프로필 이미지 */}
                <styles.LessonProfileImage source={{ uri: `http://192.168.0.22:5000/img/${instructor.userImg}` }} />

                {/* 강사 이름 */}
                <styles.LessonDetailInfoContainer>
                    <styles.InstructorName>{instructor.userName}</styles.InstructorName>
                </styles.LessonDetailInfoContainer>

                {/* 강사 상세 정보 */}
                <styles.LessonDetailsContainer>
                    <styles.LessonInfoBox>
                        <styles.LessonInfoTitle>생년월일</styles.LessonInfoTitle>
                        <styles.LessonInfoText>{formatBirth(instructor.userBirth)}</styles.LessonInfoText>
                    </styles.LessonInfoBox>
                    <styles.LessonInfoBox>
                        <styles.LessonInfoTitle>강사 경력 및 자격증</styles.LessonInfoTitle>
                        <styles.LessonInfoText>{instructor.userinfo}</styles.LessonInfoText>
                    </styles.LessonInfoBox>
                </styles.LessonDetailsContainer>

                {/* 진행 중인 레슨 목록 */}
                {lessonList.length > 0 && (
                    <styles.LessonDetailsContainer>
                        <styles.LessonInfoTitle>진행 중인 레슨</styles.LessonInfoTitle>
                        {lessonList.map((item, index) => (
                            <styles.LessonInfoBox
                                key={index}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <styles.LessonThumbnail
                                    source={{ uri: `http://192.168.0.22:5000/img/${item.lesThumbImg}` }}
                                    style={{ width: 80, height: 70, marginRight: 12, borderRadius: 10 }}
                                />
                                <View>
                                    <styles.LessonInfoText>{item.lesName}</styles.LessonInfoText>
                                    <styles.LessonInfoText>{item.lesDetailPlace}</styles.LessonInfoText>
                                </View>
                            </styles.LessonInfoBox>
                        ))}
                    </styles.LessonDetailsContainer>
                )}
            </ScrollView>
        </styles.LessonDetailContainer>
    );
};

export default InstDetailProfile;
