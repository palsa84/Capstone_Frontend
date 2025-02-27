import React, { useState, useRef } from 'react';
import { FlatList, TextInput, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  
    BeginnerScreenContainer,
    PageTitle,
} from './../components/styles'; 

const lessonData = [
    { id: '1', name: '레슨1', rating: 5, instructor: '가가가', distance: 1, location: 'A파크골프장', region: '달서구', image: require('../assets/img/A1.png') },
    { id: '2', name: '레슨2', rating: 4, instructor: '나나나', distance: 2, location: 'B파크골프장', region: '수성구', image: require('../assets/img/B1.png') },
    { id: '3', name: '레슨3', rating: 3.5, instructor: '다다다', distance: 3, location: 'C파크골프장', region: '북구', image: require('../assets/img/C1.png') },
    { id: '4', name: '레슨4', rating: 3.8, instructor: '라라라', distance: 4, location: 'D파크골프장', region: '중구', image: require('../assets/img/D1.png') },
    { id: '5', name: '레슨5', rating: 2, instructor: '마마마', distance: 5, location: 'E파크골프장', region: '남구', image: require('../assets/img/E1.png') },
    { id: '6', name: '레슨6', rating: 1, instructor: '바바바', distance: 6, location: 'F파크골프장', region: '서구', image: require('../assets/img/F1.png') },
];

const Beginner = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState([]);
    const flatListRef = useRef(null); // FlatList 참조

    const sortLessons = (lessons) => {
        if (filter === '추천순') {
            return [...lessons].sort((a, b) => a.name.localeCompare(b.name)); // 가나다순(임시)
        } else if (filter === '인기순') {
            return [...lessons].sort((a, b) => b.rating - a.rating); // 별점 내림차순
        } else if (filter === '가까운 순') {
            return [...lessons].sort((a, b) => a.distance - b.distance); // 거리 오름차순
        }
        return lessons;
    };


    const toggleLocationFilter = (selectedRegion) => {
        setLocationFilter(prevFilter => 
            prevFilter.includes(selectedRegion) ? [] : [selectedRegion]
        );
    };
    
    const handleFilterChange = (type) => {
        setFilter(type);
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true }); // 리스트 최상단으로 이동
        }
    };

    const filteredLessons = sortLessons(
        lessonData.filter(lesson => 
            lesson.name.includes(searchText) && 
            (locationFilter.length === 0 || locationFilter.includes(lesson.region))
        )
    );

    return (
        <BeginnerScreenContainer>
            <View style={{ alignSelf: 'flex-start', paddingLeft: 5 }}>
                <PageTitle style={{ color: 'black' }}>초보자</PageTitle>
            </View>

            <View style={{ margin: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder="검색하려는 레슨을 입력해주세요."
                        value={searchText}
                        onChangeText={setSearchText}
                        style={{ flex: 1, height: 40, borderBottomWidth: 1, paddingHorizontal: 8, marginBottom: 10 }}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 5, marginBottom: 5 }}>
                    {['달서구', '수성구', '북구', '중구', '남구', '서구'].map(area => (
                        <TouchableOpacity
                            key={area}
                            onPress={() => toggleLocationFilter(area)}
                            style={{
                                marginRight: 20,
                                paddingHorizontal: 30,
                                backgroundColor: locationFilter.includes(area) ? 'gray' : 'white',
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

                {/* 필터 버튼 */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    {['추천순', '인기순', '가까운 순'].map(type => (
                        <TouchableOpacity
                            key={type}
                            onPress={() => handleFilterChange(type)}
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 8,
                                backgroundColor: filter === type ? 'gray' : 'white',
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <FlatList
                ref={flatListRef} // FlatList에 ref 적용
                data={filteredLessons}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('LessonDetail', { lesson: item })}>
                        <View style={{ flexDirection: 'row', padding: 15, borderBottomWidth: 1, alignItems: 'center' }}>
                            {/* 이미지 */}
                            <Image source={item.image} style={{ width: 80, height: 70, marginRight: 20, borderRadius: 10 }} />
                            
                            {/* 레슨 정보 */}
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text>⭐ {item.rating}</Text>

                                {/* 강사명 + 거리 & 위치 */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ flex: 1, textAlign: 'left' }}>{item.instructor}</Text>
                                    <Text style={{ flex: 1, textAlign: 'center' }}>{item.distance}km</Text>
                                    <Text style={{ flex: 1, textAlign: 'right' }}>{item.location}</Text>
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
