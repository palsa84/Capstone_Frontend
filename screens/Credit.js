import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import axios from 'axios';
import {
    LessonProfileImage,
    LessonDetailTextContainer,
    LessonThumbnail,
    LessonInfoContainer,
    GrayBox,
    LessonInfoTitle,
    LessonInfoText
} from '../components/styles';
import { getUser } from '../utils/userInfo';

const Credit = () => {
    const route = useRoute();
    const { lesson } = route.params || {};
    const [selectedPayment, setSelectedPayment] = useState('신용카드');
    const navigation = useNavigation(); 

    const userId = getUser()?.userNum;

    if (!lesson) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>레슨 정보를 불러올 수 없습니다.</Text>
            </View>
        );
    }

    const handlePayment = async () => {
        try {
            console.log('보내는 값:', { userId, lessonId: lesson.lesNum });

            // 주문 등록
            await axios.post('http://192.168.0.22:5000/api/order', {
                userId,
                lessonId: lesson.lesNum
            });

            // 장바구니 삭제 요청
            await axios.delete(`http://192.168.0.22:5000/api/cart/user/${userId}/lesson/${lesson.lesNum}`);

            // 결제 완료 화면 이동
            navigation.navigate('CreditCompleted', {
                lesson: {
                    lesNum: lesson.lesNum,
                    lesThumbImg: lesson.lesThumbImg,
                    lesName: lesson.lesName,
                    lesTime: lesson.lesTime,
                    lesDetailPlace: lesson.lesDetailPlace,
                    instName: lesson.instName,
                    lesPrice: lesson.lesPrice,
                }
            });

        } catch (err) {
            console.error('결제 실패:', err);
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#fbfff4' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', margin: 20 }}>결제할 레슨 정보</Text>
                <LessonInfoContainer>
                    <LessonThumbnail source={{ uri: `http://192.168.0.22:5000/img/${lesson.lesThumbImg}` }} />
                    <LessonDetailTextContainer>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{lesson.lesName}</Text>
                        <Text>{lesson.lesTime} {lesson.lesDetailPlace}</Text>
                        <Text>{parseInt(lesson.lesPrice).toLocaleString()} 원</Text>
                    </LessonDetailTextContainer>
                </LessonInfoContainer>

                <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 25 }} />
                <View style={{ height: 50 }} />
                
                <View style={{ alignItems: 'center' }}>
                    <LessonProfileImage
                        source={{ uri: `http://192.168.0.22:5000/img/${lesson.userImg}` }}
                        style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#ddd' }}
                    />
                    <Text style={{ marginTop: 8, fontSize: 24, fontWeight: 'bold' }}>{lesson.instName}</Text>
                </View>

                <View style={{ height: 20 }} />
                <GrayBox>
                    <LessonInfoTitle>강사 경력 및 자격증</LessonInfoTitle>
                    <LessonInfoText>{lesson.userinfo}</LessonInfoText>
                </GrayBox>


                <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 25 }} />

                <View style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>결제 금액</Text>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                        {parseInt(lesson.lesPrice).toLocaleString()} 원
                    </Text>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>결제 수단</Text>
                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <TouchableOpacity
                            onPress={() => setSelectedPayment('신용카드')}
                            style={{
                                padding: 10,
                                backgroundColor: selectedPayment === '신용카드' ? '#fff53c' : '#efefef',
                                borderRadius: 8,
                                marginRight: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>신용카드</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSelectedPayment('체크카드')}
                            style={{
                                padding: 10,
                                backgroundColor: selectedPayment === '체크카드' ? '#fff000' : '#efefef',
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>체크카드</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={{
                    backgroundColor: '#7aae3e',
                    paddingVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                onPress={handlePayment}
            >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>결제하기</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Credit;
