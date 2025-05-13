import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const CreditLoading = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('CreditCompleted');
        }, 3000); // 3초 후 이동

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FAF287', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>결제가 진행 중입니다{'\n'}잠시만 기다려주세요</Text>
        </View>
    );
};

export default CreditLoading;
