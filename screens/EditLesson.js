// ✅ EditLesson.js (이미지 제거 + JSON 방식)
import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Alert, ScrollView,
    TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditLesson = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const lesNum = route.params?.lesNum;

    const [lesName, setLesName] = useState('');
    const [lesinfo, setLesinfo] = useState('');
    const [lesLevel, setLesLevel] = useState('');
    const [lesDetailPlace, setLesDetailPlace] = useState('');
    const [lesPrice, setLesPrice] = useState('');
    const [weekday, setWeekday] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const levelList = ['초보자', '중급자', '전문가', '자격증'];
    const weekdays = ['월', '화', '수', '목', '금', '토', '일'];
    const timeOptions = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B'];

    useEffect(() => {
        if (!lesNum) return;
        axios.get(`http://192.168.0.22:5000/api/lesson-api/${lesNum}`)
            .then(res => {
                const data = res.data;
                setLesName(data.lesName);
                setLesinfo(data.lesinfo);
                setLesLevel(data.lesLevel);
                setLesDetailPlace(data.lesDetailPlace);
                setLesPrice(data.lesPrice);
                if (data.lesTime) {
                    const [day, range] = data.lesTime.split(' ');
                    const [start, end] = range.split('-');
                    setWeekday(day);
                    setStartTime(start);
                    setEndTime(end);
                }
            })
            .catch(err => {
                console.error('레슨 불러오기 실패:', err.response?.status, err.message);
                Alert.alert('레슨 정보를 불러올 수 없습니다.');
            });
    }, [lesNum]);

    const handleUpdate = async () => {
        const lesTime = `${weekday} ${startTime}-${endTime}`;
        const data = { lesName, lesinfo, lesLevel, lesDetailPlace, lesPrice, lesTime };

        try {
            await axios.put(`http://192.168.0.22:5000/api/lesson-api/${lesNum}`, data);
            Alert.alert('레슨 수정 완료');
            navigation.goBack();
        } catch (err) {
            console.error('레슨 수정 실패:', err.response?.status, err.message);
            Alert.alert('레슨 수정 실패');
        }
    };

    const handleCancel = () => {
        Alert.alert('수정을 취소하시겠습니까?', '', [
            { text: '아니오' },
            { text: '예', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView style={{ padding: 20 }} contentContainerStyle={{ paddingBottom: 200 }}>
                <Text>레슨명:</Text>
                <TextInput value={lesName} onChangeText={setLesName} style={{ borderWidth: 1, marginBottom: 10 }} />

                <Text>레슨 소개:</Text>
                <TextInput value={lesinfo} onChangeText={setLesinfo} multiline style={{ borderWidth: 1, marginBottom: 10 }} />

                <Text>레벨:</Text>
                <Picker selectedValue={lesLevel} onValueChange={setLesLevel}>
                    <Picker.Item label="선택하세요" value="" />
                    {levelList.map((level, i) => <Picker.Item key={i} label={level} value={level} />)}
                </Picker>

                <Text>상세 장소:</Text>
                <TextInput value={lesDetailPlace} onChangeText={setLesDetailPlace} style={{ borderWidth: 1, marginBottom: 10 }} />

                <Text>가격:</Text>
                <TextInput value={lesPrice} onChangeText={setLesPrice} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10 }} />

                <Text>요일:</Text>
                <Picker selectedValue={weekday} onValueChange={setWeekday} style={{ marginBottom: 10 }}>
                    <Picker.Item label="선택하세요" value="" />
                    {weekdays.map((w, i) => <Picker.Item key={i} label={w} value={w} />)}
                </Picker>

                <Text>시작 시간:          종료 시간:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Picker selectedValue={startTime} onValueChange={setStartTime} style={{ flex: 1 }}>
                        <Picker.Item label="선택하세요" value="" />
                        {timeOptions.map((t, i) => <Picker.Item key={i} label={t} value={t} />)}
                    </Picker>
                    <Text style={{ marginHorizontal: 5 }}>~</Text>
                    <Picker selectedValue={endTime} onValueChange={setEndTime} style={{ flex: 1 }}>
                        <Picker.Item label="선택하세요" value="" />
                        {timeOptions.map((t, i) => <Picker.Item key={i} label={t} value={t} />)}
                    </Picker>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 10 }}>
                    <TouchableOpacity onPress={handleUpdate} style={{ backgroundColor: '#fff000', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>레슨 수정</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCancel} style={{ backgroundColor: '#ccc', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>취소</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditLesson;
