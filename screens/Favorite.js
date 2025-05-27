import React, { useEffect, useState, useCallback  } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as styles from '../components/styles';
import { getUser } from '../utils/userInfo';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Favorite = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigation = useNavigation();
    const userId = getUser()?.userNum;

    useFocusEffect(
        useCallback(() => {
            if (!userId) return;
            axios.get(`http://192.168.0.22:5000/api/favorite/${userId}`)
                .then(res => setFavoriteItems(res.data))
                .catch(err => console.error('찜 목록 불러오기 실패:', err));
        }, [userId])
    );

    const toggleSelect = (favoriteId) => {
        setSelectedItems(prev =>
            prev.includes(favoriteId) ? prev.filter(id => id !== favoriteId) : [...prev, favoriteId]
        );
    };

    const handleSelectAll = () => {
        if (selectedItems.length === favoriteItems.length) {
            setSelectedItems([]);
        } else {
            const allIds = favoriteItems.map(item => item.favoriteId);
            setSelectedItems(allIds);
        }
    };

    const removeItem = (favoriteId) => {
        axios.delete(`http://192.168.0.22:5000/api/favorite/${favoriteId}`)
            .then(() => {
                setFavoriteItems(prev => prev.filter(item => item.favoriteId !== favoriteId));
                setSelectedItems(prev => prev.filter(id => id !== favoriteId));
            }) .catch(err => console.error('찜 삭제 실패:', err));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                const mappedLesson = { ...item, lesNum: item.lessonId };
                navigation.navigate('LessonDetail', { lesson: mappedLesson, userId, isFavorited: false });
            }}
        >
            <styles.CartItemContainer>
                <TouchableOpacity onPress={() => toggleSelect(item.favoriteId)}>
                    <View style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderColor: 'black',
                        backgroundColor: selectedItems.includes(item.favoriteId) ? 'red' : 'white',
                        marginRight: 10,
                    }} />
                </TouchableOpacity>

                {/* 레슨 정보 */}
                <styles.CartItemInfo style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.lesName}</Text>
                    <Text>{item.lesTime} {item.lesDetailPlace}</Text>
                    <Text>{parseInt(item.lesPrice).toLocaleString()} 원</Text>
                </styles.CartItemInfo>

                {/* 레슨 대표이미지 */}
                <Image
                    source={{ uri: `http://192.168.0.22:5000/img/${item.lesThumbImg}` }}
                    style={{ width: 80, height: 70, borderRadius: 10 }}
                />
            </styles.CartItemContainer>
        </TouchableOpacity>
    );

    return (
        <styles.LessonDetailContainer>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                <TouchableOpacity onPress={handleSelectAll}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}> 전체 선택 ({selectedItems.length}/{favoriteItems.length}) </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { selectedItems.forEach(id => removeItem(id)); }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}> 선택삭제 </Text>
                </TouchableOpacity>
            </View>

            {/* 찜 레슨 목록 */}
            <FlatList
                data={favoriteItems}
                keyExtractor={item => item.favoriteId.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </styles.LessonDetailContainer>
    );
};

export default Favorite;
