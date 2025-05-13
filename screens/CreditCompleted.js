import React from 'react';
import { View, Text } from 'react-native';

const CreditCompleted = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FAF287', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>결제가 완료되었습니다!</Text>
        </View>
    );
};

export default CreditCompleted;
