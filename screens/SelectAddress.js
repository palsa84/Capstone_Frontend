import React, { useState, useLayoutEffect } from 'react';
import { Text, FlatList, ToastAndroid, TouchableOpacity, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { setUser, getUser } from '../utils/userInfo';

import {
    MainContainer,
    CityList,
    CityItem,
    CityItemSelected,
    CityText,
    DistrictContainer,
    DistrictBox,
    DistrictText,
    DistrictBoxSelected,
} from '../components/styles';

const CITIES = [
    '서울', '경기', '인천', '강원', '대전', '충북', '충남', '광주',
    '전북', '전남', '대구', '경북', '경남', '부산', '울산', '제주' ];
const DAEGU_DISTRICTS = [
    '달서구','달성군', '수성구', '중구', '남구', '북구', '동구', '서구','군위군' ];

const SelectAddress = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userNum, userlocation1, userlocation2 } = route.params || {};
    const [selectedCity, setSelectedCity] = useState(userlocation1 || null);
    const [selectedDistrict, setSelectedDistrict] = useState(userlocation2 || null);


    // CITIES와 DAEGU_DISTRICTS 값이 들어와야만 저장 버튼 활성화 조건
    useLayoutEffect(() => {
        if (selectedCity && selectedDistrict) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={handleSave} style={{ paddingRight: 16 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>저장</Text>
                    </TouchableOpacity>
                ),
            });
        } else {
            navigation.setOptions({
                headerRight: () => null,
            });
        }
    }, [navigation, selectedCity, selectedDistrict]);

    const handleCityPress = (city) => {
        if (city === '대구') {
            setSelectedCity(city);
        } else {
            ToastAndroid.show('서비스 준비 중입니다', ToastAndroid.SHORT);
            setSelectedCity(null);
            setSelectedDistrict(null);
        }
    };

    const handleDistrictPress = (district) => {
        setSelectedDistrict(district); 
    };

    const handleSave = async () => {
    try {
        await axios.post('http://192.168.0.22:5000/api/users/location', {
            userNum,
            userlocation1: selectedCity,
            userlocation2: selectedDistrict
        });

        const oldUser = getUser();
        setUser({
            ...oldUser,
            userlocation1: selectedCity,
            userlocation2: selectedDistrict
        });

        const place = `${selectedCity} ${selectedDistrict}`;
        navigation.navigate('TabNavigator', {
            screen: 'Class',
            params: { place, userNum }
        });

    } catch (err) {
        console.error('위치 저장 실패:', err?.response?.data || err.message);
        ToastAndroid.show('위치 저장 실패', ToastAndroid.SHORT);
    }
};


    const renderDistrictItem = ({ item }) => {
    const isSelected = selectedDistrict === item;
    const DistrictComponent = isSelected ? DistrictBoxSelected : DistrictBox;

    return (
        <DistrictComponent onPress={() => handleDistrictPress(item)}>
            <DistrictText>{item}</DistrictText>
        </DistrictComponent>
    );
};

    return (
        <MainContainer>
            <CityList>
                {CITIES.map((city) => {
                    const isSelected = selectedCity === city;
                    const CityComponent = isSelected ? CityItemSelected : CityItem;
                    return (
                        <CityComponent key={city} onPress={() => handleCityPress(city)}>
                            <CityText>{city}</CityText>
                        </CityComponent>
                    );
                })}
            </CityList>

            <DistrictContainer>
                {selectedCity === '대구' && (
                    <FlatList
                        data={DAEGU_DISTRICTS}
                        renderItem={renderDistrictItem}
                        keyExtractor={(item) => item}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        scrollEnabled={false}
                    />
                )}
            </DistrictContainer>
        </MainContainer>
    );
};

export default SelectAddress;
