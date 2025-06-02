import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-root-toast';
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

    useEffect(() => {
        if (!instNum) {
            Alert.alert('강사 번호 없음', 'instNum이 전달되지 않았습니다.');
            return;
        }
        fetchLessons();
    }, [instNum]);

    const handleDelete = (lesNum) => {
        Alert.alert(
            '삭제 확인',
            '이 레슨을 삭제하시겠습니까?',
            [
                { text: '아니오', style: 'cancel' },
                {
                    text: '예',
                    onPress: () => {
                        Alert.alert(
                            '정말 삭제하시겠습니까?',
                            '삭제 후에는 복구할 수 없습니다.',
                            [
                                { text: '아니오', style: 'cancel' },
                                {
                                    text: '예',
                                    onPress: async () => {
                                        try {
                                            await axios.delete(`http://192.168.0.22:5000/api/lesson/${lesNum}`);
                                            Toast.show('레슨 삭제 완료', {
                                                duration: 3000,
                                                position: Toast.positions.BOTTOM,
                                            });
                                            fetchLessons(); // 삭제 후 목록 갱신
                                        } catch (err) {
                                            console.error('레슨 삭제 실패:', err);
                                            Alert.alert('레슨 삭제 실패');
                                        }
                                    }
                                }
                            ]
                        );
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleDelete(item.lesNum)}>
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
