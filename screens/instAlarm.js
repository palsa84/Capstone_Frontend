import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import {
    AlarmContainer,
    AlarmInner,
    PageTitle
} from '../components/styles';
import { getUser } from '../utils/userInfo';

const InstAlarm = () => {
    const user = getUser();
    const userNum = user?.userNum;

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // 알림 목록 조회 + 읽음 처리
        if (userNum) {
            axios.get(`http://192.168.0.22:5000/api/notifications/all/${userNum}`)
                .then(res => setNotifications(res.data))
                .catch(err => console.error('알림 조회 실패:', err));
        }
    }, [userNum]);

    return (
        <AlarmContainer>
            <StatusBar barStyle="dark-content" />
            <AlarmInner>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 5,
                        paddingBottom: 20
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {notifications.length === 0 ? (
                        <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
                            현재 알림이 없습니다.
                        </Text>
                    ) : (
                        notifications.map((noti) => (
                            <TouchableOpacity
                                key={noti.notiId}
                                onPress={() => {
                                    setNotifications(prev =>
                                        prev.map(n =>
                                            n.notiId === noti.notiId ? { ...n, isRead: true } : n
                                        )
                                    );
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: noti.isRead ? '#fff' : '#9dc65a',
                                        padding: 12,
                                        borderRadius: 8,
                                        marginBottom: 8,
                                        height: 90,
                                        width: '100%',
                                        maxWidth: 360,
                                        alignSelf: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
                                        {noti.message}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: '#666' }}>
                                        {new Date(noti.createdAt).toLocaleString()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))

                    )}
                </ScrollView>
            </AlarmInner>
        </AlarmContainer>
    );
};

export default InstAlarm;
