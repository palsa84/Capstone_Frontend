import React, { useEffect, useState } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as styles from '../components/styles';
import { getUser } from '../utils/userInfo';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigation = useNavigation();

    const userId = getUser()?.userNum;

    useEffect(() => {
        if (!userId) return;

        axios.get(`http://192.168.0.22:5000/api/cart/${userId}`)
            .then(res => setCartItems(res.data))
            .catch(err => console.error('장바구니 불러오기 실패:', err));
    }, [userId]);

    const toggleSelect = (cartId) => {
        setSelectedItems(prev =>
            prev.includes(cartId)
                ? prev.filter(id => id !== cartId)
                : [...prev, cartId]
        );
    };

    const handleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            const allIds = cartItems.map(item => item.cartId);
            setSelectedItems(allIds);
        }
    };

    const removeItem = (cartId) => {
        axios.delete(`http://192.168.0.22:5000/api/cart/${cartId}`)
            .then(() => {
                setCartItems(prev => prev.filter(item => item.cartId !== cartId));
                setSelectedItems(prev => prev.filter(id => id !== cartId));
            })
            .catch(err => console.error('삭제 실패:', err));
    };

    const renderItem = ({ item }) => (
        <styles.CartItemContainer>
            {/* 체크박스 */}
            <TouchableOpacity onPress={() => toggleSelect(item.cartId)}>
                <View style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: 'black',
                    backgroundColor: selectedItems.includes(item.cartId) ? 'blue' : 'white',
                    marginRight: 10,
                }} />
            </TouchableOpacity>

            {/* 레슨 정보 */}
            <styles.CartItemInfo style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.lesName}</Text>
                <Text>{item.lesTime} {item.lesDetailPlace}</Text>
                <Text>{parseInt(item.lesPrice).toLocaleString()} 원</Text>
            </styles.CartItemInfo>

            {/* 썸네일 이미지 */}
            <Image
                source={{ uri: `http://192.168.0.22:5000/img/${item.lesThumbImg}` }}
                style={{ width: 80, height: 70, borderRadius: 10 }}
            />
        </styles.CartItemContainer>
    );

    return (
        <styles.LessonDetailContainer>
            {/* 상단: 전체 선택 / 선택삭제 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                <TouchableOpacity onPress={handleSelectAll}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        전체 선택 ({selectedItems.length}/{cartItems.length})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    selectedItems.forEach(id => removeItem(id));
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        선택삭제
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 레슨 목록 */}
            <FlatList
                data={cartItems}
                keyExtractor={item => item.cartId.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
            
            {/* 결제 버튼 */}
            <TouchableOpacity
                onPress={() => {
                    if (selectedItems.length > 0) {
                        const selectedLesson = cartItems.find(item => item.cartId === selectedItems[0]);
                        navigation.navigate('Credit', { lesson: selectedLesson });
                    }
                }}

                style={{
                    backgroundColor: '#FAF287',
                    paddingVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>결제하기</Text>
                
            </TouchableOpacity>
        </styles.LessonDetailContainer>
        
    );
};

export default Cart;
