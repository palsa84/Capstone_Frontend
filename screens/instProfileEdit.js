import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StatusBar, View, Text, ToastAndroid, TextInput, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {
    MypageContainer,
    ProfileWrapper,
    ProfileImage,
    PwCangeGrayBox,
    GenderContainer,
    GenderButton,
    GenderText,
    Row
} from '../components/styles';

import { getUser } from '../utils/userInfo';

const instProfileEdit = () => {
    const nav = useNavigation();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [career, setCareer] = useState('');
    const [userImg, setUserImg] = useState('');
    const [userNum, setUserNum] = useState(null);
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    
    const BASE_URL = 'http://192.168.0.22:5000';

useEffect(() => {
    const fetchUser = async () => {
        const u = await getUser();
        console.log('불러온 유저:', u);
        if (!u) {
            nav.reset({ index: 0, routes: [{ name: 'Logininst' }] });
        } else {
            setUser(u);
            setName(u.userName);
            setUserImg(u.userImg);
            setUserNum(u.userNum);
            setCareer(u.userinfo);
        }
    };
    fetchUser();
}, []);


    useLayoutEffect(() => {
        nav.setOptions({
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#e9ffc7' },
            headerTintColor: 'black',
            headerTitle: '프로필 편집',
        });
    }, [nav]);

    if (!user) return null;

    const fullImageUrl = userImg?.startsWith('http') ? userImg : `${BASE_URL}/img/${userImg}`;

    const handleSave = async () => {
        console.log('보내는 값:', { userNum, userinfo: career });
        Alert.alert('저장하시겠습니까?', '', [
            { text: '아니오' },
            {
                text: '예',
                onPress: async () => {
                    try {
                        await axios.post(`${BASE_URL}/api/users/updateCareer`, {
                            userNum: userNum,
                            userinfo: career
                        });
                        ToastAndroid.show('프로필이 수정되었습니다.', ToastAndroid.SHORT);
                        nav.goBack();
                    } catch (error) {
                        console.error('프로필 저장 실패:', error);
                        Alert.alert('저장 실패', '서버 오류로 인해 저장에 실패했습니다.');
                    }
                }
            }
        ]);
    };

    const handleCancel = () => {
        Alert.alert('취소하시겠습니까?', '', [
            { text: '아니오' },
            { text: '예', onPress: () => nav.goBack() }
        ]);
    };

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };

    const formatDate = (date) => {
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <MypageContainer style={{ backgroundColor: 'white' }}>
                <StatusBar barStyle="dark-content" />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: 35
                }}>
                    <ProfileImage source={{ uri: fullImageUrl }} />
                    <View style={{ marginLeft: 10, width: '61.5%' }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>이름</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="이름을 입력하세요"
                            style={{
                                borderWidth: 1,
                                borderColor: 'black',
                                borderRadius: 8,
                                padding: 8,
                            }}
                        />
                    </View>
                </View>

                <PwCangeGrayBox style={{ paddingHorizontal: 20, backgroundColor: 'white' }}>

                    <View style={{ marginBottom: 0 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>레슨 경력 및 자격증</Text>
                        <TextInput
                            multiline
                            numberOfLines={8}
                            value={career}
                            onChangeText={setCareer}
                            style={{
                                borderWidth: 1,
                                borderColor: 'black',
                                borderRadius: 8,
                                padding: 10,
                                textAlignVertical: 'top',
                                minHeight: 150,
                            }}
                        />
                    </View>
                </PwCangeGrayBox>

                <Row
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 20,
                        gap: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={handleSave}
                        style={{
                            width: 150,
                            backgroundColor: '#7aae3e',
                            paddingVertical: 15,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            저장
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleCancel}
                        style={{
                            width: 150,
                            backgroundColor: '#efefef',
                            paddingVertical: 15,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black',
                                textAlign: 'center',
                            }}
                        >
                            취소
                        </Text>
                    </TouchableOpacity>
                </Row>
            </MypageContainer>
        </ScrollView>
    );
};

export default instProfileEdit;