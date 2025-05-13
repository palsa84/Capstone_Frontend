import React, { useEffect, useState, useRef } from 'react';
import { FlatList, TextInput, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { getUser } from '../utils/userInfo';
import { BeginnerScreenContainer, PageTitle } from './../components/styles';
import axios from 'axios';

const Beginner = ({ navigation }) => {
    const user = getUser();
    const userId = user?.userNum;

    const [allLessons, setAllLessons] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [placeFilter, setPlaceFilter] = useState([]);
    const flatListRef = useRef(null);

    // 레슨 불러오기
    useEffect(() => {
        axios.get('http://10.0.2.2:5000/api/lessons')
            .then(res => {
                setAllLessons(res.data);
            })
            .catch(err => {
                console.error('레슨 조회 실패:', err);
            });
    }, []);

    // 지역 필터
    const togglePlaceFilter = (place) => {
        setPlaceFilter(prev =>
            prev.includes(place) ? [] : [place]
        );
    };

    // 필터링된 레슨
    const filteredLessons = allLessons.filter(lesson =>
        (lesson.lesName.trim().includes(searchText.trim()) ||
        lesson.instName.trim().includes(searchText.trim())) &&
        (placeFilter.length === 0 || placeFilter.includes(lesson.lesPlace.trim()))
    );

    return (
        <BeginnerScreenContainer>
            <View style={{ alignSelf: 'flex-start', paddingLeft: 5 }}>
                <PageTitle style={{ color: 'black' }}>초보자</PageTitle>
            </View>

            <View style={{ margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder="검색하려는 레슨 또는 강사명을 입력해주세요."
                        value={searchText}
                        onChangeText={setSearchText}
                        style={{ flex: 1, height: 40, borderBottomWidth: 1, paddingHorizontal: 8, marginBottom: 10 }}
                    />
                </View>

                {/* 지역 필터 */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 5, marginBottom: 5 }}>
                    {['달서구', '달성군', '수성구', '중구', '남구', '북구', '동구', '서구', '군위군'].map(area => (
                        <TouchableOpacity
                            key={area}
                            onPress={() => togglePlaceFilter(area)}
                            style={{
                                marginRight: 20,
                                paddingHorizontal: 30,
                                backgroundColor: placeFilter.includes(area) ? 'gray' : 'white',
                                borderWidth: 2,
                                borderColor: 'black',
                                borderRadius: 10,
                                alignSelf: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 8 }}>{area}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 레슨 목록 */}
            <FlatList
                ref={flatListRef}
                data={filteredLessons}
                keyExtractor={item => item.lesNum.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('LessonDetail', {
                        lesson: item,
                        userId: userId
                    })}>
                        <View style={{ flexDirection: 'row', padding: 15, borderBottomWidth: 1, alignItems: 'center' }}>
                            <Image
                                source={{ uri: `http://10.0.2.2:5000/img/${item.lesThumbImg}` }}
                                style={{ width: 80, height: 70, marginRight: 20, borderRadius: 10 }}
                            />

                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.lesName}</Text>
                                <Text>⭐ {item.rating}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ flex: 1, textAlign: 'left' }}>{item.instName}</Text>
                                    <Text style={{ flex: 1, textAlign: 'right' }}>{item.lesDetailPlace}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </BeginnerScreenContainer>
    );
};

export default Beginner;
