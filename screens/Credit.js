import React from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { LessonDetailContainer, CartItemContainer, CartItemInfo } from '../components/styles';
import { useNavigation, useRoute } from '@react-navigation/native';

const Credit = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { lesson } = route.params || {};

    if (!lesson) {
        return (
            <LessonDetailContainer>
                <Text>레슨 정보를 불러올 수 없습니다.</Text>
            </LessonDetailContainer>
        );
    }

    return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <LessonDetailContainer style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>결제할 레슨 정보</Text>

            <CartItemContainer>
                <CartItemInfo style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{lesson.lesName}</Text>
                    <Text>{lesson.lesTime} {lesson.lesDetailPlace}</Text>
                    <Text>{parseInt(lesson.lesPrice).toLocaleString()} 원</Text>
                </CartItemInfo>

                <Image
                    source={{ uri: `http://10.0.2.2:5000/img/${lesson.lesThumbImg}` }}
                    style={{ width: 80, height: 70, borderRadius: 10 }}
                />
            </CartItemContainer>

            {/* 다른 사용자 정보 등 내용 추가 가능 */}
        </LessonDetailContainer>

        <TouchableOpacity
            onPress={() => navigation.navigate('CreditLoading')}
            style={{
                backgroundColor: '#FAF287',
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>결제하기</Text>
        </TouchableOpacity>

    </View>
);

};

export default Credit;
