
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, TextInput, Image, StatusBar, SafeAreaView } from 'react-native';
import axios from 'axios';
import { getUser } from '../utils/userInfo';
import { useNavigation } from '@react-navigation/native';

const LEVEL_LIST = ['초보자', '중급자', '전문가', '자격증'];
const REGION_LIST = ['달서구','달성군', '수성구', '중구', '남구', '북구', '동구', '서구','군위군'];

const Classlist = () => {
    const navigation = useNavigation();
    const user = getUser();
    const [filteredLessons, setFilteredLessons] = useState([]);
    const [levelFilter, setLevelFilter] = useState('초보자');
    const [regionFilter, setRegionFilter] = useState(user.userlocation2 || '');
    const [searchText, setSearchText] = useState('');
    const regionScrollRef = useRef(null);
    
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
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        {user.userlocation1} {user.userlocation2}
                    </Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        const query = [];
        if (levelFilter) query.push(`level=${encodeURIComponent(levelFilter)}`);
        if (regionFilter) query.push(`place=${encodeURIComponent(regionFilter)}`);
        const queryString = query.length ? `?${query.join('&')}` : '';

        axios.get(`http://192.168.0.22:5000/api/lessons${queryString}`)
            .then(res => {
                const result = res.data;
                const filtered = result.filter(item =>
                    item.lesName?.includes(searchText) || item.instName?.includes(searchText)
                );
                setFilteredLessons(filtered);
            })
            .catch(err => console.error('레슨 조회 실패:', err));
    }, [levelFilter, regionFilter, searchText]);

    useEffect(() => {
        if (regionFilter && regionFlatListRef.current) {
            const index = REGION_LIST.findIndex(r => r === regionFilter);
            if (index !== -1) {
            regionFlatListRef.current.scrollToIndex({ index, animated: true });
            }
        }
    }, [regionFilter]);

    const toggleRegion = (region) => {
        setRegionFilter(prev => prev === region ? '' : region);
    };

    const toggleLevel = (level) => {
        setLevelFilter(prev => prev === level ? '' : level);
    };

    const regionFlatListRef = useRef(null);

    const scrollToRegion = (region) => {
        const index = REGION_LIST.findIndex((r) => r === region);
        if (index !== -1 && regionFlatListRef.current) {
            regionFlatListRef.current.scrollToIndex({ index, animated: true });
        }
        setRegionFilter((prev) => (prev === region ? '' : region));
    };

    const levelFlatListRef = useRef(null);

    const scrollToLevel = (level) => {
        const index = LEVEL_LIST.findIndex(l => l === level);
        if (index !== -1 && levelFlatListRef.current) {
            levelFlatListRef.current.scrollToIndex({ index, animated: true });
        }
        setLevelFilter(prev => (prev === level ? '' : level));
    };

    const renderFilters = () => (
        <View style={{ paddingBottom: 10, alignSelf: 'stretch' }}>
            <TextInput
                placeholder="레슨명 또는 강사명 검색"
                value={searchText}
                onChangeText={setSearchText}
                style={{
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                    marginTop: 12,
                    marginBottom: 10,
                    paddingHorizontal: 8
                }}
            />
            <FlatList
                ref={regionFlatListRef}
                horizontal
                data={REGION_LIST}
                keyExtractor={(item) => item}
                getItemLayout={(_, index) => ({
                    length: 60,         
                    offset: 60 * index,
                    index,
                })}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    onPress={() => scrollToRegion(item)}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        marginRight: 12,
                        borderWidth: 2,
                        borderRadius: 10,
                        borderColor: 'black',
                        backgroundColor: regionFilter === item ? '#ccc' : 'white',
                    }}
                    >
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
            />

            <FlatList
                ref={levelFlatListRef}
                horizontal
                data={LEVEL_LIST}
                keyExtractor={(item) => item}
                getItemLayout={(_, index) => ({
                    length: 60,
                    offset: 60 * index,
                    index,
                })}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => scrollToLevel(item)}
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginRight: 12,
                            borderWidth: 2,
                            borderRadius: 10,
                            borderColor: 'black',
                            backgroundColor: levelFilter === item ? '#ccc' : 'white',
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
                style={{ marginTop: 12 }}
            />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fbfff4' }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
            {renderFilters()}

            {filteredLessons.map(item => (
                <TouchableOpacity 
                key={item.lesNum}
                onPress={() => navigation.navigate('LessonDetail', {
                    lesson: {
                        ...item,
                        instNum: item.userNum  
                    },
                    userId: user.userNum     
                })}>
                <View style={{
                    flexDirection: 'row',
                    padding: 12,
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                    }}
                >
                    <Image
                    source={{ uri: `http://192.168.0.22:5000/img/${item.lesThumbImg}` }}
                    style={{
                        width: 80,
                        height: 70,
                        borderRadius: 10,
                        marginRight: 12,
                    }}
                    />
                    <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.lesName}</Text>
                    <Text>⭐ {item.rating}</Text>
                    <Text>{item.instName} | {item.lesDetailPlace}</Text>
                    </View>
                </View>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </SafeAreaView>
);

};

export default Classlist;
