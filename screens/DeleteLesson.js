import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import {
    BeginnerScreenContainer,
    LessonCard,
    LessonImage,
    LessonInfoContainer,
    LessonTitle,
    LessonPlace,
    LessonTime
} from '../components/styles';

const DeleteLesson = () => {
    const route = useRoute();
    const instNum = route.params?.instNum;
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!instNum) {
            Alert.alert('강사 번호 없음', 'instNum이 전달되지 않았습니다.');
            return;
        }

        const fetchLessons = async () => {
            try {
                const res = await axios.get(`http://192.168.0.22:5000/api/lesson/instructor/${instNum}`);
                setLessons(res.data);
            } catch (err) {
                console.error('레슨 불러오기 실패:', err);
                Alert.alert('레슨 정보를 불러올 수 없습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [instNum]);

    const renderItem = ({ item }) => (
        <TouchableOpacity disabled>
            <LessonCard>
                <LessonImage source={{ uri: `http://192.168.0.22:5000/img/${item.lesThumbImg}` }} />
                <LessonInfoContainer>
                    <LessonTitle>{item.lesName}</LessonTitle>
                    <LessonPlace>{item.lesDetailPlace}</LessonPlace>
                    <LessonTime>{item.lesTime}</LessonTime>
                </LessonInfoContainer>
            </LessonCard>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <BeginnerScreenContainer>
                <ActivityIndicator size="large" color="#000" />
            </BeginnerScreenContainer>
        );
    }

    return (
        <BeginnerScreenContainer>
            {lessons.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 40 }}>등록된 레슨이 없습니다.</Text>
            ) : (
                <FlatList
                    data={lessons}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.lesNum.toString()}
                />
            )}
        </BeginnerScreenContainer>
    );
};

export default DeleteLesson;