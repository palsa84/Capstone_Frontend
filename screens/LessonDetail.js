import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderContainer, HeaderButton, HeaderText } from '../components/styles';

const LessonDetail = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            {/* 커스텀 헤더 추가 */}
            <HeaderContainer>
                <HeaderButton onPress={() =>  navigation.goBack()}>
                    <HeaderText>◀</HeaderText>
                </HeaderButton>

                <HeaderButton onPress={() => navigation.navigate('Cart')}>
                    <HeaderText>장바구니</HeaderText>
                </HeaderButton>
            </HeaderContainer>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>레슨 상세 페이지</Text>
            </View>
        </View>
    );
};

export default LessonDetail;
