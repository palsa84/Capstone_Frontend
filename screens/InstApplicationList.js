import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const InstApplicationList = ({ route }) => {
    const navigation = useNavigation();
    const { status } = route.params;
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const encodedStatus = encodeURIComponent(status);
                const res = await axios.get(`http://192.168.0.22:5000/api/application/byStatus/${encodedStatus}/1`);
                setApplications(res.data);
            } catch (err) {
                console.error('레슨 리스트 불러오기 실패:', err);
            }
        };
        fetchData();
    }, [status]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
            <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: 'black',
                marginBottom: 15,
                paddingLeft: 15
            }}>
                신청 레슨 목록
            </Text>

            <FlatList
                data={applications}
                keyExtractor={(item) => item.appId.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('InstApplicationDetail', { appId: item.appId })}
                    >
                        <View style={{
                            flexDirection: 'row',
                            padding: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={{
                                    uri: item.lesThumbImg
                                        ? `http://192.168.0.22:5000/img/${item.lesThumbImg}`
                                        : 'http://192.168.0.22:5000/img/default_lesThumbImg.png'
                                }}
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
                                <Text style={{ fontSize: 13, color: 'gray' }}>{item.lesDetailPlace}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default InstApplicationList;