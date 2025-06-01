import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const LessonList = ({ navigation, route }) => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { mode, instNum } = route.params || {};

    useEffect(() => {
        if (!instNum) {
            Alert.alert('오류', '강사 정보를 불러올 수 없습니다.');
            return;
        }

        axios
            .get(`http://192.168.0.22:5000/api/lesson-api/instructor/${instNum}`)
            .then(res => setLessons(res.data))
            .catch(err => {
                console.error('레슨 조회 실패:', err);
                Alert.alert('레슨 목록을 불러올 수 없습니다.');
            })
            .finally(() => setLoading(false));
    }, [instNum]);

    const deleteLesson = async (lesNum) => {
        try {
            await axios.delete(`http://192.168.0.22:5000/api/lesson-api/${lesNum}`);
            Alert.alert('레슨이 삭제되었습니다.');
            setLessons(prev => prev.filter(item => item.lesNum !== lesNum));
        } catch (err) {
            console.error('레슨 삭제 실패:', err.response?.status, err.message);
            Alert.alert('레슨 삭제에 실패했습니다.');
        }
    };

    const confirmDelete = (lesNum) => {
        Alert.alert(
            '삭제하시겠습니까?',
            '',
            [
                { text: '아니오' },
                {
                    text: '예',
                    onPress: () => {
                        Alert.alert(
                            '삭제 후에는 복구할 수 없습니다. 정말 삭제하시겠습니까?',
                            '',
                            [
                                { text: '아니오' },
                                { text: '예', onPress: () => deleteLesson(lesNum) }
                            ]
                        );
                    }
                }
            ]
        );
    };

    const handlePress = (item) => {
        if (mode === 'edit') {
            navigation.navigate('EditLesson', { lesNum: item.lesNum });
        } else if (mode === 'delete') {
            confirmDelete(item.lesNum);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
            <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: 'black',
                marginBottom: 15,
                paddingLeft: 15
            }}>
                {mode === 'edit' ? '수정할 레슨 선택' :
                    mode === 'delete' ? '삭제할 레슨 선택' : '내 레슨 목록'}
            </Text>

            <FlatList
                data={lessons}
                keyExtractor={item => item.lesNum.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item)}>
                        <View style={{
                            flexDirection: 'row',
                            padding: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={{ uri: `http://192.168.0.22:5000/img/${item.lesThumbImg}` }}
                                style={{
                                    width: 80,
                                    height: 70,
                                    marginRight: 20,
                                    borderRadius: 10,
                                    backgroundColor: '#ddd'
                                }}
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
        </View>
    );
};

export default LessonList;