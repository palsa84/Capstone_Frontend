import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { StatusBar, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'; // ✅ 여기
import axios from 'axios';
import { getUser } from '../utils/userInfo';

import {
    StyledFormArea,
    ClassButton,
    ClassContainer,
    ClassButtonText,
    GridWrapper,
    ClassScreenContainer
} from './../components/styles';

const Classlist = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const user = getUser();

    const { userNum, prevDistrict } = route.params || {};
    const [locationText, setLocationText] = useState('위치');

    const placeFromParams = route.params?.place;
    const userLocation = placeFromParams || `${user.userlocation1 || ''} ${user.userlocation2 || ''}`;

    const handleLocationPress = () => {
        navigation.navigate('SelectAddress', {
            userNum: user.userNum,
            userlocation1: user.userlocation1,
            userlocation2: user.userlocation2
        });
    };

    useFocusEffect(
        useCallback(() => {
            const latestUser = getUser();
            setLocationText(`${latestUser.userlocation1} ${latestUser.userlocation2}`);
        }, [])
    );


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('SelectAddress', {
                        userNum: user.userNum,  
                        userlocation1: user.userlocation1,
                        userlocation2: user.userlocation2
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
                        data={[
                            { id: '1', title: '초보자', screen: 'Beginner' },
                            { id: '2', title: '중급자', screen: 'Intermediate' },
                            { id: '3', title: '전문가', screen: 'Expert' },
                            { id: '4', title: '자격증', screen: 'Certification' }
                        ]}
                        renderItem={({ item }) => (
                            <ClassButton
                            onPress={() => {
                                if (item.screen === 'Beginner') {
                                navigation.navigate('Beginner', {
                                    selectedRegion: user.userlocation2
                                });
                                } else {
                                navigation.navigate(item.screen);
                                }
                            }}
                            >
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
