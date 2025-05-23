import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StatusBar, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

import {
    StyledFormArea,
    ClassButton,
    ClassContainer,
    ClassButtonText,
    GridWrapper,
    ClassScreenContainer
} from './../components/styles';

const classData = [
    { id: '1', title: '초보자', screen: 'Beginner' },
    { id: '2', title: '중급자', screen: 'Intermediate' },
    { id: '3', title: '전문가', screen: 'Expert' },
    { id: '4', title: '자격증', screen: 'Certification' }
];

const Classlist = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userNum, prevCity, prevDistrict } = route.params || {};

    const [selectedCity, setSelectedCity] = useState(prevCity || null);
    const [selectedDistrict, setSelectedDistrict] = useState(prevDistrict || null);

    const [locationText, setLocationText] = useState('위치');

    const handleLocationPress = () => {
        navigation.navigate('SelectAddress', { userNum });
    };

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await axios.get(`http://192.168.0.22:5000/api/user/location/${userNum}`);
                const { userlocation1, userlocation2 } = res.data;
                setLocationText(`${userlocation1} ${userlocation2}`);
            } catch (err) {
                console.error('사용자 위치 불러오기 실패:', err);
            }
        };

        if (userNum) fetchLocation();
    }, [userNum]);

    useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: '',
        headerLeft: () => (
            <TouchableOpacity
                onPress={() => navigation.navigate('SelectAddress', {
                    userNum,
                    prevCity: locationText.split(' ')[0],
                    prevDistrict: locationText.split(' ')[1]
                })}
                style={{ marginLeft: 16 }}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                    {locationText}
                </Text>
            </TouchableOpacity>
        )
    });
}, [navigation, locationText]);


    return (
        <ClassScreenContainer>
            <StatusBar barStyle="dark-content" />
            <ClassContainer>
                <StyledFormArea>
                    <FlatList
                        data={classData}
                        renderItem={({ item }) => (
                            <ClassButton onPress={() => navigation.navigate(item.screen)}>
                                <ClassButtonText>{item.title}</ClassButtonText>
                            </ClassButton>
                        )}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        columnWrapperStyle={GridWrapper}
                    />
                </StyledFormArea>
            </ClassContainer>
        </ClassScreenContainer>
    );
};

export default Classlist;
