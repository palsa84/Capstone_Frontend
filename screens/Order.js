import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
    LessonDetailContainer,
    LessonThumbnail,
    LessonDetailTextContainer,
    LessonInfoContainer,
    PageTitle
} from '../components/styles';
import { Text, FlatList, View, TouchableOpacity } from 'react-native';
import { getUser } from '../utils/userInfo';

const Order = () => {
    const [lessons, setLessons] = useState([]);
    const userId = getUser()?.userNum;
    const navigation = useNavigation();

    useEffect(() => {
        if (!userId) return;

        axios.get(`http://192.168.0.22:5000/api/order/${userId}`)
            .then(res => setLessons(res.data))
            .catch(err => console.error('주문 정보 불러오기 실패:', err));
    }, [userId]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };

    const renderItem = ({ item }) => (
        
        <TouchableOpacity
            onPress={() => navigation.navigate('LessonDetail', {
                lesson: {
                    lesNum: item.lessonId,
                    lesName: item.lesName,
                    lesPrice: item.lesPrice,
                    lesinfo: item.lesinfo,
                    lesDetailPlace: item.lesDetailPlace,
                    lesTime: item.lesTime,
                    lesBackgroundImg: item.lesBackgroundImg,
                    instName: item.instName,
                    userImg: item.userImg,
                    userinfo: item.userinfo
                },
                userId,
                fromOrder: true
            })}
        >
            <View style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: 12, marginBottom: 16 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 4, color: '#555' }}>
                    {formatDate(item.orderDate)}  결제완료
                    </Text>

                <View style={{ height: 6 }} />
                <LessonInfoContainer>
                    <LessonThumbnail
                        source={{ uri: `http://192.168.0.22:5000/img/${item.lesThumbImg}` }}
                        style={{ width: 80, height: 70, borderRadius: 10, marginRight: 12, flexShrink: 0 }}
                    />
                    <LessonDetailTextContainer style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.lesName}</Text>
                        <Text>{item.lesTime} {item.lesDetailPlace}</Text>
                        <Text>{item.instName}</Text>
                    </LessonDetailTextContainer>
                    
                </LessonInfoContainer>
            </View>
        </TouchableOpacity>
    );

    return (
        <LessonDetailContainer>
            {lessons.length === 0 ? (
                <Text style={{ padding: 20 }}> </Text>
            ) : (
                <FlatList
                    data={lessons}
                    keyExtractor={(item) => item.orderId.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 20 }}
                />
            )}
        </LessonDetailContainer>
    );
};

export default Order;
